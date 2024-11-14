import { jwtDecode } from "jwt-decode";
import { format } from 'date-fns';


export const DecryptData = (response) => {
  try {
    const userToken = response.data.token;
    const decodeToken = jwtDecode(userToken);

    const dataIAT = decodeToken.iat;
    const dataConvertita = format(new Date(dataIAT * 1000),'yyyy-MM-dd HH:mm:ss');

    const newUser = {
        ...decodeToken,
        iat:dataConvertita,
        token:userToken
    };

    return newUser;
  } catch (error) {
    console.error('Errore durante la decriptazione:', error);
    return null;
  }
};
