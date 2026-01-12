import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Lock, Heart, MessageCircle, ArrowRight, Star } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_TESTIMONIALS, CONFIG } from '../constants';
import { ProductCard, SectionTitle, Button } from '../components/UI';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [aromaFilter, setAromaFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Fetch all products to filter client side or fetch specific query
        const { data, error } = await supabase.from('products').select('*');
        if (data && data.length > 0) {
          setProducts(data as Product[]);
        } else {
           setProducts(MOCK_PRODUCTS);
        }
      } catch (err) {
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  const aromaRecommendations = aromaFilter 
    ? products.filter(p => (p.tags && p.tags.includes(aromaFilter)) || (p.notes && p.notes.some(n => n.includes(aromaFilter)))).slice(0, 4)
    : [];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 3.1 Hero Section Redesign */}
      <section className="relative w-full bg-brand-900 overflow-hidden min-h-[85vh] flex items-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-800/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Text Column */}
            <div className="space-y-8 text-center md:text-left pt-8 md:pt-0">
              <div className="inline-block border-l-4 border-brand-300 pl-4">
                <p className="text-brand-300 text-sm md:text-base uppercase tracking-[0.3em] font-medium animate-fade-in-up">
                  Raíces de Vida
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight animate-fade-in-up delay-100">
                Aromas que <br/>
                <span className="italic text-brand-200">conectan con lo natural</span>
              </h1>
              <p className="text-brand-100 text-lg max-w-xl leading-relaxed animate-fade-in-up delay-200 mx-auto md:mx-0">
                Velas de soja artesanales con detalles botánicos reales. Hechas a mano para iluminar tus momentos de calma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start animate-fade-in-up delay-300">
                <Link to="/productos?category=velas">
                  <Button className="w-full sm:w-auto min-w-[180px] bg-brand-200 text-brand-900 hover:bg-white border border-brand-200 hover:border-white shadow-lg font-bold">
                    Descubrir Velas
                  </Button>
                </Link>
                <Link to="/productos?category=aromatizadores">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto min-w-[180px] !border-brand-200 !text-brand-50 hover:!bg-brand-200 hover:!text-brand-900 font-medium transition-colors duration-300"
                  >
                    Ver Aromatizadores
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image Column - Simulated Product Focus */}
            <div className="relative h-[40vh] md:h-[70vh] w-full flex items-center justify-center animate-fade-in delay-500">
               <div className="relative w-full max-w-sm aspect-square md:aspect-auto md:h-[80%]">
                  {/* Glow effect behind product */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-brand-300/10 rounded-full blur-2xl transform scale-90"></div>
                  
                  <img 
                    src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800" 
                    alt="Vela de soja con rodaja de naranja" 
                    className="relative w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white/5 ring-1 ring-black/20 transform hover:scale-105 transition-transform duration-700"
                  />
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3.2 Trust Bar */}
      <section className="bg-white py-12 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Lock, title: "Compra segura", sub: "Protegemos tus datos" },
              { icon: Heart, title: "Hecho a mano", sub: "100% Cera de Soja" },
              { icon: MessageCircle, title: "Atención x WhatsApp", sub: "Asesoramiento" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-brand-50 rounded-full text-brand-700">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-brand-900">{item.title}</h3>
                  <p className="text-brand-500 text-sm">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.3 Shop By Category */}
      <section className="max-w-7xl mx-auto px-4">
        <SectionTitle title="Nuestras Colecciones" subtitle="Explorá por categoría" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: "Velas de Soja", 
              img: "https://images.unsplash.com/photo-1602825266977-1c25110d73ee?auto=format&fit=crop&q=80&w=800",
              link: "/productos?category=velas"
            },
            { 
              title: "Aromatizadores", 
              img: "https://images.unsplash.com/photo-1616401784845-180886ba9ca2?auto=format&fit=crop&q=80&w=800",
              link: "/productos?category=aromatizadores"
            },
            { 
              title: "Combos", 
              img: "https://images.unsplash.com/photo-1592186881580-87729227f71a?auto=format&fit=crop&q=80&w=800",
              link: "/productos?category=combos"
            }
          ].map((cat) => (
            <Link key={cat.title} to={cat.link} className="group relative h-96 overflow-hidden block rounded-sm shadow-md">
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-brand-900/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-white font-serif text-3xl mb-2">{cat.title}</h3>
                <span className="text-white text-sm uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Ver productos <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3.4 Best Sellers */}
      <section className="max-w-7xl mx-auto px-4">
        <SectionTitle title="Favoritos de la Tienda" subtitle="Lo más elegido" />
        
        {loading ? (
           <p className="text-center text-brand-400">Cargando destacados...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/productos">
            <Button variant="outline" className="border-brand-300 text-brand-700 hover:bg-brand-700 hover:text-white hover:border-brand-700">Ver todos los productos</Button>
          </Link>
        </div>
      </section>

      {/* 3.6 Aroma Finder */}
      <section className="bg-brand-100/50 py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <SectionTitle title="Encontrá tu aroma ideal" subtitle="¿Qué sensación buscás hoy?" />
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Frescas', 'Cálidas', 'Holísticas', 'Clásicas'].map((aroma) => (
              <button
                key={aroma}
                onClick={() => setAromaFilter(aroma === aromaFilter ? null : aroma)}
                className={`px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all shadow-sm ${
                  aromaFilter === aroma 
                    ? 'bg-brand-800 text-white shadow-lg scale-105' 
                    : 'bg-white text-brand-800 hover:bg-brand-50 hover:shadow-md'
                }`}
              >
                {aroma}
              </button>
            ))}
          </div>

          {aromaFilter && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
              {aromaRecommendations.length > 0 ? (
                aromaRecommendations.map(p => <ProductCard key={p.id} product={p} />)
              ) : (
                <div className="col-span-4 py-8 text-brand-600">
                  <p>Pronto tendremos opciones para este estilo. ¡Probá con otro!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3.7 Testimonials */}
      <section className="max-w-7xl mx-auto px-4">
        <SectionTitle title="Lo que dicen quienes compraron" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 border border-brand-100 shadow-sm flex flex-col items-center text-center rounded-sm hover:shadow-md transition-shadow">
              <div className="flex text-brand-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                ))}
              </div>
              <p className="text-brand-600 italic mb-6 font-serif text-lg">"{t.text}"</p>
              <div>
                <p className="font-bold text-brand-900 text-sm">{t.name}</p>
                <p className="text-brand-400 text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.9 Final CTA */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-brand-900 text-brand-50 rounded-sm p-12 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1615486511484-92e172cc416d?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl text-white">¿No sabés cuál elegir?</h2>
            <p className="text-brand-200">Escribinos y te asesoramos para que encuentres el aroma perfecto para tu espacio.</p>
            <a 
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hola! Necesito ayuda para elegir una vela.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-sm hover:bg-brand-600 transition-colors uppercase tracking-widest text-sm font-bold shadow-lg"
            >
              <MessageCircle size={20} />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;