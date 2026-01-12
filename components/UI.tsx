import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ children, variant = 'primary', onClick, className = '', disabled = false }) => {
  const baseStyle = "px-6 py-3 rounded-sm font-medium transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm";
  const variants = {
    primary: "bg-brand-900 text-white hover:bg-brand-700 active:bg-brand-800 border border-brand-900",
    secondary: "bg-brand-200 text-brand-900 hover:bg-brand-300",
    outline: "border border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <Link to={`/producto/${product.slug}`} className="group block bg-white p-2 hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-100 mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-white/90 text-brand-900 text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            Nuevo
          </span>
        )}
         {product.isFeatured && !product.isNew && (
          <span className="absolute top-2 left-2 bg-brand-900/90 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            Best Seller
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      <div className="text-center space-y-1 pb-2">
        <h3 className="font-serif text-lg text-brand-900 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-brand-500 text-sm font-medium">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="font-serif text-3xl md:text-4xl text-brand-900 mb-3">{title}</h2>
    {subtitle && (
      <div className="flex items-center justify-center">
        <span className="h-px w-8 bg-brand-300 mr-3"></span>
        <p className="text-brand-500 uppercase tracking-widest text-sm">{subtitle}</p>
        <span className="h-px w-8 bg-brand-300 ml-3"></span>
      </div>
    )}
  </div>
);