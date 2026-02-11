const ProductCard = ({ product, isAdmin, onDelete, onEdit }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    return (

    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            {/* Imagen */}
      <img
        src={`${API_URL}/uploads/${product.imagen}`}
        alt={product.nombre}
        className="w-full h-48 object-cover"
      />    
      <div className="border rounded p-4 shadow">
            <h3 className="font-bold text-lg mb-2">{product.nombre}</h3>
            <p className="text-yellow-600 text-sm">{product.nombre_categoria}</p>
            <p className="text-gray-600 ">${product.precio}</p>
            <p className="text-sm">
                {product.stock > 0 ? (
                product.stock <= 5 ? (
                <span className="text-orange-500">Últimas unidades</span>
                ) : (
                <span className="text-green-600">En stock</span>
                )
                ) : (
                <span className="text-red-600">Agotado</span>
                )}
            </p>
        </div>
    </div>   
    );
};

export default ProductCard;