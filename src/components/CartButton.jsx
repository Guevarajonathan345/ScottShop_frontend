import { useCart } from "../context/CartContext";

const CartButton = ({ onOpen }) => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <button
      onClick={onOpen}
      className="relative btn btn-ghost btn-circle"
    >
      🛒
      {totalItems > 0 && (
        <span className="badge badge-primary absolute -top-1 -right-1">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;