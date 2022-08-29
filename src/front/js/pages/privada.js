import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Privada = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getTokenFromSession();
  }, []);

  return (
    <>
    {!store.token ||
      store.token === null ||
      store.token === "" ||
      store.token === undefined ? (
        <div className="text-center mt-5">
      <h1 className="text-center">Bienvenido tu página de perfil</h1>
      <h4>Esto es un proyecto sobre Autenticación con JWT Extention</h4>
      <h6>Para evaluar mi funcionamiento, debes iniciar sesión</h6>
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
