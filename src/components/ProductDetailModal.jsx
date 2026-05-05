import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const ProductDetailModal = ({ product, onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { addToCart } = useCart();

  const variantes = product?.variantes || [];

  const [selectedVariant, setSelectedVariant] = useState(
    variantes[0] || null
  );

  // Reiniciar variante si cambia producto
  useEffect(() => {
    setSelectedVariant(variantes[0] || null);
  }, [product]);

  const hasStock = selectedVariant?.stock > 0;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addToCart({
      ...product,
      variantes_id: selectedVariant.id,
      sku: selectedVariant.sku,
      almacenamiento: selectedVariant.almacenamiento,
      ram: selectedVariant.ram,
      precio: selectedVariant.precio,
      stock: selectedVariant.stock,
    });
  };

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
          max-w-4xl
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
          <h2 className="text-2xl font-bold">{product.nombre}</h2>

          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-white"
          >
            ✕
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* IMAGEN */}
          <div className="flex justify-center">
            <img
              src={`${API_URL}/uploads/${product.imagen}`}
              alt={product.nombre}
              className="max-h-[320px] object-contain"
            />
          </div>

          {/* INFO */}
          <div className="space-y-5">
            <span className="badge badge-secondary">
              {product.nombre_categoria}
            </span>

            {/* SELECTOR DE VARIANTES */}
            <div>
              <h3 className="font-semibold mb-3">
                Selecciona una versión
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {variantes.map((variantes) => {
                  const isActive = selectedVariant?.id === variantes.id;

                  return (
                    <button
                      key={variantes.id}
                      onClick={() => setSelectedVariant(variantes)}
                      className={`
                        border rounded-xl p-3 text-left transition-all
                        ${
                          isActive
                            ? "border-primary bg-primary/20"
                            : "border-white/10 hover:border-primary/40"
                        }
                      `}
                    >
                      <p className="font-semibold">
                        {variantes.almacenamiento}
                      </p>
                      <p className="text-sm opacity-80">
                        RAM: {variantes.ram}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRECIO DINÁMICO */}
            <motion.p
              key={selectedVariant?.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-3xl font-bold text-primary"
            >
              ${selectedVariant?.precio}
            </motion.p>

            {/* STOCK DINÁMICO */}
            <p className="text-sm">
              {hasStock ? (
                <span className="text-success font-semibold">
                  En stock ({selectedVariant.stock})
                </span>
              ) : (
                <span className="text-error font-semibold">
                  Variante agotada
                </span>
              )}
            </p>

            <p className="text-sm opacity-80">
              {product.descripcion}
            </p>

            {/* BOTONES */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1"
                disabled={!hasStock}
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