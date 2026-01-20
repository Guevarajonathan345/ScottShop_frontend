import {Routes, Route, Navigate} from 'react-router-dom';
import ProductListContainer from './containers/ProductListContainer';
import Login from './pages/login';
import Register from './pages/register';
import useAuth from './hooks/useAuth';
import Navbar from './components/navbar';

function App() {
    const {isLoggedIn, loading, error, login, isAdmin } = useAuth();

    const handleLoginSubmit = async (email, password) => {
        await login(email, password);
    };

    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <>
        <Navbar />

        <Routes>
        {/* Ruta publica*/}
    <Route
        path="/login"
        element={
            !isLoggedIn ? (
                <Login
                onLoginSubmit={handleLoginSubmit}
                isLoading={loading}
                loginError={error}
                />  
            ) : (
                <Navigate to="/" />
            )  
        }
    /> 

    <Route
        path="/register" 
        element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
        />

        {/* Ruta protegida */ }
        <Route 
        path="/"
        element={
            isLoggedIn ? (
                <ProductListContainer 
                isAdmin ={isAdmin}
                isLoggedIn={isLoggedIn} />
            ) : (
                <Navigate to="/login" />
            )
        }
        />
    </Routes>
    </>
    );
}

export default App;