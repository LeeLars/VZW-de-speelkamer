
import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ActivityType, Activity } from '../types';
import { Calendar, MapPin, Clock, Euro, ExternalLink, AlertCircle, Star, BookOpen, CheckCircle2, Sandwich, ScanBarcode } from 'lucide-react';

// --- Components ---

const ActivityCard: React.FC<{ activity: Activity; locationName?: string }> = ({ activity, locationName }) => {
  const formatDateRange = () => {
    const start = new Date(activity.startDate);
    if (activity.endDate) {
      const end = new Date(activity.endDate);
      const startDay = start.getDate();
      const endDay = end.getDate();
      const month = start.toLocaleDateString('nl-BE', { month: 'short' });
      
      if (start.getMonth() === end.getMonth()) {
        return `${startDay}-${endDay} ${month}`;
      } else {
        const endMonth = end.toLocaleDateString('nl-BE', { month: 'short' });
        return `${startDay} ${month} - ${endDay} ${endMonth}`;
      }
    }
    return start.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md shadow-sk_slate/5 border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-xl hover:shadow-sk_teal/10 hover:-translate-y-1 transition-all duration-300 group">
      {/* Date Header - Most Prominent */}
      <div className={`px-5 py-4 ${
        activity.type === ActivityType.CAMP ? 'bg-sk_yellow/10' : 'bg-sk_pink/10'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} className={activity.type === ActivityType.CAMP ? 'text-yellow-700' : 'text-pink-700'} />
            <span className="text-lg font-bold text-gray-800">
              {formatDateRange()}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
            activity.type === ActivityType.CAMP 
              ? 'bg-sk_yellow/40 text-yellow-900' 
              : 'bg-sk_pink/40 text-pink-900'
          }`}>
            {activity.type === ActivityType.CAMP ? 'Kamp' : 'Vrije dag'}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-gray-700 mb-3 leading-tight">{activity.title}</h3>

        <div className="space-y-2 mb-4 flex-grow">
          {activity.hours && (
             <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock size={14} strokeWidth={2} className="text-sk_teal shrink-0" />
                <span>{activity.hours}</span>
             </div>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-600">
             <MapPin size={14} strokeWidth={2} className="text-sk_teal shrink-0" />
             <span>{locationName || 'De Frères'}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
           <a
             href={activity.googleFormUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="block w-full text-center bg-sk_teal text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#3d94a5] transition-colors shadow-sm flex items-center justify-center gap-1.5"
           >
             Inschrijven <ExternalLink size={12} />
           </a>
        </div>
      </div>
    </div>
  );
};

const StudyCard: React.FC<{
  title: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  footerText?: string;
  colorClass: string;
  iconColorClass: string;
  ctaLink?: string;
  borderColor: string;
}> = ({ title, icon: Icon, description, features, footerText, colorClass, iconColorClass, ctaLink, borderColor }) => (
  <div className={`bg-white rounded-[2.5rem] p-8 shadow-xl shadow-sk_slate/5 border-t-8 ${borderColor} flex flex-col h-full hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl`}>
    <div className={`w-16 h-16 ${colorClass} rounded-2xl rotate-3 flex items-center justify-center mb-8 ${iconColorClass} shadow-sm group-hover:rotate-12 transition-transform`}>
       <Icon size={32} strokeWidth={2} />
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
    <p className="text-gray-600 mb-8 flex-grow leading-relaxed font-light">
      {description}
    </p>
    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
      <ul className="space-y-3 text-gray-600 text-sm font-medium">
         {features.map((feat, i) => (
           <li key={i} className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-sk_teal shrink-0"></div> {feat}
           </li>
         ))}
      </ul>
    </div>
    <div className="mt-auto">
       {ctaLink ? (
         <a
           href={ctaLink}
           target="_blank"
           rel="noreferrer"
           className="block text-center w-full py-3.5 rounded-2xl bg-sk_teal text-white font-bold hover:bg-[#3d94a5] transition-colors shadow-md shadow-sk_teal/20"
         >
           Aanvraag indienen
         </a>
       ) : (
         <div className="bg-white border-2 border-dashed border-gray-200 p-4 rounded-2xl text-xs text-gray-500 font-medium text-center">
           {footerText}
         </div>
       )}
    </div>
  </div>
);

// --- Main Component ---

export const Opvang: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'school' | 'kampen' | 'studie'>('school');
  const { activities, locations, pricing } = useData();

  // Handle hash navigation
  useEffect(() => {
    if (location.hash === '#kampen') setActiveTab('kampen');
    else if (location.hash === '#studie') setActiveTab('studie');
    else setActiveTab('school');
  }, [location]);

  const futureActivities = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return activities
      .filter(a => new Date(a.endDate || a.startDate) >= now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [activities]);

  const camps = futureActivities.filter(a => a.type === ActivityType.CAMP);
  const freeDays = futureActivities.filter(a => a.type === ActivityType.FREE_DAY);

  return (
    <div className="pb-20 bg-[#fcfdfc]">
      {/* Consistent Hero Header */}
      <div className="relative bg-[#fcfdfc] pt-12 pb-32 lg:pt-20 lg:pb-48 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-sk_mint/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-96 h-96 bg-sk_yellow/20 rounded-full blur-3xl opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white border-2 border-sk_teal/20 px-4 py-1.5 rounded-full text-sm font-bold text-sk_teal mb-6 shadow-sm">
              Aanbod & Inschrijvingen
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Wat doen we vandaag?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Of het nu gaat om dagelijkse opvang, een spannend kamp of extra studiehulp: <br className="hidden md:block" />
            bij De Speelkamer zit je goed.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-2 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto border border-white">
          <button
            onClick={() => setActiveTab('school')}
            className={`flex-1 py-4 px-6 rounded-[1.5rem] text-base font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'school' 
                ? 'bg-sk_teal text-white shadow-lg shadow-sk_teal/20' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-sk_teal'
            }`}
          >
            <Clock size={20} /> Voor- & Naschools
          </button>
          <button
            onClick={() => setActiveTab('kampen')}
            className={`flex-1 py-4 px-6 rounded-[1.5rem] text-base font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'kampen' 
                ? 'bg-sk_yellow text-yellow-900 shadow-lg shadow-sk_yellow/20' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-sk_yellow'
            }`}
          >
            <Calendar size={20} /> Vakantiekampen & Vrije Dagen
          </button>
          <button
            onClick={() => setActiveTab('studie')}
            className={`flex-1 py-4 px-6 rounded-[1.5rem] text-base font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'studie' 
                ? 'bg-sk_pink text-white shadow-lg shadow-sk_pink/20' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-sk_pink'
            }`}
          >
            <BookOpen size={20} /> Studie-aanbod
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 animate-in fade-in duration-700 slide-in-from-bottom-8">
        
        {/* TAB 1: Voor- & Naschools */}
        {activeTab === 'school' && (
          <div className="space-y-12">
             
             {/* Hero & General Info */}
             <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Dagelijkse voor- en naschoolse opvang</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-6 font-light">
                  We staan elke dag paraat voor alle kinderen van VBS De Frères, Sint-Andreas en Het Kleurenpalet. 
                  Inschrijven voor de reguliere opvang is niet nodig; we werken met een handig scansysteem.
                </p>
                <div className="inline-flex items-center gap-2 bg-sk_mint/20 text-green-800 px-5 py-2.5 rounded-full font-bold text-sm border border-sk_mint/20">
                   <Clock size={16} /> Maandag t.e.m. Vrijdag: 07:00 - 19:00
                </div>
             </div>

             <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Left Col: Pricing Highlight */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-sk_slate/5 border border-white relative overflow-hidden hover:-translate-y-1 transition-transform duration-500">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sk_teal/5 to-sk_mint/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    
                    <div className="flex items-center gap-4 mb-8 relative z-10">
                       <div className="w-14 h-14 bg-sk_teal rounded-2xl rotate-3 flex items-center justify-center text-white shadow-lg shadow-sk_teal/20">
                          <Euro size={28} strokeWidth={2} />
                       </div>
                       <div>
                         <h3 className="text-2xl font-bold text-gray-800">Tarieven & Tijden</h3>
                         <p className="text-gray-500 text-sm">Transparant en eerlijk</p>
                       </div>
                    </div>

                    {/* Free Buffer Banner */}
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-8 flex items-start gap-3 relative z-10">
                       <div className="mt-1 text-green-600 bg-white p-1 rounded-full shadow-sm"><CheckCircle2 size={16} /></div>
                       <div>
                          <h4 className="font-bold text-green-800">Gratis Opvangmomenten</h4>
                          <p className="text-sm text-green-700 mt-1 leading-relaxed">
                             De opvang is <span className="font-bold underline decoration-green-400 decoration-2">gratis</span> 15 minuten voor het eerste belteken én 30 minuten na het laatste belteken.
                          </p>
                       </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                       <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4 group hover:bg-gray-50/50 p-2 rounded-xl transition-colors">
                          <div>
                             <p className="text-gray-600 font-bold text-sm uppercase tracking-wide">Standaard Tarief</p>
                             <p className="text-xs text-gray-400">(Voor- & Naschools)</p>
                          </div>
                          <div className="text-right">
                             <span className="block text-3xl font-bold text-gray-800">€ {pricing.standardRate.toFixed(2).replace('.', ',')}</span>
                             <span className="text-xs text-gray-500">per begonnen halfuur</span>
                          </div>
                       </div>

                       <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4 group hover:bg-gray-50/50 p-2 rounded-xl transition-colors">
                          <div>
                             <p className="text-gray-600 font-bold text-sm uppercase tracking-wide">Uurtarief</p>
                             <p className="text-xs text-gray-400">(Omgerekend)</p>
                          </div>
                          <div className="text-right">
                             <span className="block text-xl font-bold text-gray-400">€ {(pricing.standardRate * 2).toFixed(2).replace('.', ',')}</span>
                             <span className="text-xs text-gray-500">per uur</span>
                          </div>
                       </div>

                       <div className="flex items-center justify-between group hover:bg-gray-50/50 p-2 rounded-xl transition-colors">
                          <div>
                             <p className="text-gray-600 font-bold text-sm uppercase tracking-wide">Middagtoezicht</p>
                             <p className="text-xs text-gray-400">(Tijdens lunchpauze)</p>
                          </div>
                          <div className="text-right">
                             <span className="block text-xl font-bold text-sk_teal">€ {pricing.noonRate.toFixed(2).replace('.', ',')}</span>
                             <span className="text-xs text-gray-500">per middag</span>
                          </div>
                       </div>
                    </div>
                </div>

                {/* Right Col: Wednesday & Practical */}
                <div className="space-y-6">
                    
                    {/* Wednesday Card */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-white shadow-xl shadow-sk_slate/5 flex flex-col justify-center h-auto">
                       <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                          <span className="w-10 h-10 bg-sk_yellow/20 text-yellow-800 rounded-xl flex items-center justify-center"><Calendar size={20} /></span>
                          Woensdagnamiddag
                       </h3>
                       <div className="space-y-4 pl-4 border-l-2 border-sk_yellow/20 ml-4">
                          <div className="relative">
                             <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full border-4 border-white bg-sk_yellow"></div>
                             <span className="font-bold text-gray-800 block mb-1">12:00 - 13:00</span>
                             <span className="text-gray-500 text-sm">Samen eten op school</span>
                          </div>
                          <div className="relative">
                             <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full border-4 border-white bg-sk_yellow"></div>
                             <span className="font-bold text-gray-800 block mb-1">13:00 - 16:00</span>
                             <span className="text-gray-500 text-sm">Activiteiten (Sport, spel, crea)</span>
                          </div>
                          <div className="relative">
                             <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full border-4 border-white bg-sk_yellow"></div>
                             <span className="font-bold text-gray-800 block mb-1">16:00 - 19:00</span>
                             <span className="text-gray-500 text-sm">Naschoolse opvang</span>
                          </div>
                       </div>
                    </div>

                    {/* Practical Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                       <div className="bg-white p-6 rounded-[2rem] shadow-md border border-gray-50 hover:shadow-lg transition-all">
                          <div className="mb-3 text-sk_teal bg-sk_teal/10 w-10 h-10 rounded-full flex items-center justify-center"><Euro size={20} /></div>
                          <h4 className="font-bold text-gray-800 text-sm mb-1">Facturatie</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
                             Maandelijkse factuur via schoolrekening kan ook via domiciliëring. Betaling binnen 30 dagen.
                          </p>
                       </div>

                       <div className="bg-white p-6 rounded-[2rem] shadow-md border border-gray-50 hover:shadow-lg transition-all">
                          <div className="mb-3 text-sk_pink bg-sk_pink/10 w-10 h-10 rounded-full flex items-center justify-center"><ScanBarcode size={20} /></div>
                          <h4 className="font-bold text-gray-800 text-sm mb-1">Aanwezigheden</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
                             We werken met een scansysteem bij aankomst en vertrek.
                          </p>
                       </div>

                       <div className="bg-white p-6 rounded-[2rem] shadow-md border border-gray-50 hover:shadow-lg transition-all sm:col-span-2">
                          <div className="flex items-start gap-4">
                            <div className="text-red-500 bg-red-50 w-10 h-10 rounded-full flex items-center justify-center shrink-0"><AlertCircle size={20} /></div>
                            <div>
                              <h4 className="font-bold text-gray-800 text-sm mb-1">Geen inschrijving nodig</h4>
                              <p className="text-xs text-gray-500 leading-relaxed">
                                Voor de dagelijkse voor- en naschoolse opvang hoef je niet in te schrijven. Wel voor vakantiekampen en vrije dagen.
                              </p>
                            </div>
                          </div>
                       </div>
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* TAB 2: Vakantiekampen & Vrije Dagen */}
        {activeTab === 'kampen' && (
          <div className="space-y-8">
            {/* Filter Buttons */}
            <div className="flex justify-center">
              <div className="inline-flex bg-white rounded-2xl shadow-lg p-2 gap-2 border border-gray-100">
                <button
                  onClick={() => {
                    const element = document.getElementById('kampen-section');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 bg-sk_yellow/10 text-yellow-800 hover:bg-sk_yellow hover:text-yellow-900"
                >
                  <Calendar size={20} /> Vakantiekampen ({camps.length})
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById('vrije-dagen-section');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 bg-sk_pink/10 text-pink-800 hover:bg-sk_pink hover:text-white"
                >
                  <Star size={20} /> Vrije Dagen ({freeDays.length})
                </button>
              </div>
            </div>

            {/* Vakantiekampen */}
            <div id="kampen-section" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-sk_yellow/20 text-yellow-800 rounded-2xl flex items-center justify-center"><Calendar size={24} /></div>
                 <h2 className="text-3xl font-bold text-gray-800">Vakantiekampen</h2>
              </div>
              {camps.length === 0 ? (
                <div className="bg-gray-50 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">Er zijn momenteel geen vakantiekampen gepland. Kom later terug!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {camps.map(activity => (
                    <ActivityCard 
                      key={activity.id} 
                      activity={activity} 
                      locationName={locations.find(l => l.id === activity.locationId)?.name} 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Vrije Dagen */}
            <div id="vrije-dagen-section" className="scroll-mt-32 pt-8">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-sk_pink/20 text-pink-800 rounded-2xl flex items-center justify-center"><Star size={24} /></div>
                 <h2 className="text-3xl font-bold text-gray-800">Pedagogische Studiedagen & Vrije Dagen</h2>
              </div>
              {freeDays.length === 0 ? (
                <div className="bg-gray-50 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">Geen pedagogische studiedagen in het vooruitzicht.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {freeDays.map(activity => (
                    <ActivityCard 
                      key={activity.id} 
                      activity={activity} 
                      locationName={locations.find(l => l.id === activity.locationId)?.name} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Studie */}
        {activeTab === 'studie' && (
          <div>
             <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Studie aanbod op maat</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-6 font-light">
                  Omdat elk kind op zijn eigen tempo leert. Wij bieden ondersteuning via taallessen, studiebegeleiding en bijles.
                </p>
             </div>
             
             <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                <StudyCard 
                   title="Taallessen"
                   icon={BookOpen}
                   description="Op speelse wijze kennismaken met nieuwe talen. Voor kinderen die graag een extra uitdaging hebben en hun talenknobbel willen ontdekken."
                   features={['Spaans, Engels & Italiaans', 'Kleine groepjes (max 8)', 'Focus op spreekdurf']}
                   footerText="Inschrijven gebeurt per semester. Contacteer ons voor de startdata."
                   colorClass="bg-sk_mint/20"
                   iconColorClass="text-green-800"
                   borderColor="border-sk_mint"
                />
                <StudyCard 
                   title="Studiebegeleiding"
                   icon={Calendar}
                   description="Leren leren staat centraal. We helpen met plannen, structureren en het zelfstandig maken van huiswerk in een rustige omgeving."
                   features={['Rustige omgeving', 'Vanaf 1ste leerjaar', '4 dagen per week (ma-do)']}
                   footerText="Vrije inloop mogelijk voor kinderen in de naschoolse opvang."
                   colorClass="bg-sk_yellow/20"
                   iconColorClass="text-yellow-800"
                   borderColor="border-sk_yellow"
                />
                <StudyCard 
                   title="Bijles op maat"
                   icon={Star}
                   description="Heeft je kind moeite met een specifiek vak? Wij bieden individuele begeleiding in nauw overleg met de klastitularis."
                   features={['1-op-1 begeleiding', 'Nauw overleg met school', 'Op afspraak']}
                   ctaLink="https://docs.google.com/forms"
                   colorClass="bg-sk_pink/20"
                   iconColorClass="text-pink-800"
                   borderColor="border-sk_pink"
                />
             </div>
          </div>
        )}

      </div>
    </div>
  );
};
