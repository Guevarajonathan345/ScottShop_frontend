import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Login from '../pages/login';
import ProductListContainer from '../containers/productListContainer';
import Register from '../pages/register';
import useAuth from '../auth/useAuth';

const appRoute = () => {

    const auth = useAuth();
    if (auth.loading) return <p>Cargando</p>;

    return (
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
    );
}

export default appRoute;