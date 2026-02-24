import { useState } from "react";
import { useCart } from "../context/CartContext";
import ProductDetailModal from "../components/ProductDetailModal";

const ProductCard = ({ product }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl">

        <figure className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden rounded-t-xl">
          <img
            src={`${API_URL}/uploads/${product.imagen}`}
            alt={product.nombre}
            className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </figure>

        <div className="card-body p-4">

          <span className="badge badge-secondary w-fit">
            {product.nombre_categoria}
          </span>

          <h3 className="card-title text-lg font-semibold">
            {product.nombre}
          </h3>

          <p className="text-xl font-semibold text-primary">
            ${product.precio}
          </p>

          <p className="text-sm">
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

          {/* Acciones */}
          <div className="card-actions justify-between mt-2">

            <button
              onClick={() => setOpen(true)}
              className="btn btn-ghost btn-sm"
            >
              Ver más
            </button>

            <button
              onClick={() => addToCart(product)}
              className="btn btn-primary btn-sm"
              disabled={product.stock === 0}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <ProductDetailModal
          product={product}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
