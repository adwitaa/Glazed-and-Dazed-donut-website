import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import Loader from '../components/Loader';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Toast from '../components/Toast';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Head>
        <title>Glazed &amp; Dazed — Artisan Donuts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Loader />
      <CustomCursor />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <Cart />
      <Toast />
    </CartProvider>
  );
}
