
import React from 'react';
import { useData } from '../context/DataContext';
import { MapPin, ExternalLink } from 'lucide-react';

export const Locaties: React.FC = () => {
  const { locations } = useData();

  return (
    <div className="pb-16 bg-[#fcfdfc]">
       {/* Consistent Hero Header */}
      <div className="relative bg-[#fcfdfc] pt-12 pb-32 lg:pt-20 lg:pb-48 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-sk_teal/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-96 h-96 bg-sk_mint/20 rounded-full blur-3xl opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white border-2 border-sk_teal/20 px-4 py-1.5 rounded-full text-sm font-bold text-sk_teal mb-6 shadow-sm">
              Onze plekken
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Waar vind je ons?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
             VZW De Speelkamer is actief op drie gezellige locaties in het centrum van Brugge.
          </p>
        </div>
      </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
         <div className="grid gap-24">
           {locations.map((location, index) => (
             <div key={location.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Image as Polaroid/Sticker */}
                <div className="flex-1 w-full relative group perspective-1000">
                   <div className={`absolute inset-0 bg-sk_teal/5 rounded-[2.5rem] transform translate-y-6 translate-x-6 transition-transform group-hover:translate-x-8 group-hover:translate-y-8 duration-500 ${index % 2 === 0 ? 'rotate-3' : '-rotate-2'}`}></div>
                   <div className={`relative h-80 lg:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transform transition-all duration-500 group-hover:scale-[1.02] ${index % 2 === 0 ? 'rotate-3' : '-rotate-2'}`}>
                      <img src={location.image} alt={location.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8">
                         <span className="text-white font-bold text-2xl flex items-center gap-2">
                           <MapPin size={24} className="text-sk_mint" fill="currentColor" /> {location.name}
                         </span>
                      </div>
                   </div>
                </div>

                <div className="flex-1 space-y-8">
                   <div>
                     <h2 className="text-4xl font-bold text-gray-800 mb-4">{location.name}</h2>
                     <div className="w-24 h-2 bg-gradient-to-r from-sk_teal to-sk_mint rounded-full"></div>
                   </div>
                   
                   <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-lg inline-block transform hover:-translate-y-1 transition-transform">
                      <div className="flex items-center gap-3 text-gray-600 font-medium text-lg">
                          <div className="w-10 h-10 bg-sk_teal/10 rounded-full flex items-center justify-center text-sk_teal">
                            <MapPin size={20} />
                          </div>
                          {location.address}
                      </div>
                   </div>

                   <p className="text-gray-600 text-lg leading-relaxed font-light">
                     {location.description}
                   </p>
                   
                   <div className="pt-4">
                      <a
                        href={location.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-sk_teal text-white rounded-full font-bold hover:bg-[#3d94a5] hover:shadow-xl hover:shadow-sk_teal/20 hover:-translate-y-1 transition-all duration-300"
                      >
                        Bekijk op kaart <ExternalLink size={20} />
                      </a>
                   </div>
                </div>
             </div>
           ))}
         </div>
       </div>
    </div>
  );
};
