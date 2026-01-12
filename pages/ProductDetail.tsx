import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_PRODUCTS, CONFIG } from '../constants';
import { useCart } from '../context/CartContext';
import { Button } from '../components/UI';
import { Minus, Plus, ArrowLeft, Heart, Share2, ShoppingBag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'notes'>('desc');
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setProduct(data as Product);
      } catch (err) {
        console.error("Error fetching product", err);
        // Fallback to mock for smooth demo if DB is empty
        const mockP = MOCK_PRODUCTS.find(p => p.slug === slug);
        if (mockP) setProduct(mockP);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  // Set default variant if not selected when product loads
  useEffect(() => {
    if (product && !selectedVariantId && product.variants && product.variants.length > 0) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product]);

  if (loading) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
            <p className="text-brand-500 animate-pulse">Cargando detalle...</p>
        </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-serif text-brand-900">Producto no encontrado</h2>
        <Button onClick={() => navigate('/productos')}>Volver a la tienda</Button>
      </div>
    );
  }

  const selectedVariant = product.variants?.find(v => v.id === selectedVariantId) || (product.variants && product.variants[0]);

  const handleAddToCart = () => {
    if(selectedVariant) {
        addItem(product, selectedVariant, quantity);
        // Simple feedback
        const btn = document.getElementById('add-btn');
        if(btn) {
            const originalText = btn.innerText;
            btn.innerText = "¡Agregado!";
            setTimeout(() => btn.innerText = originalText, 2000);
        }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      
      {/* App-like Navigation Header */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/productos" className="flex items-center text-brand-600 hover:text-brand-900 transition-colors font-medium text-sm uppercase tracking-wide">
            <div className="bg-white p-2 rounded-full shadow-sm mr-2 border border-brand-100">
                <ArrowLeft size={18} />
            </div>
            Volver
        </Link>
        <div className="flex gap-2">
            <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3 rounded-full transition-all shadow-sm border border-brand-100 ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-brand-400 hover:text-brand-600'}`}
            >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <button className="p-3 bg-white rounded-full text-brand-400 hover:text-brand-600 shadow-sm border border-brand-100 transition-colors">
                <Share2 size={20} />
            </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left: Product Showcase (Image) */}
          <div className="md:col-span-6 lg:col-span-5 relative animate-fade-in-up">
            {/* Background Blob/Card */}
            <div className="relative aspect-[3/4] md:aspect-[4/5] w-full bg-white rounded-[3rem] shadow-xl border border-white/60 overflow-hidden group">
                {/* Decorative background shapes inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-200/30 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>
                
                {/* The Image - Contained with padding so it looks like an object */}
                <div className="absolute inset-0 p-8 md:p-12 flex items-center justify-center">
                    <img 
                        src={product.images && product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover rounded-2xl shadow-lg transform transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Tags overlaid */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {product.tags && product.tags.slice(0,2).map(tag => (
                        <span key={tag} className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-800 shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-center py-4 animate-fade-in-up delay-100">
            
            <div className="mb-2">
                <span className="text-brand-400 uppercase tracking-widest text-xs font-bold">{product.category}</span>
                <h1 className="text-4xl lg:text-5xl font-serif text-brand-900 mt-2 mb-4 leading-tight">{product.name}</h1>
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-medium text-brand-800">
                        {selectedVariant ? formatPrice(selectedVariant.price) : formatPrice(product.price)}
                    </span>
                    {product.variants && product.variants.length > 1 && selectedVariant && (
                        <span className="text-xs text-brand-400 font-medium px-2 py-1 bg-brand-100 rounded-md">
                            Precio por {selectedVariant.name}
                        </span>
                    )}
                </div>
            </div>

            {/* Description / Notes Tabs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-100 mb-8">
                <div className="flex gap-6 border-b border-brand-100 mb-4 pb-1">
                    <button 
                        onClick={() => setActiveTab('desc')}
                        className={`text-sm font-bold uppercase tracking-widest pb-3 border-b-2 transition-colors ${activeTab === 'desc' ? 'border-brand-800 text-brand-900' : 'border-transparent text-brand-300 hover:text-brand-500'}`}
                    >
                        Descripción
                    </button>
                    <button 
                        onClick={() => setActiveTab('notes')}
                        className={`text-sm font-bold uppercase tracking-widest pb-3 border-b-2 transition-colors ${activeTab === 'notes' ? 'border-brand-800 text-brand-900' : 'border-transparent text-brand-300 hover:text-brand-500'}`}
                    >
                        Notas Olfativas
                    </button>
                </div>
                <div className="min-h-[80px] text-brand-600 text-sm leading-relaxed">
                    {activeTab === 'desc' ? (
                        <p>{product.description}</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {product.notes && product.notes.map((note, i) => (
                                <span key={i} className="inline-block bg-brand-50 text-brand-700 px-3 py-1 rounded-md text-xs font-medium">
                                    • {note}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
                
                {/* Variant Selector */}
                {product.variants && product.variants.length > 0 && (
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-400">Seleccionar Variante</label>
                        <div className="flex flex-wrap gap-3">
                            {product.variants.map(v => (
                                <button
                                    key={v.id}
                                    onClick={() => setSelectedVariantId(v.id)}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all shadow-sm border ${
                                        selectedVariantId === v.id
                                            ? 'bg-brand-900 text-white border-brand-900 shadow-md transform scale-105'
                                            : 'bg-white text-brand-600 border-brand-100 hover:border-brand-300 hover:bg-brand-50'
                                    }`}
                                >
                                    {v.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions Bar */}
                <div className="pt-6 border-t border-brand-200 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                    
                    {/* Quantity Pill */}
                    <div className="flex items-center bg-white border border-brand-200 rounded-full px-2 shadow-sm h-14 w-fit mx-auto sm:mx-0">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-full flex items-center justify-center text-brand-400 hover:text-brand-900 transition-colors"
                        >
                            <Minus size={18} />
                        </button>
                        <span className="w-8 text-center font-bold text-lg text-brand-900">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-full flex items-center justify-center text-brand-400 hover:text-brand-900 transition-colors"
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    {/* Add Button */}
                    <button 
                        id="add-btn"
                        onClick={handleAddToCart}
                        disabled={!selectedVariant}
                        className="flex-1 bg-brand-900 text-white h-14 rounded-full font-bold uppercase tracking-widest text-sm shadow-lg hover:bg-brand-800 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingBag size={20} />
                        {selectedVariant ? 'Agregar al Carrito' : 'Sin Stock'}
                    </button>
                </div>

                <div className="text-center sm:text-left pt-2">
                     <a 
                        href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hola, tengo una duda sobre: ${product.name}`}
                        target="_blank"
                        rel="noreferrer" 
                        className="inline-block text-xs text-brand-400 hover:text-brand-600 underline underline-offset-4 transition-colors"
                      >
                        ¿Tenés dudas? Consultanos por WhatsApp
                      </a>
                </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;