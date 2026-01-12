import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AppShell } from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

// Simple placeholder components for routes not fully implemented in this demo
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-serif text-brand-900 mb-4">{title}</h1>
      <p className="text-brand-500">Esta sección está en construcción.</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/productos" element={<Shop />} />
              <Route path="/coleccion/:slug" element={<Shop />} />
              <Route path="/producto/:slug" element={<ProductDetail />} />
              
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              
              <Route path="/contacto" element={<Contact />} />
              <Route path="/sobre-nosotros" element={<PlaceholderPage title="Sobre Nosotros" />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Admin would usually be protected by a PrivateRoute component checking Supabase Auth */}
              <Route path="/admin" element={<Admin />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppShell>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;