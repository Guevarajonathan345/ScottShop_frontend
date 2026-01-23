import { useState } from "react";
import api from "../api/apiService"; //instancia de axios


const AuthContext = createContext(null);

export const authProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState (false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //restaurar sesion al recargar 

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const role = localStorage.getItem("userRole");

        if (token && role ) {
            setIsLoggedIn (true);
            setUserRole(role);
        }
        setLoading (false);
    }, []);

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
            
            setIsLoggedIn(true);
            setUserRole(data.rol); // actualiza estado del rol
            
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

            setIsLoggedIn(true);
            setUserRole(data.rol);
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
        setIsLoggedIn(false);
        setUserRole(null);
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
            isAdmin: userRole === 'admin',
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};