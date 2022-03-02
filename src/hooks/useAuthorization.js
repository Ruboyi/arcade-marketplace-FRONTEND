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
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem("isAdmin"));
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

      const { role } = response.data;

      if (role === "admin") {
        setIsAdmin(true);
        sessionStorage.setItem("isAdmin", true);
        navigate("/admin/users");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  async function logout() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      await axios.get(`${REACT_APP_BACKEND_API}users/logout`, config);
      setUserSession(null);
      sessionStorage.removeItem("userSession");
      setIsAdmin(false);
      sessionStorage.removeItem("isAdmin");
      setUserProfile(false);
      navigate("/login");
      window.location.reload();
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  useEffect(() => {
    if (userSession) {
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
      getUserProfile();
    }
  }, [userSession]);

  const value = {
    userSession,
    login,
    logout,
    userProfile,
    setUserProfile,
    error,
    setError,
    /* getUserProfile, */
    setUserSession,
    isAdmin,
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
}

export { useAuthorization, AuthProvider };
