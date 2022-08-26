import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
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
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <Link to="/">
              <span className="navbar-brand mb-0 h1">Home</span>
            </Link>
            <div className="ml-auto">
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
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
