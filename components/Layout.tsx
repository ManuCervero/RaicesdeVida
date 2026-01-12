import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, Instagram, Mail, Phone, MapPin, User, Settings, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CONFIG } from '../constants';
import AuthModal from './AuthModal';

// Update Header to accept onOpenAuth prop
const Header = ({ onOpenAuth }: { onOpenAuth: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-900/95 backdrop-blur-sm border-b border-brand-800 shadow-sm text-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-serif text-2xl font-bold tracking-wider text-white hover:text-brand-100 transition-colors">
              RAÍCES<span className="text-brand-300 mx-2 text-xl italic font-light lowercase">de</span>VIDA
            </Link>
          </div>

          {/* Desktop Nav - Consolidated Links */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`text-sm uppercase tracking-widest hover:text-brand-200 transition-colors ${isActive('/') ? 'text-white font-bold border-b-2 border-brand-300' : 'text-brand-100'}`}>
              Inicio
            </Link>
            <Link to="/productos" className={`text-sm uppercase tracking-widest hover:text-brand-200 transition-colors ${isActive('/productos') ? 'text-white font-bold border-b-2 border-brand-300' : 'text-brand-100'}`}>
              Productos
            </Link>
            <Link to="/contacto" className={`text-sm uppercase tracking-widest hover:text-brand-200 transition-colors ${isActive('/contacto') ? 'text-white font-bold border-b-2 border-brand-300' : 'text-brand-100'}`}>
              Contacto
            </Link>
            {/* Admin Link - Temporary public access as requested */}
            <Link to="/admin" className={`flex items-center gap-2 px-3 py-1 rounded border transition-all ${isActive('/admin') ? 'bg-brand-800 border-brand-300 text-white' : 'border-brand-700 text-brand-300 hover:text-white hover:border-brand-500'}`}>
              <Settings size={14} />
              <span className="text-sm font-bold uppercase tracking-wider">Gestión</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search (Placeholder for modal) */}
            <button className="text-brand-100 hover:text-white p-2">
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Login / User Status */}
            {user ? (
               <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs text-brand-200 hidden lg:block">Hola, {user.email?.split('@')[0]}</span>
                  <button onClick={handleSignOut} className="text-brand-100 hover:text-red-300 p-2" title="Cerrar Sesión">
                    <LogOut size={20} strokeWidth={1.5} />
                  </button>
               </div>
            ) : (
              <button onClick={onOpenAuth} className="text-brand-100 hover:text-white p-2 hidden sm:block" title="Iniciar Sesión">
                <User size={20} strokeWidth={1.5} />
              </button>
            )}
            
            <Link to="/carrito" className="text-brand-100 hover:text-white p-2 relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-brand-900 transform translate-x-1/4 -translate-y-1/4 bg-brand-100 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-brand-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-900 border-t border-brand-800 absolute w-full h-screen z-50">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <Link to="/" onClick={closeMenu} className="block px-3 py-4 text-base font-medium text-white border-b border-brand-800">Inicio</Link>
            <Link to="/productos" onClick={closeMenu} className="block px-3 py-4 text-base font-medium text-white border-b border-brand-800">Productos</Link>
            <Link to="/contacto" onClick={closeMenu} className="block px-3 py-4 text-base font-medium text-white border-b border-brand-800">Contacto</Link>
            <Link to="/admin" onClick={closeMenu} className="block px-3 py-4 text-base font-bold text-brand-300 border-b border-brand-800 bg-brand-800/50 mt-2">Panel de Gestión</Link>
            
            {/* Mobile Login Button */}
            {user ? (
               <button 
                onClick={() => { handleSignOut(); closeMenu(); }} 
                className="w-full text-left px-3 py-4 text-base font-medium text-red-300 border-b border-brand-800 flex items-center gap-2"
              >
                <LogOut size={18} /> Cerrar Sesión ({user.email?.split('@')[0]})
              </button>
            ) : (
              <button 
                onClick={() => { onOpenAuth(); closeMenu(); }} 
                className="w-full text-left px-3 py-4 text-base font-medium text-brand-500 border-b border-brand-800 flex items-center gap-2"
              >
                <User size={18} /> Iniciar Sesión / Cuenta
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-900 text-brand-100 pt-16 pb-8 border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-wider text-white">
              RAÍCES<span className="text-brand-300 mx-2 text-xl italic font-light lowercase">de</span>VIDA
            </h3>
            <p className="text-brand-200 text-sm leading-relaxed">
              Creamos experiencias sensoriales para tu hogar. Velas de soja y fragancias hechas a mano en Argentina con ingredientes naturales.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={CONFIG.instagramUrl} target="_blank" rel="noreferrer" className="text-brand-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href={`https://wa.me/${CONFIG.whatsappNumber}`} target="_blank" rel="noreferrer" className="text-brand-200 hover:text-white transition-colors">
                <Phone size={20} />
              </a>
              <a href={`mailto:${CONFIG.contactEmail}`} className="text-brand-200 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Tienda</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/productos" className="hover:text-white transition-colors">Productos</Link></li>
              <li><Link to="/productos?category=velas" className="hover:text-white transition-colors">Velas de Soja</Link></li>
              <li><Link to="/productos?category=aromatizadores" className="hover:text-white transition-colors">Aromatizadores</Link></li>
              <li><Link to="/productos?category=combos" className="hover:text-white transition-colors">Combos</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Ayuda</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/faq" className="hover:text-white transition-colors">Envíos y Pagos</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Cuidado de las Velas</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Encuéntranos</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mt-1 mr-2 flex-shrink-0" />
                <span>{CONFIG.location}<br/>Godoy Cruz</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <span>{CONFIG.contactPhone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-800 mt-16 pt-8 text-center text-xs text-brand-400">
          <p>&copy; {new Date().getFullYear()} Raíces de Vida. Hecho a mano en Argentina. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans text-brand-900 bg-brand-50">
      <Header onOpenAuth={() => setIsAuthOpen(true)} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};