
import React from 'react';
import { useData } from '../context/DataContext';
import { User, Smile } from 'lucide-react';

export const Team: React.FC = () => {
  const { team, locations } = useData();

  // Helper to get color class based on index for variety
  const getColorClass = (index: number) => {
    const colors = [
      'border-sk_mint hover:shadow-sk_mint/20',
      'border-sk_yellow hover:shadow-sk_yellow/20',
      'border-sk_pink hover:shadow-sk_pink/20',
      'border-sk_teal hover:shadow-sk_teal/20'
    ];
    return colors[index % colors.length];
  };

   const getBgClass = (index: number) => {
    const colors = [
      'bg-sk_mint',
      'bg-sk_yellow',
      'bg-sk_pink',
      'bg-sk_teal'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="pb-16 bg-[#fcfdfc]">
      {/* Consistent Hero Header */}
      <div className="relative bg-[#fcfdfc] pt-12 pb-32 lg:pt-20 lg:pb-48 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-sk_rose/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-96 h-96 bg-sk_pink/10 rounded-full blur-3xl opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white border-2 border-sk_pink/20 px-4 py-1.5 rounded-full text-sm font-bold text-sk_pink mb-6 shadow-sm">
              Onze begeleiders
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Ons Droomteam
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
             Het kloppende hart van De Speelkamer. Een bende enthousiaste begeleiders die elke dag met een glimlach klaarstaat.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {team.map((member, index) => {
            const locationNames = member.locationIds
              .map(id => locations.find(l => l.id === id)?.name)
              .filter(Boolean)
              .join(', ');

            return (
              <div 
                key={member.id} 
                className={`bg-white rounded-[2.5rem] p-8 shadow-xl shadow-sk_slate/5 border-b-8 transition-all duration-300 hover:-translate-y-2 group ${getColorClass(index)}`}
              >
                 <div className="relative w-32 h-32 mx-auto mb-6">
                   <div className={`absolute inset-0 rounded-full opacity-20 scale-110 group-hover:scale-125 transition-transform ${getBgClass(index)}`}></div>
                   <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md relative z-10">
                     {member.imageUrl ? (
                       <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                         <Smile size={48} className="text-gray-300" />
                       </div>
                     )}
                   </div>
                   {/* Fun badge */}
                   <div className={`absolute bottom-0 right-0 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-white shadow-sm z-20 ${getBgClass(index)}`}>
                      <User size={16} strokeWidth={3} />
                   </div>
                 </div>

                 <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-sk_teal transition-colors">{member.name}</h3>
                    <span className="inline-block bg-gray-50 px-3 py-1 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-wide mb-6">{member.role}</span>

                    <div className="w-full border-t border-dashed border-gray-100 mb-4"></div>

                    <p className="text-xs text-gray-500 font-medium flex items-center justify-center gap-2">
                       {locationNames}
                    </p>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
