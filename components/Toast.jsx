import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();
  return (
    <div id="toast" className={toast.show ? 'show' : ''}>
      <span id="toast-icon">{toast.icon}</span>
      <span id="toast-msg">{toast.msg}</span>
    </div>
  );
}
