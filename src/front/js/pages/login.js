import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
//import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    const opts = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch(
      "https://3001-rcaterino-jwtconflaskre-78927iop808.ws-eu59.gitpod.io/api/token",
      opts
    )
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("There has been some error");
      })
      .then((data) => {
        console.log("this from backend", data);
        sessionStorage.setItem("token", data.access_token);
      })
      .catch((error) => {
        console.error("There was an error!!!", error);
      });
  };

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      <div>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bt bt-primary" onClick={handleClick}>
          Login
        </button>
      </div>
    </div>
  );
};
