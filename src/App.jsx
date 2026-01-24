import AppRoute from './routes/appRoutes';
import Navbar from './components/navbar';
import useAuth from './auth/useAuth';

function App() {

    const auth = useAuth();
    return (
        <>
        <Navbar
            isLoggedIn={auth.isLoggedIn}
            isAdmin={auth.isAdmin}
            onLogout={auth.logout}
        />
        <AppRoute/>
        </>
    );
}

export default App;