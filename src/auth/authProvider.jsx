import { createContext, useState } from "react";
import api from "../api/apiService"; //instancia de axios


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState (!!localStorage.getItem("authToken"));
    const [userRole, setUserRole] = useState(!!localStorage.getItem("userRole"));
    const [userName, setUserName] = useState(!!localStorage.getItem("userName"));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función principal para iniciar sesión
    const login = async (email, password) =>{
        setLoading(true);
        setError(null);
        try{
            const { data } = await api.post('/login', {email, password});

            //Guardar el token de forma persistente (Norma)
            localStorage.setItem("authToken", data.token);
            //Guardar el rol en LocalStorage para recargas rápidas
            localStorage.setItem("userRole", data.rol);
            
            localStorage.setItem("userName", data.nombre);
            
            setIsLoggedIn(true);
            setUserRole(data.rol); // actualiza estado del rol
            setUserName(data.nombre);
            
            return true;

        } catch (err){
            // Falla en el login (401 Unauthorized, etc.)
            setError(err.response?.data?.message || 'Error de red o credenciales invalidas');
            setIsLoggedIn(false);

            return false;
        }finally {
            setLoading(false);
        }
    };

    //Funcion de registro de nuevo usuario
    const register = async (nombre, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const { data } = await api.post('/registro', {nombre, email, password });

            //guardar token y autologin luego del registro

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userRole", data.rol);
            localStorage.setItem("userName", data.nombre);

            setIsLoggedIn(true);
            setUserRole(data.rol);
            setUserName(data.nombre);

            return true;
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Error al crear la cuenta.');
            setIsLoggedIn(false);
            return false;
        } finally {
            setLoading(false);
        }
    };
    //cerrar sesion
    const logout = () => {

        //quitar token de autenticacion
        localStorage.removeItem('userRole');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        setIsLoggedIn(false);
        setUserRole(null);
        setUserName(null);
        };

    return (
        <AuthContext.Provider
        value ={{
            isLoggedIn, 
            loading, 
            error, 
            login, 
            logout, 
            register,
            userRole,
            userName,
            isAdmin: userRole === 'admin',
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};