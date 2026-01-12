import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/UI';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation of login process
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we redirect to Admin if it looks like an admin, or Home
      if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }, 1500);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-brand-50">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 shadow-lg border border-brand-100 rounded-sm">
        
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-brand-900 mb-2">Bienvenido</h1>
          <p className="text-brand-500 text-sm">Ingresá a tu cuenta para ver tus pedidos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-brand-800 uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-brand-200 rounded-sm focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 bg-brand-50/30 transition-all"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-xs font-bold text-brand-800 uppercase tracking-wider">
                Contraseña
              </label>
              <a href="#" className="text-xs text-brand-500 hover:text-brand-800">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-brand-200 rounded-sm focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 bg-brand-50/30 transition-all"
              placeholder="••••••••"
            />
          </div>

          <Button 
            className="w-full py-4 text-sm shadow-md hover:shadow-lg transform active:scale-[0.99] transition-all"
            disabled={isLoading}
          >
            {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-brand-100">
          <p className="text-brand-500 text-sm">
            ¿No tenés una cuenta?{' '}
            <Link to="/contacto" className="text-brand-800 font-bold hover:underline">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;