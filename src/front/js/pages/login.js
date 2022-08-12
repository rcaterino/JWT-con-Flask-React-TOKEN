import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");

  const handleClick = () => {
    // aquí vamos a replicar la petición que hicimos con Postman

    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch(
      "https://3001-scentmay-jwtconflaskrea-2x2sd3b9pas.ws-eu59.gitpod.io/api/token",
      opts
    )
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else console.error("Error al convertir a json");
      })
      .then((data) => {
        console.log("this came from the backend", data);
        sessionStorage.setItem("token", data.access_token);
      })
      .catch((error) => {
        console.error("Ha ocurrido un error en el fetch", error);
      });
  };

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      {token && token != "" && token != undefined ? (
        "Estas logado con el token " + token
      ) : (
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={handleClick}>Login</button>
          <div>
            <Link to={"/"} className="btn btn-primary btn-lg mt-3">
              Ir a home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
