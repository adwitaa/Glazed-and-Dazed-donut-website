import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const router = useRouter();
  const { totalCount, setCartOpen } = useCart();

  const links = [
    { href: '/menu', label: 'Menu' },
    { href: '/story', label: 'Our Story' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/order', label: 'Order' },
  ];

  return (
    <nav id="navbar">
      <Link href="/" className="nav-logo">
        Glazed <span>&amp;</span> Dazed
      </Link>
      <ul className="nav-links">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={router.pathname === href ? 'active' : ''}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/order" className="nav-cta" style={{ textDecoration: 'none' }}>
          Order Now
        </Link>
        <button id="cart-btn" onClick={() => setCartOpen(true)}>
          🛍️
          <span id="cart-count" className={totalCount > 0 ? 'show' : ''}>{totalCount}</span>
        </button>
      </div>
    </nav>
  );
}
