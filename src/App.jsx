import AppRoute from './routes/appRoutes';
import Navbar from './components/Navbar';
import useAuth from './auth/UseAuth';
import { Toaster } from "react-hot-toast"

function App() {

    const auth = useAuth();
    return (
        <>
        <Navbar
            isLoggedIn={auth.isLoggedIn}
            isAdmin={auth.isAdmin}
            onLogout={auth.logout}
        />
        <Toaster position = "top-right" reverseOrder={false} 
        />
        <AppRoute/>
        </>
    );
}

export default App;