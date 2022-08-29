import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Registro = () => {
  const { store, actions } = useContext(Context);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleClick = () => {
    actions.signup(nombre, apellidos, email, password);
  };

  return (
    <div className="p-3 border-0">
      <h1 className="text-center">Formulario de Registro</h1>
      <div className="d-grid gap-2">
        <label className="form-label">Nombre</label>
        <div className="d-grid gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Indique su nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="d-grid gap-2">
        <label className="form-label">Apellidos</label>
        <div className="d-grid gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Indique sus Apellidos"
            value={apellidos}
            onChange={(e) => {
              setApellidos(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="d-grid gap-2">
        <label className="form-label">Correo Electrónico</label>
        <div className="d-grid gap-2">
          <input
            type="email"
            className="form-control"
            placeholder="Escriba su correo electrónico"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="col-sm-2 col-form-label">Contraseña</label>
        <div className="d-grid gap-2">
          <input
            type="password"
            className="form-control"
            placeholder="Por favor, escriba su contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Registrarme
        </button>
      </div>
    </div>
  );
};
