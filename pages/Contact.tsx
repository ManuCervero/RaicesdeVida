import React, { useState } from 'react';
import { Phone, MapPin, Clock, MessageCircle, ExternalLink, Plus, Minus } from 'lucide-react';
import { CONFIG } from '../constants';
import { Button } from '../components/UI';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "¿Hacen envíos?",
      a: "No, por el momento trabajamos solo con retiro coordinado en Godoy Cruz."
    },
    {
      q: "¿Dónde es el retiro?",
      a: `Nuestro punto de entrega es en ${CONFIG.address}. Coordinamos el día y horario exacto por WhatsApp o llamada.`
    },
    {
      q: "¿Cuándo puedo retirar?",
      a: "Respondemos de lunes a sábado de 9 a 19 hs. Una vez confirmado tu pedido, pactamos el horario que te quede más cómodo."
    },
    {
      q: "¿Qué medios de pago aceptan?",
      a: "Aceptamos Transferencia Bancaria y MercadoPago (dinero en cuenta, tarjetas). Consultanos por promos en efectivo."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* 1) Hero */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-900 mb-4">Contacto</h1>
        <p className="text-brand-500 text-lg max-w-2xl mx-auto">
          Retiro en Godoy Cruz (Mendoza).<br/>
          Coordinamos tu pedido por WhatsApp o llamada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* Left Column: Info & Hours */}
        <div className="space-y-10 animate-fade-in">
          
          {/* 2) Info Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp Card */}
            <div className="bg-white p-6 border border-brand-200 rounded-sm shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 mb-4">
                <MessageCircle size={20} />
              </div>
              <h3 className="font-bold text-brand-900 mb-1">WhatsApp</h3>
              <p className="text-brand-500 text-sm mb-4">{CONFIG.contactPhone}</p>
              <a 
                href={`https://wa.me/${CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-brand-800 uppercase tracking-wider hover:text-green-700 border-b border-brand-200 hover:border-green-700 pb-1 transition-colors"
              >
                Enviar mensaje
              </a>
            </div>

            {/* Call Card */}
            <div className="bg-white p-6 border border-brand-200 rounded-sm shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 mb-4">
                <Phone size={20} />
              </div>
              <h3 className="font-bold text-brand-900 mb-1">Llamar</h3>
              <p className="text-brand-500 text-sm mb-4">Asesoramiento</p>
              <a 
                href={`tel:${CONFIG.contactPhone}`}
                className="text-sm font-bold text-brand-800 uppercase tracking-wider hover:text-brand-600 border-b border-brand-200 hover:border-brand-600 pb-1 transition-colors"
              >
                Llamar ahora
              </a>
            </div>
          </div>

          {/* 3) & 4) Info Text Blocks */}
          <div className="bg-brand-50/50 p-6 md:p-8 rounded-sm border-l-4 border-brand-400 space-y-6">
            <div>
              <h3 className="flex items-center gap-2 font-serif text-xl text-brand-900 mb-2">
                <MapPin size={20} className="text-brand-500" />
                Retiro / Entrega
              </h3>
              <ul className="list-disc list-inside text-brand-600 space-y-1 text-sm md:text-base">
                <li><span className="font-bold">No realizamos envíos.</span></li>
                <li>Retiro coordinado en Godoy Cruz ({CONFIG.address}).</li>
                <li>Si necesitás entrega especial, consultanos disponibilidad.</li>
              </ul>
            </div>
            
            <div className="pt-6 border-t border-brand-200">
               <h3 className="flex items-center gap-2 font-serif text-xl text-brand-900 mb-2">
                <Clock size={20} className="text-brand-500" />
                Horarios
              </h3>
              <p className="text-brand-600 text-sm md:text-base">Respondemos de lunes a sábado, 9 a 19 hs.<br/>Retiros siempre con coordinación previa.</p>
            </div>
          </div>

           {/* 6) FAQ Mini */}
           <div>
            <h3 className="font-serif text-2xl text-brand-900 mb-4">Preguntas Frecuentes</h3>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-brand-200 rounded-sm overflow-hidden bg-white">
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full flex justify-between items-center p-4 text-left hover:bg-brand-50 transition-colors"
                  >
                    <span className="font-medium text-brand-800">{faq.q}</span>
                    {openFaq === i ? <Minus size={16} className="text-brand-400"/> : <Plus size={16} className="text-brand-400"/>}
                  </button>
                  {openFaq === i && (
                    <div className="p-4 pt-0 text-brand-500 text-sm leading-relaxed border-t border-brand-50 bg-brand-50/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
           </div>

        </div>

        {/* Right Column: Map */}
        <div className="relative h-min animate-fade-in delay-100">
          <div className="bg-white p-2 border border-brand-200 shadow-lg rounded-sm">
            <div className="aspect-[4/3] w-full bg-brand-100 relative overflow-hidden">
                {/* Embed Map without API Key using standard output link */}
                <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://maps.google.com/maps?q=Martinez+de+Rosas+%26+Javier+Morales,+Godoy+Cruz,+Mendoza&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
            </div>
            <div className="p-4 text-center">
                <p className="text-brand-900 font-bold mb-1">{CONFIG.address}</p>
                <p className="text-brand-400 text-sm mb-4">Mendoza, Argentina</p>
                <a 
                    href={CONFIG.mapsLink} 
                    target="_blank" 
                    rel="noreferrer"
                >
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                        <ExternalLink size={16} /> Abrir en Google Maps
                    </Button>
                </a>
            </div>
          </div>
        </div>

      </div>

      {/* 7) Final CTA */}
      <div className="max-w-2xl mx-auto text-center py-12 border-t border-brand-100">
        <h2 className="font-serif text-2xl text-brand-900 mb-6">¿Necesitás coordinar tu retiro?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
                href={`https://wa.me/${CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
            >
                <Button className="w-full bg-green-700 text-white border-green-700 hover:bg-green-800">
                    Hablar por WhatsApp
                </Button>
            </a>
            <a 
                href={`tel:${CONFIG.contactPhone}`}
                className="w-full sm:w-auto"
            >
                <Button variant="outline" className="w-full">
                    Llamar ahora
                </Button>
            </a>
        </div>
      </div>

    </div>
  );
};

export default Contact;