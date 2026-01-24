import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout, isAdmin}){

  return (
    <nav className="bg-[#26872B] text-white px-6 py-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">
        ScottShop
      </Link>

      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="bg-blue-600 px-4 py-2 rounded">
              Iniciar sesión
            </Link>
            <Link to="/register" className="bg-gray-600 px-4 py-2 rounded">
              Registrarme
            </Link>
          </>
        ) : (
          <>
            {isAdmin && (
              <span className="text-yellow-400">Admin</span>
            )}
            <button
              onClick={onLogout}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;