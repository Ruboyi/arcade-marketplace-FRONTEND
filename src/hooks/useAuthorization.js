import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const authContext = React.createContext();
const { REACT_APP_BACKEND_API } = process.env;

function useAuthorization(params) {
  const context = useContext(authContext);

  if (!context) {
    console.log("Para usar useAuthorization debes estar dentro de un Provider");
    return;
  }

  return context;
}

function AuthProvider(props) {
  const [userSession, setUserSession] = useState(
    sessionStorage.getItem("userSession")
  );

  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function login(email, password) {
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_API}users/login`, {
        email,
        password,
      });

      const accessToken = response.data.accessToken;

      setUserSession(accessToken);
      sessionStorage.setItem("userSession", accessToken);

      navigate("/profile");
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  function logout() {
    setUserSession(null);
    sessionStorage.setItem("userSession", null);
  }

  async function getUserProfile() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };

      const response = await axios.get(
        `${REACT_APP_BACKEND_API}users/profile`,
        config
      );

      setUserProfile(response.data);
    } catch (error) {
      console.log("ERROR: ", error);
      setError(error);
    }
  }

  useEffect(() => {
    if (userSession) {
      getUserProfile();
    }
  }, [userSession]);

  //! Es useless porque solo se van a setear los favoritos cuando te logeas y no se van a actualizar con esta llamada
  /* useEffect(() => {
    if (userSession) {
      async function getFavorites() {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userSession}`,
            },
          };
          const response = await axios.get(
            `http://localhost:3000/api/v1/users/favorites`,
            config
          );
          setFavs(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
      getFavorites();
    }
  }, [userSession]); */

  const value = {
    userSession,
    login,
    logout,
    userProfile,
    setUserProfile,
    error,
    getUserProfile,
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
}

export { useAuthorization, AuthProvider };
