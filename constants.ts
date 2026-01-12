import { Product, Testimonial } from './types';

// ==========================================
// CONFIGURACIÓN DE IMÁGENES
// ==========================================
// MODO ACTUAL: 'unsplash' (Para que la web se vea bien ahora mismo)
// 
// PASOS PARA USAR TUS PROPIAS FOTOS DESDE GITHUB:
// 1. Sube este proyecto a tu GitHub.
// 2. Sube tus fotos a la carpeta 'public/images' en GitHub.
// 3. Cambia abajo: mode: 'unsplash'  --->  mode: 'github'
// 4. Cambia 'TU_USUARIO' y 'TU_REPO' por los tuyos reales.
// ==========================================

export const IMAGE_SOURCE = {
  mode: 'unsplash' as 'unsplash' | 'local' | 'github', 
  
  github: {
    user: 'TU_USUARIO',           // Ej: 'juanperez'
    repo: 'raices-de-vida',       // Ej: 'raices-de-vida'
    branch: 'main',
    folder: 'public/images'       // Carpeta donde pondrás las fotos
  }
};

// Función inteligente para elegir la fuente de la imagen
const getImg = (filename: string, unsplashUrl: string) => {
  // 1. Si el modo es GitHub, construye la URL "raw"
  if (IMAGE_SOURCE.mode === 'github') {
    return `https://raw.githubusercontent.com/${IMAGE_SOURCE.github.user}/${IMAGE_SOURCE.github.repo}/${IMAGE_SOURCE.github.branch}/${IMAGE_SOURCE.github.folder}/${filename}`;
  }
  
  // 2. Si el modo es Local (desarrollo en tu PC)
  if (IMAGE_SOURCE.mode === 'local') {
    return `/images/${filename}`;
  }

  // 3. Por defecto usa Unsplash (Demo)
  return unsplashUrl; 
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'vela-vainilla-caramelo',
    name: 'Vela Vainilla & Caramelo',
    shortDescription: 'Dulzura envolvente para tus espacios de relax.',
    description: 'Nuestra vela de soja artesanal con esencia de vainilla y notas de caramelo tostado. Ideal para crear un ambiente cálido y acogedor en las tardes de invierno.',
    price: 12500,
    category: 'velas',
    images: [
      getImg('vela-vainilla.jpg', 'https://images.unsplash.com/photo-1602825266977-1c25110d73ee?auto=format&fit=crop&q=80&w=800'),
      getImg('vela-vainilla-detalle.jpg', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800')
    ],
    tags: ['Cálidas', 'Clásicas'],
    variants: [
      { id: 'v1-s', name: '200g (Vaso Whisky)', price: 12500, stock: 10 },
      { id: 'v1-m', name: '350g (Cuenco Madera)', price: 18000, stock: 5 }
    ],
    isFeatured: true,
    isNew: false,
    notes: ['Vainilla de Madagascar', 'Caramelo', 'Leche de Coco']
  },
  {
    id: '2',
    slug: 'difusor-te-verde-lima',
    name: 'Difusor Té Verde & Lima',
    shortDescription: 'Frescura cítrica que renueva la energía.',
    description: 'Aromatizador de ambiente con varillas de ratán. Una fragancia vibrante que combina la frescura del té verde con toques chispeantes de lima.',
    price: 14200,
    category: 'aromatizadores',
    images: [
      getImg('difusor-te-verde.jpg', 'https://images.unsplash.com/photo-1616401784845-180886ba9ca2?auto=format&fit=crop&q=80&w=800')
    ],
    tags: ['Difusor', 'Frescas'],
    variants: [
      { id: 'v2-s', name: '250ml', price: 14200, stock: 20 },
      { id: 'v2-r', name: 'Repuesto 500ml', price: 18500, stock: 15 }
    ],
    isFeatured: true,
    isNew: true,
    notes: ['Té Verde', 'Lima', 'Bergamota']
  },
  {
    id: '3',
    slug: 'spray-textil-lavanda',
    name: 'Home Spray Lavanda Real',
    shortDescription: 'Calma instantánea para sábanas y ambientes.',
    description: 'Spray textil formulado para no manchar. El aroma a lavanda promueve el descanso y la relajación. Perfecto para rociar en la almohada antes de dormir.',
    price: 9800,
    category: 'aromatizadores',
    images: [
      getImg('spray-lavanda.jpg', 'https://images.unsplash.com/photo-1595867275464-943f6567990c?auto=format&fit=crop&q=80&w=800')
    ],
    tags: ['Spray', 'Holísticas'],
    variants: [
      { id: 'v3-s', name: '500ml Gatillo', price: 9800, stock: 30 }
    ],
    isFeatured: false,
    isNew: false,
    notes: ['Lavanda Francesa', 'Eucalipto Suave']
  },
  {
    id: '4',
    slug: 'vela-jazmin-nocturno',
    name: 'Vela Jazmín Nocturno',
    shortDescription: 'Un jardín floral en tu living.',
    description: 'Intensa fragancia floral protagonizada por el jazmín del país. Elegante, persistente y sofisticada.',
    price: 13000,
    category: 'velas',
    images: [
      getImg('vela-jazmin.jpg', 'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&q=80&w=800')
    ],
    tags: ['Clásicas', 'Frescas'],
    variants: [
      { id: 'v4-s', name: '200g (Vaso Blanco)', price: 13000, stock: 12 }
    ],
    isFeatured: true,
    isNew: true,
    notes: ['Jazmín', 'Gardenia', 'Almizcle']
  },
  {
    id: '5',
    slug: 'combo-spa-day',
    name: 'Combo Spa Day',
    shortDescription: 'El regalo perfecto para desconectar.',
    description: 'Incluye una Vela de Lavanda y un Home Spray de Tilo. Presentado en caja de regalo con lazo de seda.',
    price: 21000,
    category: 'combos',
    images: [
      getImg('combo-spa.jpg', 'https://images.unsplash.com/photo-1608181114410-db2dc6496585?auto=format&fit=crop&q=80&w=800')
    ],
    tags: ['Holísticas'],
    variants: [
      { id: 'v5-std', name: 'Standard Box', price: 21000, stock: 8 }
    ],
    isFeatured: true,
    isNew: false,
    notes: ['Lavanda', 'Tilo']
  },
  {
    id: '6',
    slug: 'vela-sandalo-madera',
    name: 'Vela Sándalo & Maderas',
    shortDescription: 'Notas profundas y terrosas.',
    description: 'Para los amantes de los aromas con carácter. Madera de sándalo con toques ahumados.',
    price: 12500,
    category: 'velas',
    images: [
      getImg('vela-sandalo.jpg', 'https://images.unsplash.com/photo-1608223652617-6804566f1225?auto=format&fit=crop&q=80&w=800')
    ],
    tags: ['Holísticas', 'Cálidas'],
    variants: [
      { id: 'v6-s', name: '200g (Vaso Negro)', price: 12500, stock: 15 }
    ],
    isFeatured: false,
    isNew: false,
    notes: ['Sándalo', 'Cedro', 'Ámbar']
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sofía M.',
    text: 'Las velas duran muchísimo y el aroma se siente en toda la casa. El packaging es hermoso, ideal para regalar.',
    rating: 5,
    location: 'Palermo, CABA',
    date: '2023-11-15'
  },
  {
    id: '2',
    name: 'Lucas R.',
    text: 'Compré el difusor de Té Verde y es súper fresco. La atención por WhatsApp fue excelente.',
    rating: 5,
    location: 'Córdoba Capital',
    date: '2023-12-02'
  },
  {
    id: '3',
    name: 'Ana P.',
    text: 'Llegó todo impecable y muy rápido. La vela de Vainilla es mi favorita lejos.',
    rating: 4,
    location: 'Rosario',
    date: '2023-12-20'
  }
];

export const CONFIG = {
  whatsappNumber: '542614607518',
  contactPhone: '+54 261 460 7518',
  instagramUrl: 'https://instagram.com',
  shippingThreshold: 50000,
  contactEmail: 'devidaraices@gmail.com',
  address: 'Martínez de Rosas & Javier Morales, Godoy Cruz',
  location: 'Mendoza, Argentina',
  mapsLink: 'https://www.google.com/maps/place/Martinez+de+Rosas+%26+Javier+Morales,+M5501+Godoy+Cruz,+Mendoza/@-32.948523,-68.844679,17z/data=!3m1!4b1!4m6!3m5!1s0x967e0bb8e711ae65:0xe9501488b302c89c!8m2!3d-32.948523!4d-68.8421041!16s%2Fg%2F11f2_m8rjx?entry=tts&g_ep=EgoyMDI1MTAwOC4wIPu8ASoASAFQAw%3D%3D&skid=3b29d7b8-b32f-412f-88fc-0d34e15c1c58'
};