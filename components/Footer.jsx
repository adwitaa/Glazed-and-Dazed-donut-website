import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <span className="logo">Glazed <span>&amp;</span> Dazed</span>
          <p>Artisan donuts made with love, baked fresh every morning, and delivered to your door before you even knew you were craving one.</p>
        </div>
        <div className="footer-col">
          <h4>Menu</h4>
          <ul>
            <li><Link href="/menu">Classic Glazed</Link></li>
            <li><Link href="/menu">Seasonal Specials</Link></li>
            <li><Link href="/menu">Vegan Range</Link></li>
            <li><Link href="/menu">Gift Boxes</Link></li>
            <li><Link href="/menu">Catering</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Studio</h4>
          <ul>
            <li><Link href="/story">Our Story</Link></li>
            <li><Link href="/story">Ingredients</Link></li>
            <li><Link href="/story">Press</Link></li>
            <li><Link href="/order">Careers</Link></li>
            <li><Link href="/order">Contact</Link></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">© 2026 Glazed &amp; Dazed. All rings reserved. 🍩</div>
    </>
  );
}
