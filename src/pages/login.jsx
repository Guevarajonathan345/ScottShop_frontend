import { useState } from "react";

// Recibe la función de login del Contenedor (onLoginSubmit) y el estado de error
const Login = ({onLoginSubmit, isLoading, loginError}) => {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e ) => {
        e.preventDefault(); //previene el refresco de pagina
        onLoginSubmit(email, password);//llama la logica del Contenedor
    };

    return ( 
        <div style={{padding: '40px', maxWidth: '400px', margin: '50px auto', 
        border: '1px solid #0b0b0b', borderRadiu: '10px' }}>
            <h3>Iniciar Sesión</h3>
            {loginError && <p style={{color: 'red', fontWeight: 'bold'}}>{loginError}</p>}

            <form onSubmit={handleSubmit}> 
                <div style={{marginBottom: '15px'}}>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        style={{width: '100%', padding: '10px', marginTop: '5px', 
                        boxSizing: 'border-box', border: '1px solid black' }}
                        />
                </div>
                <div style = {{marginBottom: '20px'}}>
                        <label>Contraseña:</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{width: '100%', padding: '10px', marginTop: '5px', 
                            boxSizing: 'border-box', border: '1px solid black' }}
                            />
                </div>
                <button 
                    type = "submit"
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: isLoading ? '#aaa' : '#11147aff',
                        color: 'white',
                        border: 'none',
                        borderradious: '5px',
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                    }} 
                    >
                        {isLoading ? 'Cargando...' : 'Login' }
                </button>
            </form>
        </div>
    );
};

export default Login;