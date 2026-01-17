import React from "react";

// Solo recibe el estado del Contenedor mediante props

const ProductList = ({ products, isLoading, error, isAdmin }) => {
    if (isLoading) return <h2 style = {{padding: '20px' }}> Cargando inventario... </h2>;
    
    // Renderiza el mensaje de error si el backend retornó un 401
    if (error) return <h2 style={{color: 'red', padding: '20px'}}>Error: {error}</h2>;

    if (products.length === 0) return <h2 style={{padding: '20px'}}>No hay producto disponible</h2>;

    return (
        <div style={{padding: '20px', fontFamily: 'sans-serif'}}>
            <h1>Inventario de productos</h1>
            {products.map(product => (
                <div key={product.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
                    <h4>
                        {product.nombre}
                        {isAdmin && (
                        < div style={{marginTop: '10px'}}>
                        <button style={{ backgroundColor: 'black', 
                            color: 'rgba(247, 255, 5, 0.83)'}}>Editar 
                        </button>
                        <button style={{ backgroundColor: 'white', 
                            color: 'red', marginLeft: '10px'}}>Eliminar</button>
                        </div>
                        )} 
                    </h4>
                    <p>precio: ${parseFloat(product.precio).toFixed(2)}</p>
                    <p>categoria: {product.nombre_categoria}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;