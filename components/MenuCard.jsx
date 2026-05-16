import Image from 'next/image';
import { useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { runEnvelopeAnim } from './Cart';

export default function MenuCard({ item }) {
  const cardRef = useRef(null);
  const wrapRef = useRef(null);
  const [btnState, setBtnState] = useState('idle'); // idle | adding | added
  const { addToCart, showToast, setCartOpen } = useCart();

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (btnState !== 'idle') return;
    setBtnState('adding');

    const wrap = wrapRef.current;
    const rect = wrap ? wrap.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 };
    const sx = rect.left + rect.width / 2;
    const sy = rect.top + rect.height / 2;

    runEnvelopeAnim(sx, sy, '🍩', () => {
      addToCart(item);
      showToast('✉️', `🍩 ${item.name} added to your order!`);
      setBtnState('added');
      setTimeout(() => {
        setBtnState('idle');
        setCartOpen(true);
      }, 400);
      setTimeout(() => setBtnState('idle'), 2000);
    });
  };

  return (
    <div
      className="menu-card fade-up"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-shimmer" />
      <div className="card-image-wrap" ref={wrapRef}>
        <Image src={item.img} className="card-image" alt={item.name} width={200} height={200} />
      </div>
      <div className="card-info">
        <div className="card-name">{item.name}</div>
        <div className="card-desc">{item.desc}</div>
        <div className="card-footer">
          <div className="card-price">₹{item.price}</div>
          <button
            className="card-btn"
            onClick={handleAddToCart}
            disabled={btnState === 'adding'}
            style={btnState === 'added' ? { background: '#2ecc71', borderColor: '#2ecc71', color: 'white' } : {}}
          >
            {btnState === 'adding' ? 'Adding…' : btnState === 'added' ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
