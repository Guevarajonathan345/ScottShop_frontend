// src/containers/ProductListContainer.jsx

import { useState, useEffect } from 'react';
import api from '../api/ApiService'; // Instancia con seguridad JWT
import ProductCard from './ProductCard';
import useAuth from '../auth/UseAuth';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

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
     <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Imagen</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Precio</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Categoría</th>
            {adminMode && <th className="p-3 text-left">Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <img
                  src={`http://localhost:3000/uploads/${product.imagen}`}
                  alt={product.nombre}
                  className="w-14 h-14 object-cover rounded"
                />
              </td>
              <td className="p-2">{product.nombre}</td>
              <td className="p-2">${product.precio}</td>
              <td className="p-2">{product.stock}</td>
              <td className="p-2">{product.nombre_categoria}</td>

              {adminMode && auth.isAdmin && (
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    <FiEdit2 /> Editar
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    <fiTrash2 />Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListContainer;