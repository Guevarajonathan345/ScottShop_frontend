// src/containers/ProductListContainer.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/apiService'; // Instancia con seguridad JWT
import ProductList from '../pages/productList'; // Componente UI

const ProductListContainer = ({isAdmin, isLoggedIn}) => {
  const [products, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //limpia el estado al cerrar sesion
  useEffect(() => {
    if (!isLoggedIn) {
      setProductos([]);
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {

    const token =localStorage.getItem('authToken');

    if (!isLoggedIn || !token) return;

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
  }, [isLoggedIn]); // Se ejecuta solo al inicio

    if (!isLoggedIn) {
    return null; 
    }

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