import Head from 'next/head';
import Link from 'next/link';
import useScrollReveal from '../hooks/useScrollReveal';

const testimonials = [
  { text: 'The salted caramel donut changed my life. I dream about it. I wake up thinking about it. My therapist says this is healthy.', name: 'Priya S.', loc: 'Ludhiana', avatar: '👩‍🦱' },
  { text: 'Ordered for our office meeting and now my entire team refuses to work without a Glazed & Dazed box on the table. Worth it.', name: 'Rahul M.', loc: 'Chandigarh', avatar: '👨‍💻' },
  { text: 'The matcha donut is pure art. I felt bad eating it. For about 0.3 seconds. Then I ordered another six.', name: 'Anika J.', loc: 'Amritsar', avatar: '👩‍🎨' },
  { text: 'Delivery was faster than I expected. The box arrived warm and beautiful. I cried a little. No regrets.', name: 'Vikram D.', loc: 'Ludhiana', avatar: '👨‍🍳' },
  { text: 'Classic Glazed is the gold standard. Everything else is just trying to keep up.', name: 'Simran K.', loc: 'Patiala', avatar: '👩‍💼' },
  { text: 'Birthday Cake donut for my daughter\'s party — she declared it the best birthday ever. I agree.', name: 'Ravi P.', loc: 'Jalandhar', avatar: '👨‍👧' },
];

export default function ReviewsPage() {
  useScrollReveal();

  return (
    <>
      <Head><title>Reviews — Glazed &amp; Dazed</title></Head>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <h1>Happy <em>Customers</em></h1>
          <p>Don't take our word for it — take theirs.</p>
        </div>
      </div>

      {/* Testimonials */}
      <section id="testimonials">
        <p className="section-label fade-up">Happy Customers</p>
        <h2 className="section-title fade-up" style={{ color: 'var(--brown)' }}>
          What People Are <em>Saying</em>
        </h2>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testi-card fade-up"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <span className="testi-avatar">{t.avatar}</span>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-loc">{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/menu" className="btn-primary">
            🍩 Try One Yourself
          </Link>
        </div>
      </section>
    </>
  );
}
