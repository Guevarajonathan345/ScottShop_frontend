const ProductCard = ({ product, isAdmin }) => {
    return (

    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            {/* Imagen */}
      <img
        src={`http://localhost:3000/uploads/${product.imagen}`}
        alt={product.nombre}
        className="w-full h-48 object-cover"
      />
      <div className="border rounded p-4 shadow">
            <h3 className="font bold text-lg mb-2">{product.nombre}</h3>
            <p className="text-yellow-600 text-sm">{product.nombre_categoria}</p>
            <p className="text-gray-600 ">${product.precio}</p>


            {isAdmin && (
                <div className="flex gap-2 mt-2">
                    <button className = "bg-green text-green-900 px-2">
                        Editar
                    </button>
                    <button className = "bg-red-600 text-red-400 px-2">
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    </div>   
    );
};

export default ProductCard;