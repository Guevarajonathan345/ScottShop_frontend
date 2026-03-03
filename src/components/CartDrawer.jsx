import { useCart } from "../context/CartContext";

const CartDrawer = ({ open, onClose }) => {
  const { cart, removeFromCart, removeOne, addToCart, total } = useCart();
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 z-50 transform transition-transform duration-300
      bg-black/60 backdrop-blur-xl border-l border-white/10 shadow-2xl
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* HEADER */}
      <div className="p-4 flex justify-between items-center border-b border-white/10 text-white">
        <h2 className="text-lg font-bold">🛒 Carrito</h2>
        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-white">✕</button>
      </div>

      {/* BODY */}
      <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-180px)]">

        {cart.length === 0 && (
          <p className="text-white/70 text-center">Carrito vacío</p>
        )}

        {cart.map((p) => (
          <div
            key={p.id}
            className="flex gap-3 items-center bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10"
          >
            {/* IMAGEN */}
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={`${API_URL}/uploads/${p.imagen}`}
                alt={p.nombre}
                className="object-contain w-full h-full"
              />
            </div>

            {/* INFO */}
            <div className="flex-1 text-white">
              <p className="font-semibold text-sm">{p.nombre}</p>
              <p className="text-sm text-white/80">${p.precio}</p>
              <p className="text-xs text-white/60">Cantidad: {p.quantity}</p>
            </div>

            {/* CONTROLES */}
            <div className="flex flex-col gap-1 text-white">
              <button onClick={() => removeOne(p.id)} className="btn btn-sm">-</button>
              <button onClick={() => addToCart(p)} className="btn btn-sm">+</button>
              <button onClick={() => removeFromCart(p.id)} className="btn btn-sm btn-error">x</button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10 text-white">
        <p className="font-bold mb-2">Total: ${total}</p>

        <button className="btn btn-primary w-full mb-2">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;