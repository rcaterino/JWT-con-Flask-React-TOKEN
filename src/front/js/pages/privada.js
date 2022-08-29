import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Login } from "../component/login";

export const Privada = () => {
  const { store, actions } = useContext(Context);

  /* utilizamos useEffect para optener del actions en flux.js el token del usuario con la función getTokenFromSession*/
  useEffect(() => {
    actions.getTokenFromSession();
  }, []);

  return (
    <>
    {!store.token ||
      store.token === null ||
      store.token === "" ||
      store.token === undefined ? (
        <div>
          <Link to= "/"></Link>
        </div>
      
      ) : (
        <div className="text-center mt-5">
    <h1 className="text-center">Bienvenido a tu página de perfil</h1>
      <h4>Esto es un proyecto sobre Autenticación con JWT Extention</h4>
      <h6>Muy bien, haz iniciado sesión y tu token es:</h6>
      <p>{store.token}</p>
    </div>
      )}
    </>

    
  );
};
