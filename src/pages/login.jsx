import { useState } from "react";
import LoginImage from "../assets/shopping_devices.jpg";
import { motion } from "framer-motion";

const Login = ({ onLoginSubmit, isLoading, loginError }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit(email, password);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Imagen */}
      <div className="hidden md:flex items-center justify-center bg-base-300">
        <img
          src={LoginImage}
          alt="Tienda"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Columna formulario */}
      <div className="flex items-center justify-center bg-base-200 px-4">

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-md"
        >

          <div className="card bg-base-100 shadow-xl">

            <div className="card-body">

              <h2 className="text-3xl font-bold text-center">
                Bienvenido
              </h2>

              <p className="text-center text-base-content/60 mb-4">
                Inicia sesión para continuar comprando
              </p>

              {loginError && (
                <div className="alert alert-error text-sm">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Email:</span>
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tucorreo@email.com"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Contraseña:</span>
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="********"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>

              </form>

              <div className="divider">o</div>

              <p className="text-sm text-center">
                ¿No tienes cuenta?{" "}
                <a href="/register" className="link link-primary font-semibold">
                  Regístrate
                </a>
              </p>

            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;