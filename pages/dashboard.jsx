import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuItems';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';
import Input from '../components/ui/Input';

export default function DashboardPage() {
  const router = useRouter();
  const { addToCart, setCartOpen, showToast } = useCart();

  // Authentication validation
  const [userName, setUserName] = useState('Artisan Baker');
  const [loading, setLoading] = useState(true);

  // Dashboard states
  const [activeTab, setActiveTab] = useState('overview'); // overview, orders, rewards, payments
  const [expandedOrder, setExpandedOrder] = useState(null); // id of expanded order
  const [invoiceOrder, setInvoiceOrder] = useState(null); // order for invoice modal
  const [addCardModal, setAddCardModal] = useState(false); // card creation modal

  // Payments states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [savedCards, setSavedCards] = useState([
    { id: 1, name: 'Alex Johnson', number: '•••• •••• •••• 4296', expiry: '12/28', brand: 'Visa' },
    { id: 2, name: 'Alex Johnson', number: '•••• •••• •••• 8812', expiry: '05/27', brand: 'Mastercard' },
  ]);

  // Toast status
  const [toast, setToast] = useState({ show: false, msg: '', variant: 'success', icon: '✨' });

  const triggerLocalToast = (msg, variant = 'success', icon = '✨') => {
    setToast({ show: true, msg, variant, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3200);
  };

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('glazed_user_token');
    const storedName = localStorage.getItem('glazed_user_name');

    if (!token) {
      router.push('/auth');
    } else {
      if (storedName) {
        // Capitalize name
        setUserName(storedName.charAt(0).toUpperCase() + storedName.slice(1));
      }
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('glazed_user_token');
    localStorage.removeItem('glazed_user_name');
    showToast('🔑', 'Logged out successfully');
    router.push('/auth');
  };

  // Mock orders list
  const mockOrders = [
    {
      id: 'GD-82741',
      date: 'May 18, 2026',
      total: 527,
      status: 'Delivered',
      items: [
        { idx: 0, name: 'Classic Glazed', qty: 2, price: 149 },
        { idx: 2, name: 'Dark Chocolate', qty: 1, price: 199 },
      ],
      progress: 100, // percentage of timeline
      timeline: [
        { label: 'Ordered', time: '10:14 AM', done: true },
        { label: 'Baking', time: '10:25 AM', done: true },
        { label: 'Dispatched', time: '10:50 AM', done: true },
        { label: 'Delivered', time: '11:15 AM', done: true },
      ]
    },
    {
      id: 'GD-81992',
      date: 'May 12, 2026',
      total: 418,
      status: 'Preparing',
      items: [
        { idx: 1, name: 'Strawberry Dream', qty: 1, price: 179 },
        { idx: 6, name: 'Birthday Cake', qty: 1, price: 189 },
      ],
      progress: 33,
      timeline: [
        { label: 'Ordered', time: '10:30 AM', done: true },
        { label: 'Baking', time: '10:45 AM', done: true },
        { label: 'Dispatched', time: '', done: false },
        { label: 'Delivered', time: '', done: false },
      ]
    },
    {
      id: 'GD-79011',
      date: 'Apr 28, 2026',
      total: 617,
      status: 'Delivered',
      items: [
        { idx: 3, name: 'Caramel Crunch', qty: 2, price: 189 },
        { idx: 4, name: 'Vanilla Bean', qty: 1, price: 169 },
        { idx: 0, name: 'Classic Glazed', qty: 1, price: 149 },
      ],
      progress: 100,
      timeline: [
        { label: 'Ordered', time: '06:45 PM', done: true },
        { label: 'Baking', time: '07:05 PM', done: true },
        { label: 'Dispatched', time: '07:30 PM', done: true },
        { label: 'Delivered', time: '07:55 PM', done: true },
      ]
    }
  ];

  // Mock recommendations
  const recommendedItems = [
    menuItems[3], // Maple Bacon
    menuItems[5], // Salted Caramel
    menuItems[7], // Lemon Zest
  ];

  // Mock Achievements
  const achievements = [
    { name: 'Glaze Pioneer', desc: 'Ordered your first donut box', icon: '🍩', date: 'Apr 28' },
    { name: 'Midnight Indulgence', desc: 'Placed an order past 10 PM', icon: '🌙', date: 'May 05' },
    { name: 'Flavor Explorer', desc: 'Tried 5 different glaze flavors', icon: '🎨', date: 'May 12' },
  ];

  const handleReorder = (items) => {
    items.forEach(orderItem => {
      const fullItem = menuItems.find(m => m.name === orderItem.name);
      if (fullItem) {
        addToCart(fullItem);
      }
    });
    setCartOpen(true);
    showToast('🛒', 'Previous order added to cart!');
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      triggerLocalToast('Please fill out all fields', 'error', '⚠️');
      return;
    }

    // Add new card
    const cleanNumber = cardNumber.replace(/\s?/g, '');
    const formattedNumber = `•••• •••• •••• ${cleanNumber.slice(-4)}`;
    const brand = cardNumber.startsWith('4') ? 'Visa' : 'Mastercard';

    const newCard = {
      id: Date.now(),
      name: cardName,
      number: formattedNumber,
      expiry: cardExpiry,
      brand,
    };

    setSavedCards([...savedCards, newCard]);
    setAddCardModal(false);
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    triggerLocalToast('Payment card saved securely', 'success', '💳');
  };

  const handleDeleteCard = (id) => {
    setSavedCards(savedCards.filter(c => c.id !== id));
    triggerLocalToast('Card removed successfully', 'info', '🗑️');
  };

  if (loading) {
    return (
      <div className="auth-page-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--cream)', fontSize: '1.2rem', opacity: 0.7, letterSpacing: '0.1em' }}>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | Glazed &amp; Dazed</title>
      </Head>

      <Toast show={toast.show} msg={toast.msg} variant={toast.variant} icon={toast.icon} />

      <div className="dashboard-page-container">



        {/* SIDEBAR NAVIGATION (Desktop) */}
        <aside className="dashboard-sidebar">
          <div>
            <div className="sidebar-brand">
              <Link href="/" className="sidebar-logo">
                Donutz <span>✦</span>
              </Link>
            </div>

            <nav className="sidebar-nav">
              <button
                onClick={() => setActiveTab('overview')}
                className={`sidebar-link ${activeTab === 'overview' ? 'active' : ''}`}
              >
                <span>📊</span> Overview
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`sidebar-link ${activeTab === 'orders' ? 'active' : ''}`}
              >
                <span>📦</span> Previous Orders
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`sidebar-link ${activeTab === 'rewards' ? 'active' : ''}`}
              >
                <span>✨</span> Rewards &amp; Recs
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`sidebar-link ${activeTab === 'payments' ? 'active' : ''}`}
              >
                <span>💳</span> Saved Payments
              </button>
              <Link href="/menu" className="sidebar-link">
                <span>🍩</span> Order Fresh Donuts
              </Link>
            </nav>
          </div>

          <div className="sidebar-footer">
            <div className="sidebar-user">
              <div className="user-avatar">🧑‍🍳</div>
              <div className="user-info">
                <h4>{userName}</h4>
                <p>Member since 2026</p>
              </div>
            </div>
            <button onClick={handleLogout} className="sidebar-logout-btn">
              <span>⎋</span> Logout
            </button>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="dashboard-content-main">

          {/* Welcome / Hero Background Layer */}
          <div className="dashboard-welcome-layer">
            {/* HEADER ROW */}
            <header className="dashboard-content-header">
              <div>
                <h1>Welcome Back, {userName}!</h1>
                <p>Tuesday, May 19, 2026 &mdash; You're 220 points away from a free treat! 🍩</p>
              </div>

              {/* Quick Points Indicator */}
              <div className="header-points-summary">
                <div className="points-amount">780</div>
                <div className="points-label">Total Points</div>
              </div>
            </header>
          </div>

          {/* Foreground Wrapper for Cards */}
          <div className="dashboard-foreground-wrapper">
            {/* Tab switches for Mobile */}
            <div className="mobile-tab-switch">
              <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>Overview</button>
              <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>Orders</button>
              <button onClick={() => setActiveTab('rewards')} className={activeTab === 'rewards' ? 'active' : ''}>Rewards</button>
              <button onClick={() => setActiveTab('payments')} className={activeTab === 'payments' ? 'active' : ''}>Payments</button>
            </div>

            {/* VIEW 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="dashboard-overview-container fade-in-dashboard">

                {/* FULL WIDTH UPPER BLOCK: Loyalty Points & Membership Tier Progress */}
                <div className="dashboard-loyalty-showcase-row">
                  <Card variant="glass" className="premium-loyalty-gold-card" padding="lg">
                    <div className="loyalty-card-metallic-glow" />
                    <div className="loyalty-card-flex-body">
                      
                      <div className="loyalty-card-left">
                        <div className="loyalty-brand-top">
                          <span className="gold-sparkle">✦</span>
                          <span className="card-tier-label">PLATINUM VIP</span>
                        </div>
                        <div className="loyalty-points-display">
                          <h2>780</h2>
                          <p>Points Balance</p>
                        </div>
                        <div className="loyalty-card-footer-info">
                          <div>
                            <span className="cc-lbl">MEMBER NAME</span>
                            <span className="cc-val">{userName}</span>
                          </div>
                          <div>
                            <span className="cc-lbl">TIER STATUS</span>
                            <span className="cc-val">Glaze Enthusiast</span>
                          </div>
                        </div>
                      </div>

                      <div className="loyalty-card-right">
                        <h3>Membership Tier Progress</h3>
                        <p className="progress-hint">You are <strong>220 points</strong> away from <strong>Donut Master</strong> tier</p>
                        
                        <div className="tier-progress-milestones">
                          <div className="milestone-line">
                            <div className="milestone-fill" style={{ width: '78%' }} />
                          </div>
                          <div className="milestone-node completed">
                            <div className="milestone-dot">1</div>
                            <span className="milestone-label">Glaze Cadet</span>
                          </div>
                          <div className="milestone-node completed">
                            <div className="milestone-dot">2</div>
                            <span className="milestone-label">Caramel Captain</span>
                          </div>
                          <div className="milestone-node active">
                            <div className="milestone-dot">3</div>
                            <span className="milestone-label">Glaze Enthusiast</span>
                          </div>
                          <div className="milestone-node">
                            <div className="milestone-dot">4</div>
                            <span className="milestone-label">Donut Master</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Card>
                </div>

                {/* BOTTOM BLOCK GRID: Charts & Analytics */}
                <div className="dashboard-analytics-grid-row">
                  
                  {/* Left Chart: Monthly Dessert Activity & Spending Summary */}
                  <Card variant="default" className="fintech-chart-card">
                    <div className="card-header-flex">
                      <div>
                        <h3>Dessert Activity</h3>
                        <p className="card-subtitle">Monthly orders tracking & spend summary</p>
                      </div>
                      <Badge variant="info">Year 2026</Badge>
                    </div>

                    <div className="chart-and-stats-flex">
                      
                      <div className="activity-chart-wrap">
                        <svg viewBox="0 0 320 160" className="analytics-svg">
                          <line x1="30" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.04)" />
                          <line x1="30" y1="70" x2="300" y2="70" stroke="rgba(255,255,255,0.04)" />
                          <line x1="30" y1="120" x2="300" y2="120" stroke="rgba(255,255,255,0.04)" />

                          {[
                            { label: 'Jan', val: 60, h: 60, x: 50 },
                            { label: 'Feb', val: 90, h: 90, x: 100 },
                            { label: 'Mar', val: 50, h: 50, x: 150 },
                            { label: 'Apr', val: 120, h: 120, x: 200 },
                            { label: 'May', val: 140, h: 140, x: 250 },
                          ].map((bar, idx) => (
                            <g key={idx}>
                              <rect
                                x={bar.x}
                                y={130 - bar.h}
                                width="18"
                                height={bar.h}
                                rx="5"
                                fill="url(#fintechBarGrad)"
                                className="chart-bar-rect"
                              />
                              <text x={bar.x + 9} y="148" textAnchor="middle" fill="rgba(255,246,233,0.4)" fontSize="9">
                                {bar.label}
                              </text>
                            </g>
                          ))}
                          
                          <defs>
                            <linearGradient id="fintechBarGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--pink)" />
                              <stop offset="100%" stopColor="#C4763A" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      <div className="spending-summary-stats">
                        <div className="mini-stat-item">
                          <span className="lbl">Total Spent</span>
                          <span className="val">₹1,562</span>
                        </div>
                        <div className="mini-stat-item">
                          <span className="lbl">Avg Order</span>
                          <span className="val">₹520</span>
                        </div>
                        <div className="mini-stat-item">
                          <span className="lbl">Saved Delivery</span>
                          <span className="val">₹120</span>
                        </div>
                        <div className="mini-stat-item">
                          <span className="lbl">Loyalty Saved</span>
                          <span className="val">₹450</span>
                        </div>
                      </div>

                    </div>
                  </Card>

                  {/* Right Chart: Flavor Preference Donut Chart */}
                  <Card variant="default" className="fintech-chart-card">
                    <div className="card-header-flex">
                      <div>
                        <h3>Flavor Preference</h3>
                        <p className="card-subtitle">Analytics based on ordering metrics</p>
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>

                    <div className="chart-and-stats-flex flex-reverse">
                      
                      <div className="preference-chart-wrap">
                        <svg viewBox="0 0 160 160" className="donut-chart-svg">
                          {/* Segment 1: Glazed (45%) */}
                          <circle cx="80" cy="80" r="55" fill="transparent" stroke="var(--pink)" strokeWidth="14" strokeDasharray="345.5" strokeDashoffset="0" />
                          {/* Segment 2: Chocolate (30%) */}
                          <circle cx="80" cy="80" r="55" fill="transparent" stroke="#C4763A" strokeWidth="14" strokeDasharray="345.5" strokeDashoffset="-155.5" />
                          {/* Segment 3: Strawberry (15%) */}
                          <circle cx="80" cy="80" r="55" fill="transparent" stroke="#FF9494" strokeWidth="14" strokeDasharray="345.5" strokeDashoffset="-259.1" />
                          {/* Segment 4: Caramel (10%) */}
                          <circle cx="80" cy="80" r="55" fill="transparent" stroke="#E2C799" strokeWidth="14" strokeDasharray="345.5" strokeDashoffset="-311.0" />
                          
                          <circle cx="80" cy="80" r="46" fill="#150a06" />
                          <text x="80" y="76" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">Top Flavor</text>
                          <text x="80" y="92" textAnchor="middle" fill="var(--pink)" fontSize="9" fontWeight="700">Glazed</text>
                        </svg>
                      </div>

                      <div className="flavor-legend-list">
                        <div className="legend-item">
                          <span className="dot glaze" />
                          <span className="name">Glazed</span>
                          <span className="pct">45%</span>
                        </div>
                        <div className="legend-item">
                          <span className="dot chocolate" />
                          <span className="name">Chocolate</span>
                          <span className="pct">30%</span>
                        </div>
                        <div className="legend-item">
                          <span className="dot strawberry" />
                          <span className="name">Strawberry</span>
                          <span className="pct">15%</span>
                        </div>
                        <div className="legend-item">
                          <span className="dot caramel" />
                          <span className="name">Caramel</span>
                          <span className="pct">10%</span>
                        </div>
                      </div>

                    </div>
                  </Card>

                </div>

                {/* FULL WIDTH BOTTOM BLOCK: Favorite Desserts */}
                <div className="dashboard-favorite-desserts-row">
                  <Card variant="chocolate" className="favorite-desserts-card" padding="lg">
                    <div className="fav-header">
                      <h3>Favorite Desserts</h3>
                      <p>Your most frequently ordered sweet treats</p>
                    </div>

                    <div className="fav-items-grid">
                      
                      <div className="fav-item-box">
                        <div className="fav-item-desc">
                          <span className="fav-emoji">🍩</span>
                          <div>
                            <h4>Classic Glazed</h4>
                            <p>Ordered 12 times</p>
                          </div>
                        </div>
                        <div className="fav-progress-wrap">
                          <div className="fav-progress-bar" style={{ width: '45%' }} />
                          <span className="fav-pct">45%</span>
                        </div>
                      </div>

                      <div className="fav-item-box">
                        <div className="fav-item-desc">
                          <span className="fav-emoji">🍫</span>
                          <div>
                            <h4>Dark Chocolate</h4>
                            <p>Ordered 8 times</p>
                          </div>
                        </div>
                        <div className="fav-progress-wrap">
                          <div className="fav-progress-bar" style={{ width: '30%' }} />
                          <span className="fav-pct">30%</span>
                        </div>
                      </div>

                      <div className="fav-item-box">
                        <div className="fav-item-desc">
                          <span className="fav-emoji">🍓</span>
                          <div>
                            <h4>Strawberry Dream</h4>
                            <p>Ordered 4 times</p>
                          </div>
                        </div>
                        <div className="fav-progress-wrap">
                          <div className="fav-progress-bar" style={{ width: '15%' }} />
                          <span className="fav-pct">15%</span>
                        </div>
                      </div>

                    </div>
                  </Card>
                </div>

              </div>
            )}

            {/* VIEW 2: REWARDS & RECOMMENDATIONS */}
            {activeTab === 'rewards' && (
              <div className="dashboard-rewards-layout fade-in-dashboard">
                
                {/* Achievements List */}
                <div className="rewards-section-wrapper">
                  <div className="section-title-header">
                    <h2>Sweet Achievements</h2>
                    <p>Unlock badges and earn multipliers by ordering your favorite treats 🌟</p>
                  </div>
                  
                  <div className="rewards-achievements-grid">
                    {achievements.map((ach) => (
                      <Card key={ach.name} variant="default" className="fintech-achievement-card">
                        <div className="achievement-icon-bubble">{ach.icon}</div>
                        <div className="achievement-details">
                          <h4>{ach.name}</h4>
                          <p>{ach.desc}</p>
                          <div className="achievement-badge-footer">
                            <Badge variant="secondary" size="sm">Unlocked {ach.date}</Badge>
                            <span className="multiplier-tag">+50 XP</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Personalized Taste Recommendations */}
                <div className="rewards-section-wrapper" style={{ marginTop: '2.5rem' }}>
                  <div className="section-title-header">
                    <h2>Personalized Taste Recommendations</h2>
                    <p>Hand-crafted donut creations matching your favorite flavor profile (Glazed &amp; Sweet) 🎨</p>
                  </div>

                  <div className="rewards-recos-grid">
                    {recommendedItems.map((item) => (
                      <Card key={item.name} variant="glass" className="premium-reco-card">
                        <div className="reco-badge-points">1.5x Points</div>
                        <div className="reco-donut-visual">
                          <span className="reco-donut-emoji">🍩</span>
                        </div>
                        <div className="reco-content-body">
                          <h4>{item.name}</h4>
                          <p className="reco-desc">A gorgeous, hand-baked treat loaded with premium toppings.</p>
                          <div className="reco-footer-row">
                            <span className="price-tag">₹{item.price}</span>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                addToCart(item);
                                showToast('🛒', `${item.name} added to cart!`);
                              }}
                            >
                              Add To Cart
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 3: PREVIOUS ORDERS HISTORY */}
            {activeTab === 'orders' && (
              <div className="dashboard-orders-history fade-in-dashboard">

                <div className="orders-header-row">
                  <div className="orders-header-text">
                    <h2>Previous <span className="text-pink">Orders</span></h2>
                    <p>Track your orders and sweet memories 💖</p>
                  </div>
                </div>

                <div className="orders-list-wrapper">
                  {mockOrders.map((order) => {
                    const isExpanded = expandedOrder === order.id;

                    return (
                      <Card key={order.id} variant="default" className={`order-history-card ${isExpanded ? 'expanded' : ''}`}>

                        {/* Summary Row */}
                        <div className="order-summary-row" onClick={() => setExpandedOrder(isExpanded ? null : order.id)}>
                          <div className="summary-left">
                            <span className="order-box-icon">📦</span>
                            <div>
                              <h3>Order #{order.id}</h3>
                              <p className="order-date">{order.date}</p>
                            </div>
                          </div>

                          <div className="summary-right">
                            <span className="order-total-sum">₹{order.total}</span>
                            <Badge variant={order.status === 'Delivered' ? 'success' : 'warning'}>
                              {order.status}
                            </Badge>
                            <span className="expand-chevron">{isExpanded ? '▲' : '▼'}</span>
                          </div>
                        </div>

                        {/* Expandable Timelines & Details */}
                        {isExpanded && (
                          <div className="order-expanded-details">
                            <hr className="details-divider" />

                            {/* Live Timeline Tracker */}
                            <div className="timeline-tracker-wrap">
                              <h4>Delivery Timeline</h4>
                              <div className="timeline-horizontal">
                                {order.timeline.map((step, idx) => (
                                  <div key={idx} className={`timeline-node ${step.done ? 'completed' : ''}`}>
                                    <div className="node-circle">
                                      {step.done ? '✓' : idx + 1}
                                    </div>
                                    <span className="node-label">{step.label}</span>
                                    <span className="node-time">{step.time}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Track bar progress */}
                              <div className="timeline-progress-track">
                                <div className="timeline-progress-fill" style={{ width: `${order.progress}%` }} />
                              </div>
                            </div>

                            <hr className="details-divider" />

                            {/* Items Breakdown list */}
                            <div className="items-breakdown-wrap">
                              <h4>Items Breakdown</h4>
                              <div className="breakdown-list">
                                {order.items.map((item) => (
                                  <div key={item.name} className="breakdown-item">
                                    <span className="bi-name">{item.name} <span className="bi-qty">x{item.qty}</span></span>
                                    <span className="bi-price">₹{item.price * item.qty}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Interactive Order Actions */}
                            <div className="order-actions-footer">
                              <Button variant="outline" size="sm" onClick={() => setInvoiceOrder(order)}>
                                View Invoice
                              </Button>
                              <Button variant="primary" size="sm" onClick={() => handleReorder(order.items)}>
                                🔄 Reorder All Items
                              </Button>
                            </div>

                          </div>
                        )}

                      </Card>
                    );
                  })}
                </div>

              </div>
            )}

            {/* VIEW 3: SAVED PAYMENT METHODS */}
            {activeTab === 'payments' && (
              <div className="dashboard-payments-section fade-in-dashboard">

                <div className="payments-header-row">
                  <div>
                    <h2>Saved Payment Methods</h2>
                    <p>Your payment details are encrypted and stored using bank-level tokens</p>
                  </div>
                  <Button variant="outline" onClick={() => setAddCardModal(true)}>
                    + Add New Card
                  </Button>
                </div>

                {/* Cards Grid list */}
                <div className="payments-cards-grid">
                  {savedCards.map((card) => (
                    <Card key={card.id} variant="chocolate" className="premium-credit-card">
                      <div className="credit-card-glow" />

                      <div className="credit-card-top">
                        <span className="credit-card-chip">📟</span>
                        <span className="credit-card-brand">{card.brand}</span>
                      </div>

                      <div className="credit-card-number">
                        {card.number}
                      </div>

                      <div className="credit-card-bottom">
                        <div>
                          <span className="cc-lbl">Card Holder</span>
                          <span className="cc-val">{card.name}</span>
                        </div>
                        <div>
                          <span className="cc-lbl">Expires</span>
                          <span className="cc-val">{card.expiry}</span>
                        </div>
                        <button
                          type="button"
                          className="cc-delete-btn"
                          onClick={() => handleDeleteCard(card.id)}
                          aria-label="Remove card"
                        >
                          🗑️
                        </button>
                      </div>

                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

        </main>

        {/* INVOICE PREVIEW MODAL */}
        <Modal
          isOpen={!!invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
          title={`Invoice for Order #${invoiceOrder?.id}`}
          size="md"
        >
          {invoiceOrder && (
            <div className="invoice-modal-content">
              <div className="invoice-header">
                <div>
                  <h3>Glazed &amp; Dazed Donuts</h3>
                  <p>12, Park Street, New Delhi, India</p>
                </div>
                <div className="invoice-meta">
                  <p>Date: {invoiceOrder.date}</p>
                  <p>Invoice ID: INV-2026-{invoiceOrder.id.split('-')[1]}</p>
                </div>
              </div>

              <hr />

              <div className="invoice-items-table">
                <div className="table-header-row">
                  <span>Item</span>
                  <span className="text-center">Qty</span>
                  <span className="text-right">Price</span>
                </div>
                {invoiceOrder.items.map((item) => (
                  <div key={item.name} className="table-item-row">
                    <span>{item.name}</span>
                    <span className="text-center">{item.qty}</span>
                    <span className="text-right">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="invoice-totals-row">
                <div className="totals-left">
                  <p>Payment Method: **Saved Card**</p>
                  <p className="status-indicator">Status: <strong>Paid</strong></p>
                </div>
                <div className="totals-right">
                  <div className="row">
                    <span>Subtotal:</span>
                    <span>₹{invoiceOrder.total - 40}</span>
                  </div>
                  <div className="row">
                    <span>Delivery:</span>
                    <span>₹40</span>
                  </div>
                  <div className="row grand-total">
                    <span>Grand Total:</span>
                    <span>₹{invoiceOrder.total}</span>
                  </div>
                </div>
              </div>

              <div className="invoice-modal-actions">
                <Button variant="outline" onClick={() => triggerLocalToast('Invoice PDF downloading...', 'info', '📄')}>
                  📥 Download PDF
                </Button>
                <Button variant="primary" onClick={() => setInvoiceOrder(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* ADD PAYMENT CARD MODAL */}
        <Modal
          isOpen={addCardModal}
          onClose={() => setAddCardModal(false)}
          title="Save New Credit Card"
          size="sm"
        >
          <form onSubmit={handleAddCardSubmit} className="add-card-form">
            <Input
              label="Cardholder Name"
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="e.g. Alex Johnson"
              required
            />
            <Input
              label="Card Number"
              type="text"
              maxLength="16"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="16-digit card number"
              required
            />
            <div className="add-card-split">
              <Input
                label="Expiry Date"
                type="text"
                maxLength="5"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                placeholder="MM/YY"
                required
              />
              <Input
                label="CVV"
                type="password"
                maxLength="3"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                placeholder="123"
                required
              />
            </div>

            <div className="add-card-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem' }}>
              <Button variant="outline" onClick={() => setAddCardModal(false)} style={{ flex: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" style={{ flex: 1 }}>
                Save Card
              </Button>
            </div>
          </form>
        </Modal>

      </div>
    </>
  );
}
