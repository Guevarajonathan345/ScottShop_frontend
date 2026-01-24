const ProductCard = ({  product, isAdmin }) => {
    return (
        <div className="border rounded p-4 shadow">
            <h3 className="font bold text-lg mb-2">{product.nombre}</h3>
            <p>${product.precio}</p>

            {isAdmin && (
                <div className="flex gap-2 mt-2">
                    <button className = "bg-green text-white-400 px-2">
                        Editar
                    </button>
                    <button className = "bg-red-600 text-white-400 px-2">
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductCard;