import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Navbar() {

    const { isLoggedIn, logout, isAdmin } = useAuth();

    return (
        <nav className="bg-gary-900 text-white px-6 py-4 flex justify-beetween items-center">

            {/*Logo*/}
            <Link to="/" className="text-xl font-bold"> ScottShop 
            </Link>

            {/*Acciones */}
            <div className= "flex gap-4 items-center">
                {!isLoggenIn ? (
                    <>
                    <Link 
                    to="/Login" 
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
                    >
                        Iniciar Sesion
                    </Link>

                    <Link 
                    to="/Register"
                    className="px-4 py-2 rounded  bg-gray-600 hover:bg-gray-800 transition"
                    >
                        Registrarse 
                    </Link>"
                    </>
                ) : (
                    <>
                    {isAdmin && (
                        <span className="text-sm text-yellow-400 font-semibold">
                            Administrador
                        </span>
                    )}
                    <button 
                    onClick={logout}
                    className="px-4 py-2 rounded bg-red-600 hiver:bg-red-700 transition"
                    >
                        Cerrar sesion
                    </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;