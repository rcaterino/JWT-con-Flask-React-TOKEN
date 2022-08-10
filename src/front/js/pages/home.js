import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <h1 className="text-center">Bienvenido</h1>
      <div className="container"></div>
    </>
  );
};
