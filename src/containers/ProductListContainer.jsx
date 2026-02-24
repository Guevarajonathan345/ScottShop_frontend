import ProductCard from './ProductCard';
import useAuth from '../auth/UseAuth';
import { FiEdit2, FiTrash } from 'react-icons/fi';

const ProductListContainer = ({ products, adminMode = false, onEdit, onDelete }) => {
  const auth = useAuth();

  //ADMIN (TABLA)

  if (adminMode && auth.isAdmin) {
    return (
      <div className="overflow-x-auto p-4">
        <table className="table table-zebra w-full">

          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>

                <td>
                  <div className="avatar">
                    <div className="w-14 rounded">
                      <img
                        src={`http://localhost:3000/uploads/${product.imagen}`}
                        alt={product.nombre}
                      />
                    </div>
                  </div>
                </td>

                <td className="font-semibold">{product.nombre}</td>

                <td className="text-primary font-bold">
                  ${product.precio}
                </td>

                <td>
                  <span className={`badge ${
                    product.stock > 0 ? "badge-success" : "badge-error"
                  }`}>
                    {product.stock}
                  </span>
                </td>

                <td>
                  <span className="badge badge-secondary">
                    {product.nombre_categoria}
                  </span>
                </td>

                <td className = "font-semibold"> {product.descripcion}</td>

                <td className="flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="btn btn-sm btn-warning"
                  >
                    <FiEdit2 /> Editar
                  </button>

                  <button
                    onClick={() => onDelete(product.id)}
                    className="btn btn-sm btn-error"
                  >
                    <FiTrash /> Eliminar
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  
  //CLIENTE (GRID)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
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
