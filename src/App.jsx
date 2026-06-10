import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { BeautyProfileProvider } from './context/BeautyProfileContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import WishlistPicker from './components/common/WishlistPicker';
import AuthModal from './components/common/AuthModal';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import JournalPage from './pages/JournalPage';
import BrandPage from './pages/BrandPage';
import StorePage from './pages/StorePage';
import GiftCardsPage from './pages/GiftCardsPage';
import OurStoryPage from './pages/OurStoryPage';
import LoyaltyPage from './pages/LoyaltyPage';
import './index.css';

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />
      <CartDrawer />
      <WishlistPicker />
      <AuthModal />
      <main id="main-content" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ProductListPage />} />
          <Route path="/shop/:category" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/:section" element={<AccountPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/:slug" element={<JournalPage />} />
          <Route path="/brand/:slug" element={<BrandPage />} />
          <Route path="/brands" element={<BrandPage />} />
          <Route path="/stores" element={<StorePage />} />
          <Route path="/gift-cards" element={<GiftCardsPage />} />
          <Route path="/about" element={<OurStoryPage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <BeautyProfileProvider>
              <AppLayout />
            </BeautyProfileProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
