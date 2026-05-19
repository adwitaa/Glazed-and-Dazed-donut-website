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
  const [activeTab, setActiveTab] = useState('overview'); // overview, orders, payments
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
        { label: 'Ordered', time: '02:30 PM', done: true },
        { label: 'Baking', time: '02:45 PM', done: true },
        { label: 'Dispatched', time: '--', done: false },
        { label: 'Delivered', time: '--', done: false },
      ]
    },
    {
      id: 'GD-79011',
      date: 'Apr 28, 2026',
      total: 617,
      status: 'Delivered',
      items: [
        { idx: 3, name: 'Maple Bacon', qty: 2, price: 229 },
        { idx: 7, name: 'Lemon Zest', qty: 1, price: 179 },
      ],
      progress: 100,
      timeline: [
        { label: 'Ordered', time: '11:00 AM', done: true },
        { label: 'Baking', time: '11:20 AM', done: true },
        { label: 'Dispatched', time: '11:45 AM', done: true },
        { label: 'Delivered', time: '12:15 PM', done: true },
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
      <div className="dashboard-loading-screen">
        <div className="dashboard-spinner" />
        <p>Loading your loyalty dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard &mdash; Glazed &amp; Dazed</title>
      </Head>

      <Toast show={toast.show} msg={toast.msg} variant={toast.variant} icon={toast.icon} />

      <div className="dashboard-page-container">
        
        {/* SIDEBAR NAVIGATION (Desktop) */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <Link href="/" className="sidebar-logo">
              Glazed <span>&amp;</span> Dazed
            </Link>
            <Badge variant="platinum" className="sidebar-badge">Platinum Tier ✦</Badge>
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
              onClick={() => setActiveTab('payments')}
              className={`sidebar-link ${activeTab === 'payments' ? 'active' : ''}`}
            >
              <span>💳</span> Saved Payments
            </button>
            <Link href="/menu" className="sidebar-link">
              <span>🍩</span> Order Fresh Donuts
            </Link>
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-user">
              <div className="user-avatar">🧑‍🍳</div>
              <div className="user-info">
                <h4>{userName}</h4>
                <p>Member since 2026</p>
              </div>
            </div>
            <button onClick={handleLogout} className="sidebar-logout-btn">
              Logout <span>→</span>
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
                <p>Here is your sweet dashboard summary for today.</p>
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
            <button onClick={() => setActiveTab('payments')} className={activeTab === 'payments' ? 'active' : ''}>Payments</button>
          </div>

          {/* VIEW 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="dashboard-grid-layout fade-in-dashboard">
              
              {/* LEFT COLUMN: Analytics & Cards */}
              <div className="dashboard-col-left">
                
                {/* 1. Loyalty Points Card */}
                <Card variant="glass" className="loyalty-card" padding="lg">
                  <div className="loyalty-card-bg-glow" />
                  <div className="loyalty-header">
                    <div>
                      <Badge variant="gold">Level 3</Badge>
                      <h2>Glaze Enthusiast</h2>
                    </div>
                    <span className="loyalty-sparkle">✦</span>
                  </div>
                  
                  <div className="loyalty-points-progress">
                    <div className="progress-numbers">
                      <span><strong>780</strong> points</span>
                      <span>1,000 to next level</span>
                    </div>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar-fill" style={{ width: '78%' }} />
                    </div>
                  </div>

                  <div className="loyalty-stats-grid">
                    <div className="stat-box">
                      <span className="stat-label">Saved on Delivery</span>
                      <span className="stat-value">₹450</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-label">Free Donut Claims</span>
                      <span className="stat-value">3</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-label">Referral Multiplier</span>
                      <span className="stat-value">1.5x</span>
                    </div>
                  </div>
                </Card>

                {/* 2. Spendings & Activity Analytics */}
                <Card variant="default" className="analytics-card">
                  <div className="analytics-header">
                    <h3>Treat Activity</h3>
                    <Badge variant="info">Monthly Overview</Badge>
                  </div>
                  
                  {/* Custom SVG Bar Graph */}
                  <div className="analytics-chart-container">
                    <svg viewBox="0 0 400 160" className="analytics-svg">
                      {/* Grid Lines */}
                      <line x1="40" y1="20" x2="380" y2="20" stroke="rgba(255,255,255,0.06)" />
                      <line x1="40" y1="70" x2="380" y2="70" stroke="rgba(255,255,255,0.06)" />
                      <line x1="40" y1="120" x2="380" y2="120" stroke="rgba(255,255,255,0.06)" />
                      
                      {/* Bars */}
                      {[
                        { label: 'Jan', val: 60, h: 60, x: 70 },
                        { label: 'Feb', val: 90, h: 90, x: 120 },
                        { label: 'Mar', val: 50, h: 50, x: 170 },
                        { label: 'Apr', val: 120, h: 120, x: 220 },
                        { label: 'May', val: 140, h: 140, x: 270 },
                      ].map((bar, i) => (
                        <g key={i}>
                          <rect
                            x={bar.x}
                            y={140 - bar.h}
                            width="24"
                            height={bar.h}
                            rx="4"
                            fill="url(#barGrad)"
                            className="chart-bar"
                          />
                          <text x={bar.x + 12} y="155" textAnchor="middle" fill="rgba(255,246,233,0.4)" fontSize="10">
                            {bar.label}
                          </text>
                        </g>
                      ))}
                      
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF6B9D" />
                          <stop offset="100%" stopColor="#C4763A" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  <div className="analytics-summary-row">
                    <p>Total Donuts Ordered: <strong>24</strong></p>
                    <p>Most Popular Day: <strong>Friday</strong></p>
                  </div>
                </Card>

              </div>

              {/* RIGHT COLUMN: Achievements & Recommendations */}
              <div className="dashboard-col-right">
                
                {/* 1. Rewards & Achievements */}
                <Card variant="default" className="rewards-card">
                  <h3>Achievements Completed</h3>
                  
                  <div className="achievements-list">
                    {achievements.map((ach) => (
                      <div key={ach.name} className="achievement-item">
                        <div className="ach-icon">{ach.icon}</div>
                        <div className="ach-info">
                          <h4>{ach.name}</h4>
                          <p>{ach.desc}</p>
                        </div>
                        <Badge variant="secondary" size="sm">{ach.date}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* 2. Personalized Recommendations */}
                <Card variant="chocolate" className="recommendations-card">
                  <div className="reco-header">
                    <h3>Tailored For Your Taste</h3>
                    <Badge variant="gold">1.5x Points</Badge>
                  </div>
                  <p>Based on your love for classic glazes, we recommend these flavor profiles:</p>

                  <div className="reco-items-grid">
                    {recommendedItems.map((item) => (
                      <div key={item.name} className="reco-item-box">
                        <div className="reco-item-header">
                          <span className="reco-emoji">🍩</span>
                          <div>
                            <h4>{item.name}</h4>
                            <p className="reco-price">₹{item.price}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            addToCart(item);
                            showToast('🛒', `${item.name} added to cart!`);
                          }}
                        >
                          Add +
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

              </div>

            </div>
          )}

          {/* VIEW 2: PREVIOUS ORDERS HISTORY */}
          {activeTab === 'orders' && (
            <div className="dashboard-orders-history fade-in-dashboard">
              
              <div className="orders-header-row">
                <h2>Your Order Journey</h2>
                <Badge variant="info">{mockOrders.length} Orders</Badge>
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
