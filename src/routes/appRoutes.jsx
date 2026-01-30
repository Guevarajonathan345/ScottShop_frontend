import {Routes, Route, Navigate} from 'react-router-dom';
import Login from '../pages/login';
import ProductListContainer from '../containers/productListContainer';
import Register from '../pages/register';
import useAuth from '../auth/useAuth';
import AdminPanel from '../pages/adminPanel';

const appRoute = () => {

    const auth = useAuth();
    if (auth.loading) return <p>Cargando</p>;

    return (
        <Routes>

        <Route path="/" element={<ProductListContainer/> } />
        
        {/*LOGIN*/}
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
                <Navigate to={auth.isAdmin ? "/admin" : "/" } replace />
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
                loginError={auth.error}
                />
            ) : (
                <Navigate to={auth.isAdmin ? "/admin" : "/"} replace />
            )
        }
        />

        {/* Admin panel */} 
        <Route
        path="/admin"
        element={
            auth.isLoggedIn && auth.isAdmin ? <AdminPanel /> 
            : 
            <Navigate to ="/" replace />}
        /> 
      </Routes>
    );
};

export default appRoute;