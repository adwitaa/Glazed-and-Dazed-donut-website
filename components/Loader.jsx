import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only show loader on first visit per session
    const seen = sessionStorage.getItem('loader-shown');
    if (seen) { setDone(true); return; }

    const t1 = setTimeout(() => {
      setHidden(true);
      const t2 = setTimeout(() => {
        setDone(true);
        sessionStorage.setItem('loader-shown', '1');
      }, 800);
      return () => clearTimeout(t2);
    }, 3400);
    return () => clearTimeout(t1);
  }, []);

  if (done) return null;

  return (
    <div
      id="loader"
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'scale(1.05)' : 'scale(1)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div id="loader-tunnel">
        {[1,2,3,4,5,6,7].map(i => <div key={i} className="ring" />)}
      </div>
      <Image src="/images/hero_donut.png" id="loader-donut" alt="Loading" width={150} height={150} />
      <div id="loader-text">Glazed &amp; Dazed</div>
      <div id="loader-sub">Artisan Donut Studio</div>
      <div id="loader-bar-wrap"><div id="loader-bar" /></div>
    </div>
  );
}
