import ProductCard from './ProductCard';
import useAuth from '../auth/UseAuth';
import { FiEdit2, FiTrash } from 'react-icons/fi';


const ProductListContainer = ({ products, adminMode = false, onEdit, onDelete }) => {
  
  const auth = useAuth();

  if (adminMode && auth.isAdmin) {
      return ( 
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Imagen</th>
              <th className="p-3 text-left font-semibold">Nombre</th>
              <th className="p-3 text-left font-semibold">Precio</th>
              <th className="p-3 text-left font-semibold">Stock</th>
              <th className="p-3 text-left font-semibold">Categoría</th>
              {adminMode && <th className="p-3 text-left font-semibold">Acciones</th>}
            </tr>
          </thead>

          <tbody className ="divide-y ">
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

                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                    <FiEdit2 /> Editar
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      <FiTrash />Eliminar
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );  
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductListContainer;