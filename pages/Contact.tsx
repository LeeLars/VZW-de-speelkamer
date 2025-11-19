
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, Facebook, Clock, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="pb-16 bg-[#fcfdfc]">
      {/* Consistent Hero Header */}
      <div className="relative bg-[#fcfdfc] pt-12 pb-32 lg:pt-20 lg:pb-48 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-sk_orange/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-96 h-96 bg-sk_teal/10 rounded-full blur-3xl opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white border-2 border-sk_orange/20 px-4 py-1.5 rounded-full text-sm font-bold text-sk_orange mb-6 shadow-sm">
              Vragen of opmerkingen?
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Contacteer Ons
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
             Heb je vragen over de opvang, inschrijvingen of specifieke zorg? We helpen je graag verder.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Contact Info */}
          <div className="space-y-8">
             <h2 className="text-2xl font-bold text-gray-800 pl-4 border-l-4 border-sk_teal">Onze Gegevens</h2>
             <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-sk_slate/5 border border-white space-y-8">
                <div className="flex items-center gap-6 group">
                   <div className="w-16 h-16 bg-sk_teal/10 rounded-2xl flex items-center justify-center text-sk_teal group-hover:scale-110 transition-transform">
                      <Mail size={28} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Stuur een mailtje</p>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl font-bold text-gray-800 hover:text-sk_teal transition-colors">{CONTACT_INFO.email}</a>
                   </div>
                </div>

                <div className="flex items-center gap-6 group">
                   <div className="w-16 h-16 bg-sk_orange/10 rounded-2xl flex items-center justify-center text-sk_orange group-hover:scale-110 transition-transform">
                      <Phone size={28} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Bel ons op</p>
                      <a href={`tel:${CONTACT_INFO.phone}`} className="text-xl font-bold text-gray-800 hover:text-sk_teal transition-colors">{CONTACT_INFO.phone}</a>
                   </div>
                </div>

                <div className="flex items-center gap-6 group">
                   <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1877F2] group-hover:scale-110 transition-transform">
                      <Facebook size={28} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Social Media</p>
                      <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noreferrer" className="text-xl font-bold text-gray-800 hover:text-[#1877F2] transition-colors">
                        Volg onze avonturen
                      </a>
                   </div>
                </div>
             </div>
          </div>

          {/* Practical Info */}
          <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800 pl-4 border-l-4 border-sk_mint">Bereikbaarheid</h2>
              <div className="bg-sk_mint/10 p-8 rounded-[2.5rem] border border-sk_mint/20 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                   <div className="bg-white p-3 rounded-xl text-sk_mint shadow-sm"><Clock size={24} /></div>
                   <div>
                      <h3 className="font-bold text-gray-800 text-xl mb-1">Wanneer bellen?</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Wij zijn telefonisch het best bereikbaar tijdens de kantooruren (09:00 - 17:00).
                      </p>
                   </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm mt-auto">
                  <h4 className="font-bold text-sk_teal mb-3 text-lg flex items-center gap-2">
                     <MapPin size={20} /> Tijdens opvanguren
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Voor dringende zaken tijdens de opvanguren of kampen belt u best rechtstreeks naar de verantwoordelijke.
                  </p>
                  <div className="bg-sk_teal/5 p-4 rounded-xl border border-sk_teal/10">
                     <p className="text-gray-800 font-bold">Inge Versavel</p>
                     <a href="tel:0476908123" className="text-sk_teal font-medium hover:underline">0476 90 81 23</a>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
