import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //  AGREGAR AL CARRITO (por variante)
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(
        (p) => p.variantes_id === product.variantes_id
      );

      if (exists) {
        return prev.map((p) =>
          p.variantes_id === product.variantes_id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  //  RESTAR 1
  const removeOne = (variantes_id) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.variantes_id === variantes_id
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  //  ELIMINAR COMPLETO
  const removeFromCart = (variantes_id) => {
    setCart((prev) =>
      prev.filter((p) => p.variantes_id !== variantes_id)
    );
  };

  const clearCart = () => setCart([]);

  //  TOTAL
  const total = cart.reduce(
    (acc, p) => acc + p.precio * p.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeOne,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);