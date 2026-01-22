import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import ProductListContainer from './containers/ProductListContainer';
import Login from './pages/login';
import Register from './pages/register';
import useAuth from './hooks/useAuth';
import Navbar from './components/navbar';

function App() {
    const auth = useAuth();
    const navigate =useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate("/login", {replace: true});
    };

    return (
        <>
        <Navbar 
        isLoggedIn={auth.isLoggedIn}
        isAdmin={auth.isAdmin}
        onLogout={handleLogout}
        />

        <Routes>
        {/* Ruta publica*/}
    <Route
        path="/login"
        element={
            !auth.isLoggedIn ? (
                <Login
                onLoginSubmit={auth.login}
                isLoading={auth.loading}
                loginError={auth.error}
                />  
            ) : (
                <Navigate to="/" replace />
            )  
        }
    /> 

    <Route
        path="/register"
        element={
            !auth.isLoggedIn ? (
                <Register 
                onRegisterSubmit={auth.register} 
                isLoading={auth.loading}
                error={auth.error} />
            ) : (
                <Navigate to="/" replace />
            )
        }
    />

        {/* Ruta protegida */ }
    <Route
        path="/"
        element={
            auth.isLoggedIn ? (
                <ProductListContainer
                isLoggedIn={auth.isLoggedIn}
                isAdmin={auth.isAdmin}/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
    );
}

export default App;