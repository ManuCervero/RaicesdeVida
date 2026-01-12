import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/UI';
import { MapPin } from 'lucide-react';

const Checkout = () => {
  const { subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const orderNumber = Math.floor(Math.random() * 1000000);
      clearCart();
      setLoading(false);
      // In a real app, this would route to /pedido/[orderNumber]
      alert(`¡Pedido #${orderNumber} Confirmado! Gracias por tu compra.`);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif text-center text-brand-900 mb-10">Finalizar Compra</h1>
      
      <div className="bg-white p-8 border border-brand-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-brand-800 border-b border-brand-100 pb-2">Datos de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="text" placeholder="Nombre completo" className="w-full p-3 border border-brand-200 rounded-sm focus:outline-none focus:border-brand-500" />
              <input required type="text" placeholder="Teléfono / WhatsApp" className="w-full p-3 border border-brand-200 rounded-sm focus:outline-none focus:border-brand-500" />
            </div>
            <input required type="email" placeholder="Email" className="w-full p-3 border border-brand-200 rounded-sm focus:outline-none focus:border-brand-500" />
          </div>

          {/* Shipping section removed as requested. Added static info instead. */}
          <div className="bg-brand-50 p-6 rounded-sm border border-brand-100 flex gap-4 items-start animate-fade-in">
             <div className="p-2 bg-white rounded-full text-brand-500 shadow-sm shrink-0">
                <MapPin size={20} />
             </div>
             <div className="text-sm text-brand-700">
                <h3 className="font-bold text-brand-900 mb-1">Retiro por Godoy Cruz</h3>
                <p className="mb-2">Recordá que no realizamos envíos a domicilio.</p>
                <p className="text-brand-500">
                  Una vez confirmado el pedido, nos pondremos en contacto por WhatsApp para coordinar el día y horario de retiro.
                </p>
             </div>
          </div>

          <div className="pt-6 border-t border-brand-100">
             <div className="flex justify-between items-center mb-6 text-xl font-bold text-brand-900">
                <span>Total a pagar</span>
                <span>${subtotal.toLocaleString('es-AR')}</span>
             </div>
             
             <Button className="w-full py-4 text-base" disabled={loading}>
                {loading ? 'Procesando...' : 'Confirmar Pedido'}
             </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;