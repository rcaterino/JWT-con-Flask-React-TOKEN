import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1 className="text-center">Bienvenido al página Home</h1>
      <Link to={"/login"} className="btn btn-primary btn-lg">
        Ir a login
      </Link>
    </div>
  );
};
