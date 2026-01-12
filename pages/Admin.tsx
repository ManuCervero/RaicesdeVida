import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { 
  Package, 
  ShoppingBag, 
  Clock, 
  Search, 
  Edit3, 
  MoreVertical, 
  CheckCircle, 
  AlertCircle, 
  Truck, 
  DollarSign, 
  Calendar,
  ChevronDown,
  Mail,
  Phone
} from 'lucide-react';

// --- MOCK DATA FOR ORDERS (Local for UI demo) ---
const MOCK_ORDERS = [
  {
    id: '#ORD-001',
    customer: 'Manuel Cervero',
    email: 'manuelcervero87@gmail.com',
    date: '08/01/2026',
    time: '23:55',
    items: [
      { name: 'Calma', variant: '200g', qty: 1, price: 14000 }
    ],
    total: 14000,
    status: 'pending', // pending, paid, shipped, cancelled
    paymentMethod: 'Transferencia'
  },
  {
    id: '#ORD-002',
    customer: 'Ana García',
    email: 'ana.g@example.com',
    date: '08/01/2026',
    time: '14:30',
    items: [
      { name: 'Abundancia', variant: '200g', qty: 2, price: 14000 },
      { name: 'Coco & Lima', variant: 'Difusor', qty: 1, price: 14000 }
    ],
    total: 42000,
    status: 'paid',
    paymentMethod: 'MercadoPago'
  },
  {
    id: '#ORD-003',
    customer: 'Lucas Rodriguez',
    email: 'lucas.r@example.com',
    date: '07/01/2026',
    time: '09:15',
    items: [
      { name: 'Combo Chico', variant: 'Standard', qty: 1, price: 15000 }
    ],
    total: 15000,
    status: 'shipped',
    paymentMethod: 'Efectivo'
  }
];

type TabType = 'inventory' | 'orders' | 'history';

// Helper: Order Card Component with State Management Logic (Mocked)
// Defined before usage to ensure type inference works correctly
const OrderCard: React.FC<{ order: any }> = ({ order }) => {
  // Simple Mock State Management for UI Demo
  const [status, setStatus] = useState(order.status);

  const statusConfig: any = {
    pending: { color: 'bg-yellow-100 text-yellow-700', label: 'Pendiente', icon: AlertCircle },
    paid: { color: 'bg-blue-100 text-blue-700', label: 'Pagado', icon: DollarSign },
    shipped: { color: 'bg-green-100 text-green-700', label: 'Entregado', icon: Truck },
    cancelled: { color: 'bg-red-100 text-red-700', label: 'Cancelado', icon: AlertCircle },
  };

  const currentStatus = statusConfig[status];
  const Icon = currentStatus.icon;

  return (
    <div className="bg-white border border-brand-200 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
      {/* Card Header */}
      <div className="bg-brand-50/30 px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-brand-100">
        <div className="flex items-center gap-3">
           <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
              {order.customer.charAt(0)}
           </div>
           <div>
              <h3 className="font-bold text-brand-900 text-lg">{order.customer}</h3>
              <div className="flex items-center gap-2 text-xs text-brand-500">
                <Mail size={12} /> {order.email}
                <span className="text-brand-300">|</span>
                <Phone size={12} /> 2615271415
              </div>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <p className="text-xs text-brand-400 font-bold uppercase">Pedido</p>
              <p className="font-mono text-brand-700">{order.id}</p>
           </div>
           <div className="text-right border-l border-brand-200 pl-4">
              <p className="text-xs text-brand-400 font-bold uppercase">Fecha</p>
              <div className="flex items-center gap-1 text-brand-700 text-sm">
                <Calendar size={14}/> {order.date} <span className="text-xs text-brand-400">{order.time}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* Product List */}
         <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-brand-900 mb-2">Productos:</h4>
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-brand-50 last:border-0">
                 <div>
                    <span className="font-medium text-brand-800">{item.name}</span>
                    <span className="text-xs text-brand-400 ml-2">{item.variant}</span>
                 </div>
                 <div className="text-sm text-brand-600">
                    {item.qty}x <span className="font-medium">${item.price}</span>
                 </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 mt-2">
               <span className="font-bold text-brand-900 text-lg">Total:</span>
               <span className="font-bold text-brand-900 text-2xl">${order.total.toLocaleString('es-AR')}</span>
            </div>
         </div>

         {/* Actions Status */}
         <div className="bg-brand-50/50 rounded-lg p-5 flex flex-col justify-center space-y-4">
            <label className="text-xs font-bold text-brand-500 uppercase">Estado del pedido</label>
            
            <div className="relative group">
               <button className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border border-brand-200 transition-all ${currentStatus.color} bg-white hover:shadow-md`}>
                  <div className="flex items-center gap-2">
                    <Icon size={18} />
                    <span className="font-bold">{currentStatus.label}</span>
                  </div>
                  <ChevronDown size={16} />
               </button>
               
               {/* Dropdown (Hover simulation) */}
               <div className="absolute top-full left-0 w-full mt-2 bg-brand-900 rounded-lg shadow-xl py-2 z-10 hidden group-hover:block animate-fade-in">
                  {Object.entries(statusConfig).map(([key, config]: any) => (
                    <button 
                      key={key}
                      onClick={() => setStatus(key)}
                      className="w-full text-left px-4 py-2 text-brand-100 hover:bg-brand-800 hover:text-white text-sm"
                    >
                      {config.label}
                    </button>
                  ))}
               </div>
            </div>

            <div className="pt-2 border-t border-brand-200">
               <p className="text-xs text-brand-400 mb-2">Acciones rápidas</p>
               <div className="flex gap-2">
                 <button className="flex-1 bg-white border border-brand-200 text-brand-700 py-2 rounded text-xs font-bold hover:bg-brand-50">
                    Ver Nota
                 </button>
                 <button className="flex-1 bg-white border border-brand-200 text-brand-700 py-2 rounded text-xs font-bold hover:bg-brand-50">
                    Imprimir
                 </button>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabType>('inventory');

  return (
    <div className="min-h-screen bg-brand-200/20 pb-20">
      {/* Header */}
      <div className="bg-brand-50 border-b border-brand-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-serif text-brand-900 font-bold">Gestión</h1>
              <p className="text-brand-500">Administra el inventario y los pedidos</p>
            </div>
            {/* Quick Stats (Optional visibility) */}
            <div className="flex gap-4">
              <div className="bg-white px-4 py-2 rounded-lg border border-brand-200 shadow-sm flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-700"><AlertCircle size={18}/></div>
                <div>
                   <p className="text-xs text-brand-400 font-bold uppercase">Pendientes</p>
                   <p className="font-bold text-brand-900 text-lg">3</p>
                </div>
              </div>
               <div className="bg-white px-4 py-2 rounded-lg border border-brand-200 shadow-sm flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-700"><DollarSign size={18}/></div>
                <div>
                   <p className="text-xs text-brand-400 font-bold uppercase">Ingresos (Hoy)</p>
                   <p className="font-bold text-brand-900 text-lg">$56.000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-brand-200/50 p-1 rounded-lg w-fit">
            <TabButton 
              active={activeTab === 'inventory'} 
              onClick={() => setActiveTab('inventory')} 
              icon={<Package size={18} />}
              label="Inventario"
            />
            <TabButton 
              active={activeTab === 'orders'} 
              onClick={() => setActiveTab('orders')} 
              icon={<ShoppingBag size={18} />}
              label="Pedidos"
            />
            <TabButton 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')} 
              icon={<Clock size={18} />}
              label="Historial"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        
        {activeTab === 'inventory' && <InventoryView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'history' && <HistoryView />}

      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-bold transition-all ${
      active 
        ? 'bg-brand-900 text-white shadow-md' 
        : 'text-brand-700 hover:bg-white/50 hover:text-brand-900'
    }`}
  >
    {icon}
    {label}
  </button>
);

