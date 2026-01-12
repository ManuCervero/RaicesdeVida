import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/UI';
import { Trash2, ArrowLeft } from 'lucide-react';
import { CONFIG } from '../constants';

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-serif text-brand-900 mb-6">Tu carrito está vacío</h2>
        <p className="text-brand-500 mb-8">Parece que todavía no elegiste ningún aroma.</p>
        <Link to="/productos">
          <Button>Ir a la tienda</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif text-brand-900 mb-10">Tu Compra ({totalItems} items)</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-6 py-6 border-b border-brand-100 last:border-0">
                <div className="w-24 h-24 bg-brand-50 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-brand-900">
                      <Link to={`/producto/${item.slug}`}>{item.name}</Link>
                    </h3>
                    <p className="text-sm text-brand-500 mt-1">{item.variantName}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-brand-200">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="px-2 py-1 text-brand-600 hover:bg-brand-50"
                      >-</button>
                      <span className="px-2 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="px-2 py-1 text-brand-600 hover:bg-brand-50"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Eliminar
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-brand-900">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/productos" className="inline-flex items-center text-brand-600 hover:text-brand-900 mt-8 font-medium text-sm">
            <ArrowLeft size={16} className="mr-2" /> Seguir comprando
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4 mt-12 lg:mt-0">
          <div className="bg-white p-6 border border-brand-100 shadow-sm rounded-sm">
            <h2 className="font-serif text-xl mb-6">Resumen</h2>
            
            <div className="space-y-3 text-sm text-brand-700 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-500">
                <span>Retiro</span>
                <span className="text-green-600 font-medium">Sin cargo</span>
              </div>
              <div className="pt-4 border-t border-brand-100 flex justify-between font-bold text-lg text-brand-900">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Button className="w-full mb-4" onClick={() => navigate('/checkout')}>
              Iniciar Pago
            </Button>
            
            <p className="text-xs text-center text-brand-400">
              Pagos procesados de forma segura con Mercado Pago o Transferencia.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;