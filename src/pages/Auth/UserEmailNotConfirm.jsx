import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserEmailNotConfirm = () => {

  const checkUser = JSON.parse(
    localStorage.getItem("user")
  );
  const notConfirmedEmail = JSON.parse(
    localStorage.getItem("userUnconfirmed")
  );

  const [areYouCurious, setAreYouCurious] = useState(false);

  useEffect(() => {
    if (!notConfirmedEmail) {
       setAreYouCurious(true);
    } 
    if (checkUser) {
        if(checkUser.confirmedAccount){
            setAreYouCurious(true);
        }
     } else {
       setAreYouCurious(false);
    }
 }, [notConfirmedEmail, checkUser]);

  return (
    <>
      <div>
        {areYouCurious ? (
          <p>Non hai accesso a questa pagina</p>
        ) : (
          <>
            <p>
              Ti abbiamo mandato un'altra email di conferma per completare
              l'iscrizione all'indirizzo email: {notConfirmedEmail?.email}.
            </p>
            <p>Completa l'iscrizione per poter fare l'accesso al sito. <Link to="/login">torna al login</Link></p>
          </>
        )}
      </div>
    </>
  );
};

export default UserEmailNotConfirm;