const InventoryView = () => {
  return (
    <div className="bg-white rounded-xl border border-brand-200 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-brand-100 flex justify-between items-center bg-brand-50/50">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 text-brand-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar producto..." 
            className="w-full pl-10 pr-4 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <button className="bg-brand-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-800 transition-colors">
          + Nuevo Producto
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-900 text-brand-50 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 rounded-tl-lg">Producto</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Precio</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 rounded-tr-lg text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {MOCK_PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-brand-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-md object-cover border border-brand-200" />
                    <span className="font-bold text-brand-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-bold capitalize">
                    {p.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-brand-900">
                  ${p.price.toLocaleString('es-AR')}
                </td>
                <td className="px-6 py-4">
                  <span className={`font-bold ${p.variants.reduce((a,b)=>a+b.stock,0) < 5 ? 'text-red-500' : 'text-green-600'}`}>
                    {p.variants.reduce((a,b)=>a+b.stock,0)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-brand-400 hover:text-brand-900 hover:bg-brand-200 rounded-full transition-all">
                    <Edit3 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrdersView = () => {
  return (
    <div className="space-y-6">
      {MOCK_ORDERS.filter(o => o.status !== 'shipped').map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
       {MOCK_ORDERS.filter(o => o.status !== 'shipped').length === 0 && (
         <div className="text-center py-20 bg-white rounded-xl border border-dashed border-brand-300">
            <p className="text-brand-400">No hay pedidos activos por el momento.</p>
         </div>
       )}
    </div>
  );
};

const HistoryView = () => {
  const shippedOrders = MOCK_ORDERS.filter(o => o.status === 'shipped');
  
  return (
    <div className="bg-white rounded-xl border border-brand-200 shadow-sm overflow-hidden">
       <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50 text-brand-900 uppercase text-xs tracking-wider border-b border-brand-200">
            <tr>
              <th className="px-6 py-4">ID Pedido</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {shippedOrders.map((o) => (
              <tr key={o.id} className="hover:bg-brand-50/50">
                 <td className="px-6 py-4 font-mono text-brand-500">{o.id}</td>
                 <td className="px-6 py-4 text-brand-700">{o.date}</td>
                 <td className="px-6 py-4 font-bold text-brand-900">{o.customer}</td>
                 <td className="px-6 py-4 font-medium">${o.total.toLocaleString('es-AR')}</td>
                 <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                      <CheckCircle size={12}/> Completado
                    </span>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;