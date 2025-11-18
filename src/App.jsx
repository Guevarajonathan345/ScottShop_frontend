import React, { useState } from 'react';
import ProductListContainer from './containers/ProductListContainer';
import Login from './components/login';
import Register from './components/register';
import useAuth from './hooks/useAuth';


function App() {
  // Obtener el estado de autenticación de toda la app
  const { isLoggedIn, loading, error, login, logout, register, isAdmin } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);


  // Función para manejar el envío del formulario de Login
  const handleLoginSubmit = async (email, password) => {
    const success = await login(email, password); 
  };

  const handleRegisterSubmit =async (nombre, email, password) => {
    const succes = await register(nombre, email, password);
  }

  return (
    <div className="App">
      {/* Boton para altenar lista si no esta logueado */}

      {!isLoggedIn && (
        <button 
        onClick={() => setIsRegistering(!isRegistering)}
        style = {{position: 'absolute', top: '20px', left: '20px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            {isRegistering ? 'Volver a iniciar sesion' : 'No tienes cuenta? Registrate'}
        </button>
      )}

      {isLoggedIn ? (
        // Si está logueado, muestra la lista de productos y un botón de Logout
        <>
            <button 
                onClick={logout} 
                style={{ position: 'absolute', top: '10px', right: '10px', padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                Cerrar Sesión
            </button>
            <ProductListContainer isAdmin={isAdmin}/>
        </>
      ) : (
        isRegistering ? (
          //lanza el form de registro
          <Register 
            onRegisterSubmit = {handleRegisterSubmit}
            isLoading ={ loading }
            registerError = { error }
            />
      ) : (
        // Si NO está logueado, muestra el formulario de Login
        <Login 
            onLoginSubmit={handleLoginSubmit} 
            isLoading={loading} 
            loginError={error}
        /> 
        )
      )}
    </div>
  );
}

export default App;