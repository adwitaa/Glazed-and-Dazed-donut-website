import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import useScrollReveal from '../hooks/useScrollReveal';

export default function OrderPage() {
  useScrollReveal();
  const { setCartOpen } = useCart();

  return (
    <>
      <Head><title>Order — Glazed &amp; Dazed</title></Head>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <h1>Get <em>Glazed</em></h1>
          <p>Order before noon for same-day delivery 🚀</p>
        </div>
      </div>

      {/* CTA Section */}
      <section id="cta">
        <div className="cta-glow" />
        <h2 className="cta-title fade-up">Ready to Order <em>Now?</em></h2>
        <p className="cta-sub fade-up">
          Browse our full menu, add your favourites to the cart, and we'll have fresh
          donuts at your door in under two hours.
        </p>
        <div className="cta-actions fade-up">
          <Link href="/menu" className="btn-primary">Browse the Menu →</Link>
          <button className="btn-ghost" onClick={() => setCartOpen(true)}>🛍️ View Cart</button>
        </div>
      </section>

      {/* Info section */}
      <section style={{ padding: '6rem 4rem', background: 'var(--cream)' }}>
        <p className="section-label fade-up" style={{ color: 'var(--caramel)' }}>Delivery Info</p>
        <h2 className="section-title fade-up">How It <em>Works</em></h2>

        <div className="sig-features fade-up" style={{ maxWidth: '560px' }}>
          {[
            { icon: '🛒', text: 'Browse the menu and add donuts to your cart' },
            { icon: '📍', text: 'Confirm your delivery address at checkout' },
            { icon: '⏰', text: 'Order before 12 PM for same-day delivery' },
            { icon: '🚀', text: 'Fresh donuts delivered within 15km radius' },
            { icon: '📦', text: '100% compostable packaging, always' },
          ].map(({ icon, text }) => (
            <div key={text} className="sig-feat">
              <span className="sig-feat-icon">{icon}</span>
              <span className="sig-feat-text" style={{ color: 'var(--brown)' }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem' }} className="fade-up">
          <button className="btn-ghost" style={{ borderColor: 'var(--brown)', color: 'var(--brown)' }}>
            📞 Call Us
          </button>
        </div>
      </section>
    </>
  );
}
