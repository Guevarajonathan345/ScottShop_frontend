import { createContext, useState } from "react";
import api from "../api/ApiService";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole")
  );

  const [userName, setUserName] = useState(
    localStorage.getItem("userName")
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  // GUARDAR SESIÓN
  
  const saveSession = (data) => {

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userRole", data.rol);
    localStorage.setItem("userName", data.nombre);

    setIsLoggedIn(true);
    setUserRole(data.rol);
    setUserName(data.nombre);
  };

  
  // LIMPIAR SESIÓN
  
  const clearSession = () => {

    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    setUserRole(null);
    setUserName(null);
  };

  
  // LOGIN
  
  const login = async (email, password) => {

    setLoading(true);
    setError(null);

    try {

      const { data } = await api.post("/login", {
        email,
        password
    });

      saveSession(data);

      toast.success(`Bienvenido de nuevo, ${data.nombre}`);

      return true;


    } catch (err) {

      const message =
        err.response?.data?.message ||
        "Error de red o credenciales inválidas";

      setError(message);
      toast.error(message);
      clearSession();

      return false;

    } finally {

      setLoading(false);
    }
  };

  // REGISTRO

  const register = async (
    nombre,
    email,
    password
  ) => {

    setLoading(true);
    setError(null);

    try {

      const { data } = await api.post( "/registro",
        {
          nombre,
          email,
          password
        }
      );

      saveSession(data);

      toast.success(`Cuenta creada con éxito, ${data.nombre}`);

      return true;

    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Error al crear la cuenta";

      setError(message);
      toast.error(message);

      clearSession();

      return false;

    } finally {

      setLoading(false);
    }
  };

  // LOGOUT

  const logout = () => {
    clearSession();
    toast.success("Sesión cerrada con éxito");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        error,
        login,
        register,
        logout,
        userRole,
        userName,
        isAdmin: userRole === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};