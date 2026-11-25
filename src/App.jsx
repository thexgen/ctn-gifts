import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/layout/AnnouncementBar.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import CartDrawer from './components/layout/CartDrawer.jsx';
import DeliveryPopup from './components/layout/DeliveryPopup.jsx';
import FloatingButtons from './components/layout/FloatingButtons.jsx';
import AgeConfirmationModal from './components/layout/AgeConfirmationModal.jsx';

import CategoryTiles from './components/home/CategoryTiles.jsx';
import HeroSlider from './components/home/HeroSlider.jsx';
import CuratedGifts from './components/home/CuratedGifts.jsx';
import TreasuredConnections from './components/home/TreasuredConnections.jsx';
import BestSellers from './components/home/BestSellers.jsx';
import SignaturePicks from './components/home/SignaturePicks.jsx';
import LimitedEdition from './components/home/LimitedEdition.jsx';
import WallOfFame from './components/home/WallOfFame.jsx';
import WeddingBanner from './components/home/WeddingBanner.jsx';
import BulkBanner from './components/home/BulkBanner.jsx';
import Testimonials from './components/home/Testimonials.jsx';
import SeoContent from './components/home/SeoContent.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductPage from './pages/ProductPage.jsx';

/** Smoothly reset scroll when navigating between routes. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

function HomePage() {
  return (
    <>
      <CategoryTiles />
      <HeroSlider />
      <CuratedGifts />
      <TreasuredConnections />
      <BestSellers />
      <SignaturePicks />
      <LimitedEdition />
      <WallOfFame />
      <WeddingBanner />
      <BulkBanner />
      <Testimonials />
      <SeoContent />
    </>
  );
}

function NotFound() {
  return (
    <div className="section-shell py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-sm text-ink/60">Let’s get you back to the good stuff.</p>
      <Link to="/" className="btn-primary mt-7">Back to the homepage</Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-night focus:px-5 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>

      <AnnouncementBar />
      <Header />
      <ScrollToTop />

      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories/:slug" element={<CategoryPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Global overlays */}
      <CartDrawer />
      <DeliveryPopup />
      <AgeConfirmationModal />
      <FloatingButtons />
    </>
  );
}
