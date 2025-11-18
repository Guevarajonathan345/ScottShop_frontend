// src/containers/ProductListContainer.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/apiService'; // Instancia con seguridad JWT
import ProductList from '../components/ProductList'; // Componente UI

const ProductListContainer = ({isAdmin}) => {
  const [products, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // La llamada a la API es simple; la seguridad se maneja en el interceptor
        const response = await api.get('/productos'); 
        
        setProductos(response.data);

      } catch (err) {
        console.error("Fallo la petición:", err);
        
        // ⭐️ Manejo del error 401 devuelto por el backend
        if (err.response && err.response.status === 401) {
            setError("Acceso denegado. Por favor, inicie sesión (401).");
        } else {
            setError("Error de red o de servidor.");
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); // Se ejecuta solo al inicio

  // Pasa el estado al componente de presentación
  return (
    <ProductList 
      products={products} 
      isLoading={loading} 
      error={error} 
      isAdmin={isAdmin}
    />
  );
};

export default ProductListContainer;