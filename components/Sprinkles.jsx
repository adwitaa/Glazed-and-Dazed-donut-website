import { useEffect, useRef } from 'react';

const sprColors = ['#ff6b9d', '#ffe4c4', '#c4763a', '#f4a0b5', '#fff6e9'];

export default function Sprinkles() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 25; i++) {
      const s = document.createElement('div');
      s.className = 'sprinkle';
      const w = 4 + Math.random() * 6;
      s.style.cssText = `
        width:${w}px; height:${w * 3}px;
        background:${sprColors[Math.floor(Math.random() * sprColors.length)]};
        left:${Math.random() * 100}%;
        opacity:${0.4 + Math.random() * 0.5};
        border-radius: 4px;
        animation-duration:${6 + Math.random() * 10}s;
        animation-delay:${Math.random() * 10}s;
        transform: rotate(${Math.random() * 360}deg);
      `;
      container.appendChild(s);
    }
  }, []);

  return <div ref={ref} id="sprinkles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }} />;
}
