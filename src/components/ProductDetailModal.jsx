import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const ProductDetailModal = ({ product, onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { addToCart } = useCart();

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="
        relative
        w-full
        max-w-3xl
        rounded-2xl
        border border-white/10
        bg-white/10
        backdrop-blur-xl
        shadow-2xl
        text-white
        p-6
        "
      >

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {product.nombre}
          </h2>

          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-white"
          >
            ✕
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="grid md:grid-cols-2 gap-6 items-center">

          {/* IMAGEN */}
          <div className="flex justify-center">
            <img
              src={`${API_URL}/uploads/${product.imagen}`}
              alt={product.nombre}
              className="max-h-[280px] object-contain"
            />
          </div>

          {/* INFO */}
          <div className="space-y-4">

            <span className="badge badge-secondary">
              {product.nombre_categoria}
            </span>

            <p className="text-3xl font-bold text-primary">
              ${product.precio}
            </p>

            <p className="text-sm">
              {product.stock > 0 ? (
                <span className="text-success font-semibold">
                  En stock ({product.stock})
                </span>
              ) : (
                <span className="text-error font-semibold">
                  Producto agotado
                </span>
              )}
            </p>

            <p className="text-sm opacity-80">
              {product.descripcion}
            </p>

            {/* BOTONES */}
            <div className="flex gap-3 pt-2">

              <button
                onClick={() => addToCart(product)}
                className="btn btn-primary flex-1"
                disabled={product.stock === 0}
              >
                Agregar al carrito
              </button>

              <button
                onClick={onClose}
                className="btn btn-outline"
              >
                Cerrar
              </button>

            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ProductDetailModal;