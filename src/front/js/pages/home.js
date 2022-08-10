import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <h1 className="text-center">Bienvenido</h1>
      <div className="container">
        <form class="row-sm needs-validation" novalidate="">
          <div className="container">
            <div class="col-sm">
              <label for="validationCustomUsername" class="form-label">
                Username
              </label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">
                  @
                </span>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  required=""
                />
                <div class="invalid-feedback">Please write a username.</div>
              </div>
            </div>
          </div>
          <div className="container">
            <div class="col-sm">
              <label for="validationCustomPassword" class="form-label">
                Password
              </label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">
                  **
                </span>
                <input
                  type="password"
                  class="form-control"
                  id="validationCustomPassword"
                  aria-describedby="inputGroupPrepend"
                  required=""
                />
                <div class="invalid-feedback">Please write a password.</div>
              </div>
            </div>
          </div>
          <div className="container">
            <div class="col-sm">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="invalidCheck"
                  required=""
                />
                <label class="form-check-label">Hold my session open</label>
              </div>
            </div>
          </div>
          <div className="container">
            <div class="col-sm">
              <button class="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
