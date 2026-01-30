// src/containers/ProductListContainer.jsx

import { useState, useEffect } from 'react';
import api from '../api/apiService'; // Instancia con seguridad JWT
import ProductCard from './ProductCard';
import useAuth from '../auth/useAuth';

const ProductListContainer = ({adminMode = false, onEdit, refresh}) => {

  const [products, setProductos] = useState([]);
  const auth = useAuth();


    const fetchProducts = async () => {
      try {

        // La llamada a la API es simple; la seguridad se maneja en el interceptor
        const { data } = await api.get('/productos'); 
        
        setProductos(data); 

      } catch (err) {
        console.error("Fallo la petición:", err);
        
        // Manejo del error 401 devuelto por el backend
        if (err.response && err.response.status === 401) {
            setError("Acceso denegado. Por favor, inicie sesión (401).");
        } else {
            setError("Error de red o de servidor.");
        }
      }
    };

    useEffect(() => {
      fetchProducts();
    }, [refresh]);

    const handleDelete = async (id) => {

      if(!window.confirm("Deseas eliminar este producto?")) return;
      await api.delete(`/productos/${id}`);
      fetchProducts();
    };



  // Pasa el estado al componente de presentación
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {products.map((product) => (
        <ProductCard 
          key = {product.id}
          product = {product}
          isAdmin={adminMode && auth.isAdmin}
          onDelete={() => handleDelete (product.id)}
          onEdit= {() => onEdit && onEdit(product)}
          />
      ))}
    </div>
  );
};

export default ProductListContainer;