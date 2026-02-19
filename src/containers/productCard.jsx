const ProductCard = ({ product }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300">

      {/* Imagen */}
      <figure className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden">
        <img
          src={`${API_URL}/uploads/${product.imagen}`}
          alt={product.nombre}
          className="max-h-full max-w-full object-contain"
          //object-contain bg-white w-full h-full hover:scale-105 transition-transform duration-300
        />
      </figure>

      <div className="card-body p-4">

        {/* Categoría */}
        <span className="badge badge-secondary w-fit">
          {product.nombre_categoria}
        </span>

        {/* Nombre */}
        <h3 className="card-title text-lg font-semibold">
          {product.nombre}
        </h3>

        {/* Precio */}
        <p className="text-xl font-semibold text-primary">
          ${product.precio}
        </p>

        {/* Stock */}
        <p className="text-l">
          {product.stock > 0 ? (
            product.stock <= 5 ? (
              <span className="text-warning font-semibold">
                Últimas unidades
              </span>
            ) : (
              <span className="text-success font-semibold">
                En stock
              </span>
            )
          ) : (
            <span className="text-error font-semibold">
              Agotado
            </span>
          )}
        </p>

        {/* Botón compra (opcional) */}
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-primary btn-sm">
            Comprar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
