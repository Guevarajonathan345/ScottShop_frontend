import ProductCard from './ProductCard';
import useAuth from '../auth/UseAuth';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import VariantManager from '../components/VariantManager';


const ProductListContainer = ({ products, adminMode = false, onEdit, onDelete, onManageVariants }) => {
  const auth = useAuth();

  // ADMIN (TABLA)
  if (adminMode && auth.isAdmin) {
    return (
      <div className="overflow-x-auto p-4">
        <table className="table table-zebra w-full">

          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio desde</th>
              <th>Stock total</th>
              <th>Variantes</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {

              const totalStock = product.variantes?.reduce(
                (acc, v) => acc + v.stock,
                0
              ) || 0;

              return (
                <tr key={product.id}>

                  {/* IMAGEN */}
                  <td>
                    <div className="avatar">
                      <div className="w-14 rounded bg-white">
                        <img
                          src={`http://localhost:3000/uploads/${product.imagen}`}
                          alt={product.nombre}
                        />
                      </div>
                    </div>
                  </td>

                  {/* NOMBRE */}
                  <td className="font-semibold">
                    {product.nombre}
                  </td>

                  {/* PRECIO MIN */}
                  <td className="font-bold text-primary">
                    ${product.precio_min}
                  </td>

                  {/* STOCK TOTAL */}
                  <td>
                    <span className={`badge ${
                      totalStock > 0 ? "badge-success" : "badge-error"
                    }`}>
                      {totalStock}
                    </span>
                  </td>

                  {/* VARIANTES */}
                  <td>
                    <span className="badge badge-outline">
                      {product.variantes?.length || 0}
                    </span>
                  </td>

                  {/* CATEGORIA */}
                  <td>
                    <span className="badge badge-secondary">
                      {product.nombre_categoria}
                    </span>
                  </td>

                  {/* ACCIONES */}
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
                    <button
                      onClick={() => onManageVariants(product)}
                      className="btn btn-sm btn-info"
                    >
                      Variantes
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // CLIENTE (GRID)
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