import React from 'react';

// Recibe los props del contenedor: el estado del formulario, 
// las funciones para manejar cambios, y el envío (submit).

const createProductForm = ({ productData, handleChange, handleSubmit, iLoading, error }) => {
    return (
        <div style={ { padding: '40px', maxWidth: '500px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '10px'}}>
            <h2>Crear nuevo producto</h2>
            {error && <p style={{ color: 'red', fontWeight: 'bold'}}>{error}</p> }

            <form onSubmit={handleSubmit}>
                <div style={ { marginBottom: '15px'}}>
                    <label>Nombre del producto</label>
                    <input 
                    type='text'
                    name='nombre'
                    value={productData.nombre}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '15px', marginTop: '5px'}}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        value={productData.precio}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>ID de Categoría:</label>
                    <input
                        type="number"
                        name="categoria_id"
                        value={productData.categoria_id}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>
                
                <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff' }}>
                    {isLoading ? 'Creando...' : 'Crear Producto'}
                </button>
            </form>
        </div>
    );
};