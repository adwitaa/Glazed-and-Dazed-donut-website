import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useScrollReveal from '../hooks/useScrollReveal';

export default function StoryPage() {
  useScrollReveal();

  return (
    <>
      <Head><title>Our Story — Glazed &amp; Dazed</title></Head>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <h1>The <em>Glazed</em> Difference</h1>
          <p>Why every donut we make is a labour of love.</p>
        </div>
      </div>

      {/* Signature Section */}
      <section id="signature">
        <div className="sig-left fade-up">
          <p className="sig-label">Why Choose Us</p>
          <h2 className="sig-title">The <em>Glazed</em> Difference</h2>
          <p className="sig-text">
            Every donut is a labour of love. We source locally, bake in small batches,
            and glaze each ring by hand. No shortcuts. Just pure, unapologetic indulgence.
          </p>
          <div className="sig-features">
            {[
              { icon: '🌾', text: 'Locally sourced, organic flour & eggs' },
              { icon: '🎨', text: 'Hand-painted glazes & artistic toppings' },
              { icon: '🚀', text: 'Same-day delivery within 15km' },
              { icon: '♻️', text: '100% compostable packaging' },
            ].map(({ icon, text }) => (
              <div key={text} className="sig-feat">
                <span className="sig-feat-icon">{icon}</span>
                <span className="sig-feat-text">{text}</span>
              </div>
            ))}
          </div>
          <Link href="/order" className="btn-primary">Start Your Order →</Link>
        </div>

        <div className="sig-visual fade-up">
          <div className="rotating-plate" id="rotatingPlate">
            <div className="plate-ring" style={{ width: '340px', height: '340px' }} />
            <div className="plate-ring" style={{ width: '280px', height: '280px', borderStyle: 'solid', opacity: 0.4 }} />
            <Image src="/images/menu_glazed.png" className="big-donut" alt="Donut" width={250} height={250} />
            <div className="orbit-donut" style={{ top: '50%', left: '50%', transformOrigin: '0 0', animationDuration: '8s' }}>🍦</div>
            <div className="orbit-donut" style={{ top: '50%', left: '50%', transformOrigin: '0 0', animationDuration: '12s', animationDelay: '-4s', fontSize: '1.8rem' }}>⭐</div>
            <div className="orbit-donut" style={{ top: '50%', left: '50%', transformOrigin: '0 0', animationDuration: '6s', animationDelay: '-2s', fontSize: '2rem' }}>🎂</div>
          </div>
        </div>
      </section>

      {/* Extra story content */}
      <section style={{ padding: '8rem 4rem', background: 'var(--cream)', textAlign: 'center' }}>
        <p className="section-label fade-up">Our Roots</p>
        <h2 className="section-title fade-up">From a <em>Kitchen</em> to a Movement</h2>
        <p className="fade-up" style={{ color: 'var(--brown)', maxWidth: '640px', margin: '0 auto 3rem', lineHeight: 1.8, opacity: 0 }}>
          It started in 2019 with a single recipe, a second-hand mixer, and a stubborn refusal
          to compromise. Today we bake hundreds of donuts a day — but every ring is still finished
          by hand, just like it was on day one.
        </p>
        <div className="fade-up">
          <Link href="/menu" className="btn-primary" style={{ marginRight: '1rem' }}>
            See the Menu
          </Link>
          <Link href="/reviews" className="btn-ghost">
            Read Reviews
          </Link>
        </div>
      </section>
    </>
  );
}
