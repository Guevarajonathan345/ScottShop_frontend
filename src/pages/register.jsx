import { useState } from "react";
import LoginImage from "../assets/shopping_devices.jpg";
import { motion, AnimatePresence } from "framer-motion";

const Register = ({ onRegisterSubmit, isLoading, registerError }) => {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit(nombre, email, password);
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
                Crear cuenta
              </h2>

              <p className="text-center text-base-content/60 mb-4">
                Regístrate para comenzar a comprar
              </p>

              {/* Error animado */}
              <AnimatePresence>
                {registerError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="alert alert-error text-sm"
                  >
                    {registerError}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Nombre */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Nombre:</span>
                  </label>

                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    placeholder="Ingresa tu nombre"
                    className="input input-bordered w-full transition-all focus:scale-[1.01]"
                  />
                </div>

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
                    className="input input-bordered w-full transition-all focus:scale-[1.01]"
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
                    className="input input-bordered w-full transition-all focus:scale-[1.01]"
                  />
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                >
                  {isLoading ? "Registrando..." : "Crear cuenta"}
                </button>

              </form>

              <div className="divider">o</div>

              <p className="text-sm text-center">
                ¿Ya tienes una cuenta?{" "}
                <a href="/login" className="link link-primary font-semibold">
                  Iniciar sesión
                </a>
              </p>

            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Register;