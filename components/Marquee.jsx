const marqueeItems = [
  'Classic Glazed', 'Strawberry Dream', 'Chocolate Bliss',
  'Maple Bacon', 'Matcha Zen', 'Salted Caramel',
  'Red Velvet', 'Lemon Zest', 'Nutella Swirl', 'Birthday Cake',
];

const allItems = [...marqueeItems, ...marqueeItems];

export default function Marquee() {
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
            <span className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
