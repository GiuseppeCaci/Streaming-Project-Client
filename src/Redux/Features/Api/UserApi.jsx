import axios from "axios";
import { DecryptData } from "../../Utilis/DecyptoData";
import {
  requestStart,
  loginSuccess,
  actionSuccess,
  actionReset,
  actionFailure,
} from "../Users/AuthSlice";
import {
  requestEmailStart,
  actionEmailSuccess,
  actionEmailFailure,
} from "../Users/EmailSlice";
import {
  requestProfileSettingStart,
  actionProfileSettingSuccess,
  actionProfileSettingFailure,
} from "../Users/ProfileSlice";

//LOGIN USER
export const login = (credentials) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await axios.post(
      import.meta.env.VITE_USER_LOGIN,
      credentials
    );
    const decriptazione = DecryptData(response);
    dispatch(loginSuccess(decriptazione));
  } catch (error) {
    dispatch(actionFailure(error.response.data.message));
  }
};

//REGISTRAZIONE E AUTENTICAZIONE USER
export const fetchUserPost = (url, payload) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await axios.post(url, payload);
    dispatch(actionSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

//GET ALL USER PER CONFRONTO USERNAME
export const fetchUserGetAll = (token) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const response = await axios.get(import.meta.env.VITE_GET_ALL_USER, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(actionSuccess(response.data));
  } catch (error) {
    dispatch(actionFailure(error.message));
  }
};

//REGISTRAZIONE E AUTENTICAZIONE USER
export const fetchUserEmailRegisterPost = (payload) => async (dispatch) => {
  dispatch(requestEmailStart());
  try {
    const response = await axios.post(
      import.meta.env.VITE_REGISTER-AUTH,
      payload
    );
    dispatch(actionEmailSuccess(response.data));
  } catch (error) {
    dispatch(actionEmailFailure(error.message));
  }
};


//RIMANDA L'EMAIL PER LA CONFERMA PROFILO
export const fetchUserResendEmailPost = (payload) => async (dispatch) => {
  dispatch(requestEmailStart());
  try {
    const response = await axios.post(import.meta.env.VITE_RESEND_EMAIL_REGISTER, payload);
    dispatch(actionEmailSuccess(response.data));
  } catch (error) {
    dispatch(actionEmailFailure(error.message));
  }
};



//RICHIESTA CAMBIO PASSWORD
export const fetchUserRequestChangePasswordEmail =
  (body) => async (dispatch) => {
    dispatch(requestProfileSettingStart());
    try {
      const response = await axios.post(
        import.meta.env.VITE_REQUEST_CHANGE_PASSWORD,
        body
      );
      dispatch(actionProfileSettingSuccess(response.data));
    } catch (error) {
      dispatch(actionProfileSettingFailure(error.message));
    }
  };

//CAMBIO PASSWORD
export const fetchUserConfirmChangePassword =
  (token, body) => async (dispatch) => {
    dispatch(requestProfileSettingStart());
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CHANGE_PASSWORD}/${token}`,
        body
      );
      dispatch(actionProfileSettingSuccess(response.data));
    } catch (error) {
      dispatch(actionProfileSettingFailure(error.message));
    }
  };


//CANCELLA PROFILO
export const fetchUserDeleteProfile = (token) => async (dispatch) => {
  dispatch(requestProfileSettingStart());
  try {
    const response = await axios.delete(
      import.meta.env.VITE_DELETE_PROFILE,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(actionProfileSettingSuccess(response.data));
  } catch (error) {
    dispatch(actionProfileSettingFailure(error.message));
  }
};


// Cambia immagine del profilo
export const changeImgProfileUser = (token, imgprofile) => async (dispatch) => {
  dispatch(requestProfileSettingStart());
  try {
    const response = await axios.patch(
      import.meta.env.VITE_CHANGE_IMG_PROFILE,
      { imgprofile }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(actionProfileSettingSuccess(response.data));

    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const updatedUserForStorage = {
      ...storedUserData,
      imgprofile: response.data.data.imgprofile, 
    };
    localStorage.setItem("user", JSON.stringify(updatedUserForStorage));
    dispatch(loginSuccess(response.data.data));

  } catch (error) {
    dispatch(actionProfileSettingFailure(error.message));
  }
};
