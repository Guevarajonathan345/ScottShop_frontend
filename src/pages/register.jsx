import {useState} from "react";

const Register = ( { onRegisterSubmit, isLoading, registerError }) => {
    // Estados locales para los campos del formulario
    const [nombre, setNombre] = useState ('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();
        // Llama a la función del Contenedor/App con los datos del estado
        onRegisterSubmit(nombre, email, password);
    };

    return ( 
        <div style={{padding: '40px', maxWidth: '400px', 
                    margin: '50px auto', border: '1px solid #ccc', 
                    borderRadius: '10px'}}>

           <h2>Registrar nueva cuenta</h2>
            {registerError && <p style = {{color: 'red', fontWeight: 'bold' }}> {registerError} </p>}

            <form onSubmit={ handleSubmit}>
                <div style={{marginBottom: '15px'}}>
                    <label>Nombre:</label>
                    <input 
                       type = "text"
                       value = {nombre}
                       onChange={(e) => setNombre(e.target.value)}
                       required
                       style = {{width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box'}}
                       />
                </div>

                <div style={{marginBottom: '15px'}}>
                    <label>Correo electrónico:</label>
                    <input 
                       type = "email"
                       value = {email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                       style = {{width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box'}}
                       />
                </div>

                <div style={{marginBottom: '15px'}}>
                    <label> Contraseña:</label>
                    <input 
                       type = "password"
                       value = {password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                       style = {{width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box'}}
                       />
                </div>

                <button 
                type = "submit" 
                disabled = {isLoading}
                style = {{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: isLoading ? '#aaa' : '#28bb25ff', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
                >
                    {isLoading ? 'Registrando' : 'Crear cuenta'}
                </button>
            </form>
        </div>            
    );
};

export default Register;