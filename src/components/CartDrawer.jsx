import { useCart } from "../context/CartContext";

const CartDrawer = ({ open, onClose }) => {
  const { cart, removeFromCart, removeOne, addToCart, total, clearCart } = useCart();

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-base-100 shadow-xl z-50 transform transition-transform duration-300
      ${open ? "translate-x-0" : "translate-x-full"}`}>

      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold">🛒 Carrito</h2>
        <button onClick={onClose} className="btn btn-sm btn-circle">✕</button>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-180px)]">

        {cart.length === 0 && <p>Carrito vacío</p>}

        {cart.map((p) => (
          <div key={p.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-semibold">{p.nombre}</p>
              <p>${p.precio}</p>
              <p>Cantidad: {p.quantity}</p>
            </div>

            <div className="flex flex-col gap-1">
              <button onClick={() => removeOne(p.id)} className="btn btn-xs">-</button>
              <button onClick={() => addToCart(p)} className="btn btn-xs">+</button>
              <button onClick={() => removeFromCart(p.id)} className="btn btn-xs btn-error">✕</button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <p className="font-bold mb-2">Total: ${total}</p>

        <button className="btn btn-primary w-full mb-2">
          Comprar
        </button>

        <button onClick={clearCart} className="btn btn-outline w-full">
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;