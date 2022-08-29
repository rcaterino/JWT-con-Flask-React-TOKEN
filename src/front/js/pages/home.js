import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Login } from "../component/login";

export const Home = () => {
  const { store, actions } = useContext(Context);

  /* utilizamos useEffect para optener del actions en flux.js el token del usuario con la función getTokenFromSession*/
  useEffect(() => {
    actions.getTokenFromSession();
  }, []);

  return (
    /* utilizando el operador ternario, evaluamos si la variable token dentro de store está vacía, nula o indefinida para renderizar el componente de login */
    /* en caso que si tenemos token guardado en la sesión, renderizamos página de inicio personalizada */
    <>
   
    {!store.token ||
      store.token === null ||
      store.token === "" ||
      store.token === undefined ? (
        <div className="text-center mt-5">
      <h1 className="text-center">Bienvenido al Home Page</h1>
      <h4>Esto es un proyecto sobre Autenticación con JWT Extention</h4>
      <h6>Para evaluar mi funcionamiento, debes iniciar sesión</h6>
      <Login />
    </div>
      
      ) : (
        <div className="text-center mt-5">
    <h1 className="text-center">Bienvenido al Home Page</h1>
      <h4>Esto es un proyecto sobre Autenticación con JWT Extention</h4>
      <h6>Muy bien, haz iniciado sesión, visita tu página de perfil</h6>
    </div>
      )}
    </>

    
  );
};
