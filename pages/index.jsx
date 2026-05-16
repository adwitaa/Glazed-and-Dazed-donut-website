import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Marquee from '../components/Marquee';
import Sprinkles from '../components/Sprinkles';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Head><title>Glazed &amp; Dazed — Artisan Donuts</title></Head>

      {/* ── HERO ── */}
      <section id="hero">
        <Sprinkles />
        <Image
          src="/images/hero_donut.png"
          id="hero-donut-img"
          alt="Artisan Donut"
          width={600}
          height={600}
          priority
        />
        <div className="hero-content">
          <div className="hero-badge no-delay">Fresh • Artisan • Local</div>
          <h1 className="hero-title no-delay">
            Life is Short,
            <span className="accent">Eat the Donut.</span>
          </h1>
          <p className="hero-desc no-delay">
            Hand-glazed, small-batch artisan donuts baked fresh every morning. Delivered
            to your door still warm. Because you deserve better than average.
          </p>
          <div className="hero-actions no-delay">
            <Link href="/menu" className="btn-primary">
              Explore the Menu →
            </Link>
            <Link href="/story" className="btn-ghost">
              ✦ Our Story
            </Link>
          </div>
        </div>
        <div className="hero-stats no-delay">
          <div className="stat">
            <div className="stat-num">8<span>+</span></div>
            <div className="stat-label">Flavours</div>
          </div>
          <div className="stat">
            <div className="stat-num">12<span>k</span></div>
            <div className="stat-label">Happy Bites</div>
          </div>
          <div className="stat">
            <div className="stat-num">4.9<span>★</span></div>
            <div className="stat-label">Rating</div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── QUICK PREVIEW ── */}
      <section id="cta" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="cta-glow" />
        <h2 className="cta-title fade-up">
          Ready to Get <em>Glazed?</em>
        </h2>
        <p className="cta-sub fade-up">Order before noon and get same-day delivery 🚀</p>
        <div className="cta-actions fade-up">
          <Link href="/menu" className="btn-primary">Order Now — From ₹149</Link>
          <Link href="/story" className="btn-ghost">📖 Our Story</Link>
        </div>
      </section>
    </>
  );
}
