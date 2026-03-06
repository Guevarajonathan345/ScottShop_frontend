import { useState } from "react";
import { useCart } from "../context/CartContext";
import ProductDetailModal from "../components/ProductDetailModal";
import { motion } from "framer-motion";

const cardAnimation = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 }
  }
};

const ProductCard = ({ product }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={cardAnimation}
        whileHover={{ scale: 1.04 }}
        className="card bg-base-100 shadow-lg hover:shadow-2xl rounded-xl overflow-hidden"
      >

        {/* IMAGEN */}
        <figure className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden">
          <img
            src={`${API_URL}/uploads/${product.imagen}`}
            alt={product.nombre}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110"
          />
        </figure>

        {/* CONTENIDO */}
        <div className="card-body p-4">

          {/* CATEGORÍA */}
          <span className="badge badge-secondary w-fit">
            {product.nombre_categoria}
          </span>

          {/* NOMBRE */}
          <h3 className="card-title text-lg font-semibold">
            {product.nombre}
          </h3>

          {/* PRECIO */}
          <p className="text-xl font-semibold text-primary">
            ${product.precio}
          </p>

          {/* STOCK */}
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

          {/* BOTONES */}
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
      </motion.div>

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