
import React from 'react';
import { BookOpen, Languages, GraduationCap, CheckCircle2 } from 'lucide-react';

export const Studie: React.FC = () => {
  return (
    <div className="pb-16 bg-[#fcfdfc]">
      {/* Consistent Hero Header */}
      <div className="relative bg-[#fcfdfc] pt-12 pb-32 lg:pt-20 lg:pb-48 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-sk_pink/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-96 h-96 bg-sk_teal/10 rounded-full blur-3xl opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white border-2 border-sk_pink/20 px-4 py-1.5 rounded-full text-sm font-bold text-sk_pink mb-6 shadow-sm">
              Educatieve Ondersteuning
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Studie-aanbod
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Omdat elk kind op zijn eigen tempo leert. Wij bieden ondersteuning via taallessen, studiebegeleiding en bijles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 space-y-12">

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Taallessen */}
           <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-sk_slate/10 border-b-8 border-sk_mint flex flex-col hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 bg-sk_mint/20 rounded-2xl rotate-3 flex items-center justify-center mb-6 text-green-800">
                 <Languages size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Taallessen</h2>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                Op speelse wijze kennismaken met nieuwe talen. Voor kinderen die graag een extra uitdaging hebben.
              </p>
              <ul className="space-y-3 mb-8 text-gray-600 text-sm font-medium">
                 <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sk_teal" /> Spaans, Engels & Italiaans</li>
                 <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sk_teal" /> Kleine groepjes</li>
                 <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sk_teal" /> Focus op spreekdurf</li>
              </ul>
              <div className="mt-auto bg-gray-50 p-5 rounded-2xl text-sm text-gray-500 text-center border border-gray-100">
                 Inschrijven gebeurt per semester. Contacteer ons voor de startdata.
              </div>
           </div>

           {/* Studiebegeleiding */}
           <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-sk_slate/10 border-b-8 border-sk_yellow flex flex-col hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 bg-sk_yellow/20 rounded-2xl -rotate-2 flex items-center justify-center mb-6 text-yellow-800">
                 <BookOpen size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Studiebegeleiding</h2>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                Leren leren staat centraal. We helpen met plannen, structureren en het zelfstandig maken van huiswerk.
              </p>
              <ul className="space-y-3 mb-8 text-gray-600 text-sm font-medium">
                 <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sk_teal" /> Rustige omgeving</li>
                 <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sk_teal" /> Vanaf 1ste leerjaar</li>
                 <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sk_teal" /> 4 dagen per week (ma-do)</li>
              </ul>
              <div className="mt-auto bg-gray-50 p-5 rounded-2xl text-sm text-gray-500 text-center border border-gray-100">
                 Vrije inloop mogelijk voor kinderen in de naschoolse opvang.
              </div>
           </div>

           {/* Bijles */}
           <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-sk_slate/10 border-b-8 border-sk_rose flex flex-col hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 bg-sk_rose/20 rounded-2xl rotate-2 flex items-center justify-center mb-6 text-red-800">
                 <GraduationCap size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Bijles op maat</h2>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                Heeft je kind moeite met een specifiek vak? Wij bieden individuele begeleiding in overleg met de klastitularis.
              </p>
              <ul className="space-y-3 mb-8 text-gray-600 text-sm font-medium">
                 <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sk_teal" /> 1-op-1 begeleiding</li>
                 <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sk_teal" /> Nauw overleg met school</li>
                 <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-sk_teal" /> Op afspraak</li>
              </ul>
              <div className="mt-auto">
                 <a
                   href="https://docs.google.com/forms"
                   target="_blank"
                   rel="noreferrer"
                   className="block text-center w-full py-3.5 rounded-2xl bg-sk_teal text-white font-bold hover:bg-[#3d94a5] transition-colors shadow-lg shadow-sk_teal/20"
                 >
                   Aanvraag indienen
                 </a>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
