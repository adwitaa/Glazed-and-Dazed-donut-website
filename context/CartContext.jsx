import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, icon: '', msg: '' });
  let toastTimer = null;

  const showToast = useCallback((icon, msg) => {
    setToast({ show: true, icon, msg });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToast(t => ({ ...t, show: false })), 3200);
  }, []);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const ex = prev.find(c => c.idx === item.idx);
      if (ex) return prev.map(c => c.idx === item.idx ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const changeQty = useCallback((idx, delta) => {
    setCart(prev => {
      const updated = prev.map(c => c.idx === idx ? { ...c, qty: c.qty + delta } : c);
      return updated.filter(c => c.qty > 0);
    });
  }, []);

  const removeItem = useCallback((idx) => {
    setCart(prev => prev.filter(c => c.idx !== idx));
  }, []);

  const checkout = useCallback(() => {
    if (!cart.length) return;
    showToast('🎉', 'Order placed! Fresh donuts incoming!');
    setCart([]);
    setCartOpen(false);
  }, [cart, showToast]);

  const totalCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <CartContext.Provider value={{
      cart, cartOpen, setCartOpen, toast,
      showToast, addToCart, changeQty, removeItem, checkout, totalCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
