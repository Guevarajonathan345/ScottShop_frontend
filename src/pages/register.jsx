import { useState } from "react";
import LoginImage from "../assets/shopping_devices.jpg";

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

      {/* Formulario */}
      <div className="flex items-center justify-center bg-base-200 px-4">

        <div className="card w-full max-w-md bg-base-100 shadow-xl">

          <div className="card-body">

            <h2 className="text-3xl font-bold text-center">
              Crear cuenta
            </h2>

            <p className="text-center text-base-content/60 mb-4">
              Regístrate para comenzar a comprar
            </p>

            {registerError && (
              <div className="alert alert-error text-sm">
                {registerError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Nombre */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nombre:</span>
                </label>

                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  placeholder=" Ingresa tu nombre"
                  className="input input-bordered border rounded w-full mt-1 py-4"
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email: </span>
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
                {isLoading ? "Registrando..." : "Crear cuenta"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;