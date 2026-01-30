import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
function Navbar(){

  const auth = useAuth();

  return (
    <nav className="bg-[#0c343d] text-white px-6 py-4 flex justify-between">
      <Link to="/" className="text-sm lg:text-2xl md:text-lg font-bold">
        Scott Digital Shop
      </Link>
    
      <div className="flex gap-4">
        {auth.isAdmin && (
          <Link to="/admin" className="text-yellow-400">Admin</Link>
        )}

        {auth.isLoggedIn && !auth.isAdmin && auth.userName && (
          <span className="text-green-300">
            Bienvenido, {auth.userName}
          </span>
        )}  

        {!auth.isLoggedIn ? (
          <>  
            <Link to="/login" className="bg-blue-600 px-4 py-2 rounded">
              Iniciar sesión
            </Link>
            <Link to="/register" className="bg-gray-60  0 px-4 py-2 rounded">
              Registrarme
            </Link>
          </>
        ) : (
            <button
              onClick={auth.logout}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Cerrar sesión
            </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;