import Head from 'next/head';
import Link from 'next/link';
import MenuCard from '../components/MenuCard';
import { menuItems } from '../data/menuItems';
import useScrollReveal from '../hooks/useScrollReveal';

export default function MenuPage() {
  useScrollReveal();

  return (
    <>
      <Head><title>Menu — Glazed &amp; Dazed</title></Head>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <h1>Our <em>Creations</em></h1>
          <p>Eight hand-crafted masterpieces, baked fresh every morning.</p>
        </div>
      </div>

      {/* Menu Grid */}
      <section id="menu" style={{ paddingTop: '5rem' }}>
        <p className="section-label fade-up">Hand-Crafted Masterpieces</p>
        <h2 className="section-title fade-up">
          Every Bite a <em>Symphony</em>
        </h2>
        <div className="menu-grid">
          {menuItems.map((item, i) => (
            <div key={item.idx} style={{ transitionDelay: `${i * 0.08}s` }}>
              <MenuCard item={item} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/order" className="btn-primary">
            🍩 Place a Bulk Order
          </Link>
        </div>
      </section>
    </>
  );
}
