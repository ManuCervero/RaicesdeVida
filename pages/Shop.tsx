import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard, SectionTitle } from '../components/UI';
import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { MOCK_PRODUCTS } from '../constants';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  
  // States
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [subFilter, setSubFilter] = useState<string>('Todo');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('products').select('*');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setProducts(data as Product[]);
      } else {
        // Fallback if DB is empty for demo purposes
        console.warn("No products found in DB, using mocks");
        setProducts(MOCK_PRODUCTS);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(MOCK_PRODUCTS); // Fallback on error
    } finally {
      setLoading(false);
    }
  };

  // Sync state with URL param
  useEffect(() => {
    setFilterCategory(categoryParam);
    setSubFilter('Todo'); // Reset subfilter when category changes
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Define Sub-filters based on Category
  const getSubFilters = () => {
    if (filterCategory === 'velas') {
      return ['Todas', 'Holísticas', 'Frescas', 'Clásicas', 'Cálidas'];
    }
    if (filterCategory === 'aromatizadores') {
      return ['Todo', 'Difusor', 'Spray'];
    }
    return [];
  };

  const subFilters = getSubFilters();

  const filteredProducts = products.filter(p => {
    // 1. Check Category
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    if (!matchCat) return false;

    // 2. Check SubFilter
    if (subFilter === 'Todo' || subFilter === 'Todas') return true;
    
    // Subfilter logic matches against tags
    return p.tags && p.tags.includes(subFilter);
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
         <p className="text-brand-500 animate-pulse">Cargando aromas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SectionTitle title="Nuestros Productos" subtitle="Hecho a mano" />

      {/* Filter Section */}
      <div className="flex flex-col items-center gap-8 mb-12">
        
        {/* Level 1: Main Categories - Horizontal Scroll on Mobile, Center on Desktop */}
        <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible flex justify-start md:justify-center hide-scrollbar">
          <div className="flex gap-4 min-w-max mx-auto">
            {['all', 'velas', 'aromatizadores', 'combos'].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 border shadow-sm ${
                  filterCategory === cat 
                    ? 'bg-brand-900 text-white border-brand-900 ring-4 ring-brand-100' 
                    : 'bg-white text-brand-600 border-brand-200 hover:border-brand-400 hover:text-brand-900 hover:shadow-md'
                }`}
              >
                {cat === 'all' ? 'Ver Todo' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Level 2: Sub Filters - High Contrast Pills */}
        {subFilters.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in max-w-2xl mx-auto">
            {subFilters.map(sf => (
              <button
                key={sf}
                onClick={() => setSubFilter(sf)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  subFilter === sf 
                    ? 'bg-brand-500 text-white border-brand-500 shadow-sm' 
                    : 'bg-transparent text-brand-400 border-brand-200 hover:border-brand-400 hover:text-brand-600'
                }`}
              >
                {sf}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 animate-fade-in">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-brand-50 rounded-lg border border-brand-100">
          <p className="text-brand-900 font-serif text-xl mb-2">No encontramos productos</p>
          <p className="text-brand-500 mb-6">Intentá con otra combinación de filtros.</p>
          <button 
            onClick={() => { setFilterCategory('all'); setSubFilter('Todo'); }}
            className="text-brand-800 font-bold underline hover:text-brand-600 uppercase text-xs tracking-widest"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;