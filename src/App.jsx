import AppRoute from './routes/appRoutes';
import { useState } from "react";
import Navbar from './components/Navbar';
import useAuth from './auth/UseAuth';
import { Toaster } from "react-hot-toast"
import CartDrawer from "./components/CartDrawer";

function App() {

    const auth = useAuth();
    const [openCart, setOpenCart] = useState(false);

    return (
        <>
        <Navbar 
            onOpenCart = {() => setOpenCart(true)}
            isLoggedIn={auth.isLoggedIn}
            isAdmin={auth.isAdmin}
            onLogout={auth.logout}
        />
        <Toaster position = "top-right" reverseOrder={false} 
        />
        <AppRoute/>
        <CartDrawer 
         open= {openCart} 
         onClose = {() => setOpenCart(false)}
         />
        </>   
    );
}

export default App;