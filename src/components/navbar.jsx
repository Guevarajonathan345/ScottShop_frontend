import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../auth/UseAuth";
import CartButton from "./CartButton";

function Navbar({ onOpenCart }) {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      {/* NAVBAR SUPERIOR */}
      <div className="
        navbar fixed top-0 z-50 w-full
        bg-[#121212]/70
        backdrop-blur-md
        border-b border-white/10
        shadow-lg
        px-4
      ">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-white">
            ScottShop Digital Shop
          </Link>
        </div>


        <div className="flex items-center gap-2">
            <CartButton onOpen={onOpenCart} />  
          <button
            onClick={() => setOpen(true)}
            className="btn btn-square btn-ghost text-xl text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* ESPACIO POR NAVBAR FIXED */}
      <div className="h-16"></div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 right-0 h-full z-50
          bg-black/60
          backdrop-blur-xl
          text-white
          border-l border-white/10
          shadow-2xl
          transform transition-transform duration-300
          w-full md:w-80
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b border-base-300">
          <span className="text-lg font-semibold">Menú</span>
          <button
            onClick={() => setOpen(false)}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>

        <ul className="menu p-4 text-base gap-1 font-medium">
          <li className="menu-title text-white/60">Categorías</li>
          <li><Link className="hover:bg-white/10 transition rounded-lg" to="/mobiles" onClick={() => setOpen(false)}> Mobile</Link></li>
          <li><Link className="hover:bg-white/10 transition rounded-lg" to="/computadoras" onClick={() => setOpen(false)}> Computadoras</Link></li>
          <li><Link className="hover:bg-white/10 transition rounded-lg" to="/contacto" onClick={() => setOpen(false)}> Contáctanos</Link></li>
          <li><Link className="hover:bg-white/10 transition rounded-lg" to="/acerca" onClick={() => setOpen(false)}> Acerca de nosotros</Link></li>

          <div className="divider"></div>

          {auth.isAdmin && (
            <li>
              <Link to="/admin" className="text-warning" onClick={() => setOpen(false)}>
              Panel Admin
              </Link>
            </li>
          )}

          {auth.isLoggedIn && auth.userName && (
            <li className="text-success px-2">
              Hola, {auth.userName}
            </li>
          )}

          {auth.isLoggedIn ? (
            <li>
              <button
                onClick={() => {
                  auth.logout();
                  setOpen(false);
                }}
                className="text-error"
              >
              Cerrar sesión
              </button>
            </li>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setOpen(false)}> Login</Link></li>
              <li><Link to="/register" onClick={() => setOpen(false)}> Registro</Link></li>
            </>
          )}

          <div className="divider"></div>

          {/* BOTÓN TEMA */}
          <button
            onClick={toggleTheme}
            className="btn btn-outline flex justify-between items-center"
          >
            Tema: {theme === "light" ? " Oscuro" : " Claro"}
          </button>
        </ul>
      </aside>
    </>
  );
}

export default Navbar;
