import { useState } from "react";
import LoginImage from '../assets/shopping_devices.jpg';

const Login = ({ onLoginSubmit, isLoading, loginError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit(email, password);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* Imagen lado izquierdo */}
      <div className="hidden md:flex items-center justify-center bg-gray-900">
        <img
          src={LoginImage}
          alt="Tienda"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Formulario lado derecho */}
      <div className="flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
          
          <h2 className="text-3xl font-arial mb-2 text-gray-800">
            Bienvenido
          </h2>
          <p className="text-gray-500 mb-6">
            Miles de productos de tecnologia te esperan
          </p>

          {loginError && (
            <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {loginError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Ingresa tu correo aqui"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded text-white font-semibold transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
