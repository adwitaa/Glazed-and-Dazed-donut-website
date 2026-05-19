import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const { totalCount, setCartOpen } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage on mount and when router changes
    const checkToken = () => {
      const token = localStorage.getItem('glazed_user_token');
      setIsLoggedIn(!!token);
    };
    checkToken();
    
    // Add event listener to capture storage changes (e.g. from logout)
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, [router.pathname]);

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
      <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        {isLoggedIn ? (
          <Link href="/dashboard" className="nav-signin-link" style={{ textDecoration: 'none', color: 'var(--sugar)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Dashboard 👤
          </Link>
        ) : (
          <Link href="/auth" className="nav-signin-link" style={{ textDecoration: 'none', color: 'var(--sugar)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Sign In
          </Link>
        )}
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
