import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
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
      <h1 className="text-center">Bienvenido al página Home, inicia sesión para acceder a tu página privada</h1>
    </div>
      ) : (
        <div className="text-center mt-5">
      <h1 className="text-center">estás en una sesión iniciada</h1>
    </div>
      )}
    </>

    
  );
};
