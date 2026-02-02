import {Routes, Route, Navigate} from 'react-router-dom';
import Login from '../pages/Login';
import ProductListContainer from '../containers/ProductListContainer';
import Register from '../pages/Register';
import useAuth from '../auth/UseAuth';
import AdminPanel from '../pages/AdminPanel';

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