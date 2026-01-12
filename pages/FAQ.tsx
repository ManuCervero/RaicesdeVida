import React from 'react';
import { Flame, Droplets, Clock, Wind, HelpCircle, AlertCircle } from 'lucide-react';
import { SectionTitle } from '../components/UI';
import { CONFIG } from '../constants';

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      
      {/* SECTION 1: CANDLE CARE (Linked from Footer) */}
      <div className="mb-20">
        <SectionTitle title="Cuidado de tus Velas" subtitle="Tips para que duren más y aromaticen mejor" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Tip 1 */}
           <div className="bg-white p-8 rounded-sm border border-brand-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center text-brand-600 mb-4">
                  <Flame size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-900 mb-3">La Memoria de la Vela</h3>
              <p className="text-brand-600 text-sm leading-relaxed">
                  La primera vez que la enciendas, es fundamental dejarla prendida hasta que se derrita toda la superficie (aprox. 1 hora). Esto evita el efecto "túnel" y asegura que la vela se consuma parejo hasta el final.
              </p>
           </div>

           {/* Tip 2 */}
           <div className="bg-white p-8 rounded-sm border border-brand-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center text-brand-600 mb-4">
                  <Droplets size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-900 mb-3">Cortar el Pabilo</h3>
              <p className="text-brand-600 text-sm leading-relaxed">
                  Antes de volver a encenderla, cortá la punta quemada del pabilo (dejalo de 5mm aprox). Esto mantiene la llama limpia, evita el humo negro y hace que la vela dure más tiempo.
              </p>
           </div>

           {/* Tip 3 */}
           <div className="bg-white p-8 rounded-sm border border-brand-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center text-brand-600 mb-4">
                  <Clock size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-900 mb-3">Tiempo de Uso</h3>
              <p className="text-brand-600 text-sm leading-relaxed">
                  No la dejes encendida por más de 4 horas seguidas. Si el envase se calienta demasiado, apagala y dejá que la cera solidifique antes de volver a usarla.
              </p>
           </div>

           {/* Tip 4 */}
           <div className="bg-white p-8 rounded-sm border border-brand-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-brand-50 h-16 w-16 rounded-full flex items-center justify-center text-brand-600 mb-4">
                  <Wind size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-900 mb-3">Cómo Apagarla</h3>
              <p className="text-brand-600 text-sm leading-relaxed">
                  Usá un apagavelas o tapala para quitarle el oxígeno. Evitá soplarla para no esparcir el humo del pabilo quemado y mantener el aroma en el ambiente.
              </p>
           </div>
        </div>
      </div>

      {/* SECTION 2: GENERAL FAQ */}
      <div className="max-w-2xl mx-auto">
         <SectionTitle title="Preguntas Frecuentes" subtitle="Envíos, Retiros y Pagos" />
         
         <div className="space-y-6">
             <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h4 className="font-bold text-brand-900 mb-2 flex items-center gap-2 text-lg">
                    <HelpCircle size={20} className="text-brand-500"/>
                    ¿Hacen envíos?
                </h4>
                <p className="text-brand-700 text-sm leading-relaxed ml-7">
                    No, por el momento trabajamos solo con retiro coordinado en Godoy Cruz.
                </p>
             </div>

             <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h4 className="font-bold text-brand-900 mb-2 flex items-center gap-2 text-lg">
                    <HelpCircle size={20} className="text-brand-500"/>
                    ¿Dónde es el retiro?
                </h4>
                <p className="text-brand-700 text-sm leading-relaxed ml-7">
                    Nuestro punto de entrega es en <strong>{CONFIG.address}</strong>. Coordinamos el día y horario exacto por WhatsApp o llamada.
                </p>
             </div>

             <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h4 className="font-bold text-brand-900 mb-2 flex items-center gap-2 text-lg">
                    <HelpCircle size={20} className="text-brand-500"/>
                    ¿Cuándo puedo retirar?
                </h4>
                <p className="text-brand-700 text-sm leading-relaxed ml-7">
                    Respondemos de lunes a sábado de 9 a 19 hs. Una vez confirmado tu pedido, pactamos el horario que te quede más cómodo.
                </p>
             </div>

             <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h4 className="font-bold text-brand-900 mb-2 flex items-center gap-2 text-lg">
                    <HelpCircle size={20} className="text-brand-500"/>
                    ¿Qué medios de pago aceptan?
                </h4>
                <p className="text-brand-700 text-sm leading-relaxed ml-7">
                    Aceptamos Transferencia Bancaria y MercadoPago (dinero en cuenta, tarjetas). Consultanos por promos en efectivo.
                </p>
             </div>
         </div>

         <div className="mt-12 text-center">
            <p className="text-brand-500 mb-4">¿Tenés otra duda?</p>
            <a 
              href={`https://wa.me/${CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-brand-900 text-white px-8 py-3 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-brand-700 transition-colors"
            >
              Contactanos por WhatsApp
            </a>
         </div>

      </div>

    </div>
  );
};

export default FAQ;