import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { TrackOrderView } from './views/TrackOrderView';
import { AccountView } from './views/AccountView';
import { AdminView } from './views/AdminView';
import { CartDrawer } from './components/CartDrawer';
import { AiAdvisorDrawer } from './components/AiAdvisorDrawer';
import { AuthModal } from './components/AuthModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { currentView, dir } = useStore();

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 ${dir}`} dir={dir}>
      {/* Header Bar */}
      <Header />

      {/* Dynamic View Container */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'products' && <ProductsView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'track' && <TrackOrderView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Drawers & Modals Overlays */}
      <CartDrawer />
      <AiAdvisorDrawer />
      <AuthModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
