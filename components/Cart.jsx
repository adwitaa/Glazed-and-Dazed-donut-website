import { useRef } from 'react';
import { useCart } from '../context/CartContext';

export function runEnvelopeAnim(sx, sy, emoji, cb) {
  const stage = document.getElementById('envelope-stage');
  if (!stage) { cb(); return; }

  const fly = document.createElement('div');
  fly.className = 'fly-donut';
  fly.textContent = emoji;
  fly.style.left = sx + 'px';
  fly.style.top = sy + 'px';
  fly.style.transform = 'translate(-50%,-50%)';
  stage.appendChild(fly);

  const ex = window.innerWidth / 2, ey = window.innerHeight - 155;
  fly.animate([
    { left: sx + 'px', top: sy + 'px', transform: 'translate(-50%,-50%) scale(1) rotate(0deg)', opacity: 1 },
    { left: ex + 'px', top: ey + 'px', transform: 'translate(-50%,-50%) scale(.5) rotate(540deg)', opacity: .6 },
    { left: ex + 'px', top: ey + 'px', transform: 'translate(-50%,-50%) scale(0) rotate(1080deg)', opacity: 0 }
  ], { duration: 780, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });

  const ew = document.createElement('div');
  ew.className = 'envelope-wrap';
  ew.innerHTML = `
    <div class="envelope">
      <div class="env-body"></div>
      <div class="env-left"></div><div class="env-right"></div>
      <div class="env-bottom"></div>
      <div class="env-flap" id="envFlap"></div>
      <div class="env-stripe"></div>
      <div class="env-seal" id="envSeal">🍩</div>
    </div>`;
  stage.appendChild(ew);

  setTimeout(() => { const f = document.getElementById('envFlap'); if (f) f.classList.add('open'); }, 280);
  setTimeout(() => {
    const f = document.getElementById('envFlap');
    if (f) {
      f.classList.remove('open');
      setTimeout(() => { const s = document.getElementById('envSeal'); if (s) s.classList.add('show'); }, 300);
    }
  }, 900);
  setTimeout(() => {
    const cb2 = document.getElementById('cart-btn');
    if (cb2) {
      const cr = cb2.getBoundingClientRect();
      const tx = (cr.left + cr.width / 2) - (window.innerWidth / 2);
      const ty = (cr.top + cr.height / 2) - (window.innerHeight - 155);
      ew.style.setProperty('--tx', tx + 'px');
      ew.style.setProperty('--ty', ty + 'px');
      ew.classList.add('fly-away');
      cb2.classList.add('shake');
      setTimeout(() => cb2.classList.remove('shake'), 500);
    }
  }, 1380);

  setTimeout(() => { fly.remove(); ew.remove(); cb(); }, 2050);
}

export default function Cart() {
  const { cart, cartOpen, setCartOpen, changeQty, removeItem, checkout } = useCart();

  const sub = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = Math.round(sub * 0.05);
  const total = sub + 49 + tax;
  const totalItems = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <>
      <div id="envelope-stage" />

      <div id="cart-overlay" className={cartOpen ? 'open' : ''} onClick={() => setCartOpen(false)} />
      <div id="cart-drawer" className={cartOpen ? 'open' : ''}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="cart-title">Your Cart</span>
            <span className="cart-badge">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          </div>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        <div className="cart-items-wrap">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🍩</div>
              <div><strong>Nothing here yet!</strong><p>Add some donuts to get started.</p></div>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={item.idx} className="cart-item">
                <div className="ci-icon">🍩</div>
                <div className="ci-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-price">₹{item.price} each</div>
                  <div className="ci-subtotal">Subtotal: ₹{item.price * item.qty}</div>
                </div>
                <div className="ci-qty">
                  <button className="qty-btn" onClick={() => changeQty(item.idx, -1)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => changeQty(item.idx, 1)}>+</button>
                </div>
                <button className="ci-remove" onClick={() => removeItem(item.idx)} title="Remove">🗑️</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-row"><span>Subtotal</span><span>₹{sub}</span></div>
            <div className="cart-row"><span>Delivery</span><span>₹49</span></div>
            <div className="cart-row"><span>Tax (5%)</span><span>₹{tax}</span></div>
            <div className="cart-total-row">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-num">₹{total}</span>
            </div>
            <button className="checkout-btn" onClick={checkout}>🍩 Place Order</button>
          </div>
        )}
      </div>
    </>
  );
}
