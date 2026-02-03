import { Navigate } from 'reac-router-dom'
import useAuth from '../auth/UseAuth';

const PrivateRoute = ({children, adminOnly = false}) => {
    const auth = useAuth();

    if (auth.loading) return <p> cargando </p>

    if (!auth.isLoggedIn) {
        return <Navigate to = "/login" replace />; 
    }

    if (adminOnly && !auth.isAdmin) {
        return <Navigate to = "/" replace />;
    }

    return children;
};

export default PrivateRoute;