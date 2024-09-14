import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const userLogin = JSON.parse(localStorage.getItem("auth"));
    return userLogin || { user: null, token: "" };
  });

  // Set the default Authorization token 
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = auth.token;
    }
  }, [auth?.token]);

  // Save auth state in localStorage when it changes
  useEffect(() => {
    if (auth?.user && auth?.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
