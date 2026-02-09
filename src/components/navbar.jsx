import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../auth/UseAuth";

function Navbar() {
  const auth = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BARRA SUPERIOR */}
      <nav className="bg-[#0c343d] text-white px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-lg md:text-2xl font-bold">
          Scott Digital Shop
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="text-3xl"
        >
          ☰
        </button>
      </nav>

      {/* FONDO DIFUMINADO (solo cuando está abierto) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-white/20 z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 right-0 h-full z-50 bg-white shadow-xl
          transform transition-transform duration-300
          w-full md:w-80
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER SIDEBAR */}
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-semibold text-lg">Menú</span>
          <button onClick={() => setOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col p-4 gap-4 text-lg">

          <Link to="/mobiles" onClick={() => setOpen(false)}>
             Mobile
          </Link>

          <Link to="/computadoras" onClick={() => setOpen(false)}>
             Computadoras
          </Link>

          <Link to="/contacto" onClick={() => setOpen(false)}>
             Contáctanos
          </Link>

          <Link to="/acerca" onClick={() => setOpen(false)}>
             Acerca de nosotros
          </Link>

          <hr />

          {auth.isAdmin && (
            <Link
              to="/admin"
              className="text-yellow-600"
              onClick={() => setOpen(false)}
            >
              Panel Admin
            </Link>
          )}

          {auth.isLoggedIn && auth.userName && (
            <span className="text-green-600">
              Bienvenido, {auth.userName}
            </span>
          )}

          {auth.isLoggedIn ? (
            <button
              onClick={() => {
                auth.logout();
                setOpen(false);
              }}
              className="text-left text-red-600"
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                Registro
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
export default Navbar;
