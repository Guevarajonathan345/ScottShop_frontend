import { useState } from "react";
import LoginImage from "../assets/shopping_devices.jpg";

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

      {/* Formulario */}
      <div className="flex items-center justify-center bg-base-200 px-4">

        <div className="card w-full max-w-md bg-base-100 shadow-xl">

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
                  <span className="label-text">Email</span>
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder=" correo@email.com"
                  className="input input-bordered border rounded w-full mt-1 py-4"
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contraseña</span>
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder=" ********"
                  className="input input-bordered border rounded w-full mt-1 py-4"
                />
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary border rounded border border-gray w-full ${
                  isLoading ? "loading" : ""
                }`}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>

            </form>

            <p className="text-sm text-center mt-4">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="link link-primary">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;