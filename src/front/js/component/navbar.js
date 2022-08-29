import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";



export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getTokenFromSession();
  }, []);

  return (
     /* utilizando el operador ternario, evaluamos si la variable token dentro de store está vacía, nula o indefinida para renderizar el navbar solo con botón de home y login */
    /* en caso que si tenemos token guardado en la sesión, renderizamos navbar personalizado con home, Mi perfil y LogOut */
    <>
      {!store.token ||
      store.token === null ||
      store.token === "" ||
      store.token === undefined ? (
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <Link to="/">
              <span className="navbar-brand mb-0 h1">Home</span>
            </Link>
            <div className="ml-auto">
              
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <Link to="/">
              <span className="navbar-brand mb-0 h1">Home</span>
            </Link>
            <Link to="/privada">
              <span className="navbar-brand mb-0 h1">Mi perfil</span>
            </Link>
            <div className="ml-auto">
              <button className="btn btn-primary" onClick={actions.logout}>
                LogOut
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
