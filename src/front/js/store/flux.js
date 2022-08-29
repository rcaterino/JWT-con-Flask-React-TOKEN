const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      login: async (email, password) => {
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
        try {
          const resp = await fetch(
            "https://3001-rcaterino-jwtconflaskre-wbj0pir7o0l.ws-eu63.gitpod.io/" +
              "api/token",
            opts
          );
          if (resp.status !== 200) {
            new Error("error from login in context");
            alert("usuario no registrado");
            return false;
          }
          const data = await resp.json();
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error(error);
        }
      },

      /** Función para deslogear al usuario, remueve el token del sessionStorage */
      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
        return true;

      },

      /* Función para optener token almacenado en sessionStorage */ 
      getTokenFromSession: () => {
        const token = sessionStorage.getItem("token");
        if (token && token !== "" && token !== undefined)
          setStore({ token: token });
      },

      signup: async (nombre, apellidos, email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            password: password,
            is_active: true
          }),
        };
        try {
          let resp = await fetch(
            "https://3001-rcaterino-jwtconflaskre-wbj0pir7o0l.ws-eu63.gitpod.io/" +
              "api/registro",
            opts
          );
          if (resp.status !== 200) {
            new Error("there has been an error");
            return false;
          }
          let data = await resp.json();
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;
