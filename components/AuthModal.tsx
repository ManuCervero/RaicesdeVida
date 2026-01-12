import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from './UI';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Cuenta creada. Revisa tu email para confirmar (si está habilitado) o inicia sesión.');
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      let msg = err.message || 'Ocurrió un error';
      
      // Traducción de errores comunes de Supabase
      if (msg.includes('Invalid login credentials')) msg = 'Email o contraseña incorrectos.';
      if (msg.includes('Email not confirmed')) msg = 'Tu email no está confirmado. Por favor revisa tu bandeja de entrada.';
      if (msg.includes('User already registered')) msg = 'Ya existe una cuenta con este email.';
      if (msg.includes('Password should be at least')) msg = 'La contraseña debe tener al menos 6 caracteres.';
      
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-brand-50 rounded-sm shadow-2xl overflow-hidden flex min-h-[550px] animate-fade-in-up">
        
        {/* Close Button (Mobile & Desktop) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full text-brand-900 hover:bg-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image (Hidden on Mobile) */}
        <div className="hidden md:block w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1608223652617-6804566f1225?auto=format&fit=crop&q=80&w=800" 
            alt="Velas Artesanales" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-900/20 mix-blend-multiply"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="font-serif text-3xl mb-2">Raíces de Vida</h3>
            <p className="text-brand-100 text-sm tracking-wide">
              {isLogin ? "Bienvenido de nuevo a tu refugio de aromas." : "Únete a nuestra comunidad y descubre la magia de lo natural."}
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          
          <div className="max-w-xs mx-auto w-full">
            <h2 className="font-serif text-3xl text-brand-900 mb-2 text-center">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
            <p className="text-brand-500 text-xs text-center mb-8 uppercase tracking-widest">
              {isLogin ? 'Ingresá tus datos para continuar' : 'Comenzá tu viaje sensorial'}
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-xs flex items-center gap-2 font-medium">
                <AlertCircle size={14} className="flex-shrink-0" /> {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative group">
                <Mail className="absolute left-3 top-3.5 text-brand-400 group-focus-within:text-brand-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-brand-50/50 border border-brand-200 rounded-sm outline-none focus:border-brand-500 transition-colors text-sm"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3 top-3.5 text-brand-400 group-focus-within:text-brand-600 transition-colors" size={18} />
                <input 
                  type="password"
                  required
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-brand-50/50 border border-brand-200 rounded-sm outline-none focus:border-brand-500 transition-colors text-sm"
                />
              </div>

              {isLogin && (
                <div className="text-right">
                  <a href="#" className="text-xs text-brand-500 hover:text-brand-800 transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              )}

              <Button className="w-full py-3 flex items-center justify-center gap-2 group" disabled={loading}>
                {loading ? 'Cargando...' : (isLogin ? 'Ingresar' : 'Crear Cuenta')} 
                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-brand-500 text-sm">
                {isLogin ? "¿Aún no tienes cuenta? " : "¿Ya tienes cuenta? "}
                <button 
                  onClick={() => { setIsLogin(!isLogin); setError(null); }}
                  className="text-brand-800 font-bold hover:underline"
                >
                  {isLogin ? 'Registrate' : 'Inicia Sesión'}
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;