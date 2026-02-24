const ProductDetailModal = ({ product, onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-base-100 rounded-xl shadow-2xl max-w-lg w-full p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{product.nombre}</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle">✕</button>
        </div>

        <img
          src={`${API_URL}/uploads/${product.imagen}`}
          alt={product.nombre}
          className="h-48 mx-auto object-contain"
        />

        <ul className="mt-4 space-y-2 text-sm">
          <li> Categoría: {product.nombre_categoria}</li>
          <li> Precio: ${product.precio}</li>
          <li> Stock: {product.stock}</li>
          <li> Descripción: {product.descripcion}</li>
        </ul>

        <div className="mt-6 text-right">
          <button onClick={onClose} className="btn btn-primary">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;