import { useState } from "react";
import api from "../api/apiService"; //instancia de axios

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState (!!localStorage.getItem("authToken"));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //cargamos rol inicial
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);


    //Funcion de registro de nuevo usuario
    const register = async (nombre, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/registro', {nombre, email, password });

            const {token, rol} = response.data;

            //guardar token y autologin luego del registro

            localStorage.setItem("authToken", token);
            localStorage.setItem("userRole", rol);

            setIsLoggedIn(true);
            setUserRole(rol);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Error al crear la cuenta.');
            setIsLoggedIn(false);
            return false;
        } finally {
            setLoading(false);
        }
    };




    // Función principal para iniciar sesión
    const login = async (email, password) =>{
        setLoading(true);
        setError(null);
        try{
            const response = await api.post('/login', {email, password});
            const {token, rol} = response.data;

            //Guardar el token de forma persistente (Norma)
            localStorage.setItem("authToken", token);
            //Guardar el rol en LocalStorage para recargas rápidas
            localStorage.setItem("userRole", rol);
            
            setIsLoggedIn(true);
            setUserRole(rol); // actualiza estado del rol
            
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


    //cerrar sesion
    const logout = () => {

        //quitar token de autenticacion
        localStorage.removeItem('userRole');
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return {
        isLoggedIn, 
        loading, 
        error, 
        login, 
        logout, 
        register,
        userRole,
        isAdmin: userRole === 'admin'};

};

export default useAuth;