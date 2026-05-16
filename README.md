Author: Adwitaa Singh

#  Glazed & Dazed – Interactive Dessert Storefront

Modern animated dessert storefront built with **Next.js** and **React**, featuring immersive UI interactions, smooth motion design, dynamic cart management, and premium frontend architecture.

An interactive frontend experience crafted for the fictional dessert brand **Glazed & Dazed**, focused on combining cinematic visuals with scalable modern web development practices.

---

## Live Experience

A polished and immersive dessert shopping experience featuring:

- Animated hero sections
- Smooth scroll reveal effects
- Dynamic product showcases
- Interactive shopping cart system
- Modern responsive layouts
- Component-driven architecture
- Premium motion-based UI
- Seamless page transitions

---

## Built With

- Next.js
- React.js
- JavaScript
- Context API
- CSS3
- Custom Animations
- Responsive Design
- Modern UI/UX Principles

---

### Key Features

### Immersive Hero Experience
- Animated floating dessert visuals
- Interactive CTA sections
- Smooth entrance animations
- Cinematic landing presentation

### Smart Cart Architecture
- Global cart state management using Context API
- Dynamic quantity updates
- Live cart calculations
- Slide-in cart interactions
- Smooth add-to-cart feedback

### Modern UI System
- Reusable React components
- Scroll-triggered animations
- Glassmorphism inspired elements
- Luxury dessert branding aesthetics
- Interactive hover transitions

### Performance & Scalability
- Component-based scalable structure
- Optimized routing with Next.js
- Clean folder organization
- Responsive across devices
- Lightweight frontend interactions

---

## Project Highlights

- Modular frontend architecture
- Interactive motion-driven user experience
- Modern React development practices
- Real-world scalable project structure
- Focus on premium digital brand storytelling

---

## Future Improvements

- Backend integration
- Authentication system
- Payment gateway integration
- Product CMS dashboard
- Dark mode support
- Wishlist functionality

---

## Preview

<img width="1888" height="873" alt="image" src="https://github.com/user-attachments/assets/1d201484-ac8c-42f8-9ad6-9ee686243f4a" />
<img width="1892" height="879" alt="image" src="https://github.com/user-attachments/assets/ecedfa07-92ba-4c2a-b573-4ff35900d6dd" />




## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Marquee strip, CTA teaser |
| `/menu` | Menu — Full donut grid with 3D tilt & add-to-cart |
| `/story` | Our Story — The rotating plate section + brand story |
| `/reviews` | Reviews — Extended testimonials grid |
| `/order` | Order — CTA + delivery info |

## Setup

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm start         # serve production build
```

## What was preserved exactly
- All CSS variables, animations, keyframes
- Custom cursor (with cursor-ring lag effect)
- Tunnel loader (shown once per session via sessionStorage)
- Marquee strip
- 3D card tilt on menu cards
- Envelope animation + donut fly on Add to Cart
- Cart drawer with quantity controls
- Toast notifications
- Floating sprinkles
- Responsive / mobile styles
- All images (renamed to shorter keys)

## Structure

```
glazed-dazed-next/
├── pages/
│   ├── _app.jsx        ← Global layout, Cart, Loader, Cursor
│   ├── index.jsx       ← Home
│   ├── menu.jsx        ← Menu
│   ├── story.jsx       ← Our Story
│   ├── reviews.jsx     ← Reviews
│   └── order.jsx       ← Order
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Loader.jsx
│   ├── Cart.jsx        ← Drawer + envelope animation
│   ├── MenuCard.jsx    ← 3D tilt + add-to-cart
│   ├── Marquee.jsx
│   ├── Sprinkles.jsx
│   ├── Toast.jsx
│   └── CustomCursor.jsx
├── context/
│   └── CartContext.jsx ← Global cart state
├── data/
│   └── menuItems.js    ← Shared menu data
├── hooks/
│   └── useScrollReveal.js
├── styles/
│   └── globals.css     ← All original styles, preserved 1:1
└── public/
    └── images/         ← All 9 original donut images
```
