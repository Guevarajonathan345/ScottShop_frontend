// src/containers/ProductListContainer.jsx

import { useState, useEffect } from 'react';
import api from '../api/apiService'; // Instancia con seguridad JWT
import ProductCard from '../containers/productCard';
import useAuth from '../auth/useAuth';

const ProductListContainer = () => {

  const [products, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useAuth();

  //limpia el estado al cerrar sesion
  useEffect(() => {
    if (!auth.isLoggedIn) {
      setProductos([]);
      setLoading(false);
      setError(null);
      return;
    }
  }, [auth.isLoggedIn]);

  useEffect(() => {

    if (!auth.isLoggedIn) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // La llamada a la API es simple; la seguridad se maneja en el interceptor
        const { data} = await api.get('/productos'); 
        
        setProductos(data);

      } catch (err) {
        console.error("Fallo la petición:", err);
        
        // Manejo del error 401 devuelto por el backend
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
  }, [auth.isLoggedIn]); // Se ejecuta solo al inicio

    if (!auth.isLoggedIn) return null; 
    if (loading) return <p> Cargando inventario </p>;
    if (error) return <p className="p-4 text-red-500"> Error {error}</p>;


  // Pasa el estado al componente de presentación
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {products.map((product) => (
        <ProductCard 
          key = {product.id}
          product = {product}
          isAdmin={auth.isAdmin}
          />
      ))}
    </div>
  );
};

export default ProductListContainer;