import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={cardAnimation}
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ duration: 0.2 }}
        className="card bg-base-100 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden border border-base-300"
      >
        {/* IMAGEN */}
        <figure className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden p-6">
          <img
            src={`${API_URL}/uploads/${product.imagen}`}
            alt={product.nombre}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </figure>

        {/* CONTENIDO */}
        <div className="card-body p-5 space-y-2">
          {/* CATEGORÍA */}
          <span className="badge bg-secondary text-secondary-content border-none px-3 py-3 rounded-full w-fit font-medium">
            {product.nombre_categoria}
          </span>

          {/* NOMBRE */}
          <h3 className="card-title text-lg font-semibold leading-snug line-clamp-2">
            {product.nombre}
          </h3>

          {/* VERSIONES DISPONIBLES */}
          <p className="text-sm text-base-content/60">
            {product.variantes?.length || 0} versiones disponibles
          </p>

          {/* PRECIO MÍNIMO */}
          <div className="pt-1">
            <p className="text-xs font-bold uppercase tracking-wide text-base-content/50">
              Desde
            </p>
            <p className="text-lg text-base-content/70 font-semibold">
              ${product.precio_min}
            </p>
          </div>

          {/* BOTÓN */}
          <div className="card-actions mt-3">
            <button
              onClick={() => setOpen(true)}
              className="btn btn-primary btn-sm w-full rounded-xl"
            >
              Ver opciones
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