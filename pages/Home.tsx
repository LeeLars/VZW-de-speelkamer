
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MapPin, BookOpen, Calendar, Star, Smile } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Home: React.FC = () => {
  return (
    <div className="space-y-12 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-[#fcfdfc] pt-12 pb-32 lg:pt-20 lg:pb-48">
        {/* Playful Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-sk_mint/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-96 h-96 bg-sk_yellow/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-96 bg-sk_pink/10 rounded-full blur-[100px] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-block bg-white border-2 border-sk_yellow px-4 py-1.5 rounded-full text-sm font-bold text-yellow-700 mb-6 shadow-sm transform -rotate-2">
              👋 Welkom bij VZW De Speelkamer!
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-[1.1] mb-8">
              De kinderopvang <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sk_teal to-sk_mint">gelegen</span> in <br/>
              hartje Brugge
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed font-light">
              Een tweede thuis waar spelen, leren en groeien hand in hand gaan. Voor alle kinderen van 2,5 tot 12 jaar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/opvang"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-sk_teal text-white font-bold text-lg hover:bg-[#3d94a5] transition-all shadow-[0_8px_20px_-6px_rgba(74,177,196,0.5)] hover:shadow-[0_12px_25px_-8px_rgba(74,177,196,0.6)] hover:-translate-y-1"
              >
                Ontdek ons aanbod
              </Link>
              <Link
                to="/opvang#kampen"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-sk_teal border-2 border-sk_teal/20 font-bold text-lg hover:border-sk_teal hover:bg-sk_teal/5 transition-all hover:-translate-y-1"
              >
                Bekijk vakantiekampen
              </Link>
            </div>
          </div>
          
          {/* Hero Images Grid */}
          <div className="flex-1 relative hidden md:block">
             <div className="grid grid-cols-2 gap-4 transform rotate-3 scale-90 lg:scale-100">
                <div className="space-y-4 mt-12">
                   {/* Image: Kids playing - Updated to local file */}
                   <img src="/images/opvang001.jpg" alt="Onze School" className="rounded-[2rem] shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-500 w-full h-80 object-cover" />
                   <div className="bg-sk_yellow p-6 rounded-[2rem] shadow-lg transform -rotate-3 flex items-center justify-center">
                      <Smile size={48} className="text-white" />
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="bg-sk_pink p-6 rounded-[2rem] shadow-lg transform rotate-2 text-white font-bold text-xl text-center">
                     Spelend <br/> Leren
                   </div>
                   {/* Image: Learning/Reading */}
                   <img src="/images/opvang006.jpg" alt="Leren" className="rounded-[2rem] shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-500 w-full h-80 object-cover" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Cards - Playful Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Teal */}
          <div className="group bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50 border-b-4 border-b-sk_teal hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-sk_teal/10 rounded-xl flex items-center justify-center mb-6 text-sk_teal group-hover:bg-sk_teal group-hover:text-white transition-all">
              <Heart size={28} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Voor- & Naschools</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Elke dag staan we klaar van 07:00 tot 19:00. Een veilige haven voor en na schooltijd.
            </p>
            <Link to="/opvang" className="inline-flex items-center gap-2 text-sk_teal font-bold group-hover:gap-3 transition-all bg-sk_teal/10 px-4 py-2 rounded-xl hover:bg-sk_teal hover:text-white">
              Meer info <ArrowRight size={18} />
            </Link>
          </div>

          {/* Card 2 - Yellow */}
          <div className="group bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50 border-b-4 border-b-sk_yellow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-sk_yellow/10 rounded-xl flex items-center justify-center mb-6 text-yellow-700 group-hover:bg-sk_yellow group-hover:text-yellow-900 transition-all">
              <Calendar size={28} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Vakantiekampen & Vrije dagen</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Vakantie? Studiedag? Wij zorgen voor een dag vol avontuur, spel en plezier!
            </p>
            <Link to="/opvang#kampen" className="inline-flex items-center gap-2 text-yellow-700 font-bold group-hover:gap-3 transition-all bg-sk_yellow/10 px-4 py-2 rounded-xl hover:bg-sk_yellow hover:text-yellow-900">
              Kalender bekijken <ArrowRight size={18} />
            </Link>
          </div>

          {/* Card 3 - Pink */}
          <div className="group bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50 border-b-4 border-b-sk_pink hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-sk_pink/10 rounded-xl flex items-center justify-center mb-6 text-pink-700 group-hover:bg-sk_pink group-hover:text-white transition-all">
              <BookOpen size={28} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Studie-aanbod</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Woensdagnamiddag en tijdens vakanties bieden we studieondersteuning aan.
            </p>
            <Link to="/opvang#studie" className="inline-flex items-center gap-2 text-pink-700 font-bold group-hover:gap-3 transition-all bg-sk_pink/10 px-4 py-2 rounded-xl hover:bg-sk_pink hover:text-white">
              Ontdek meer <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us / USPs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-gray-800 mb-4">Waarom kiezen voor De Speelkamer?</h2>
             <div className="w-24 h-2 bg-sk_teal/20 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Centraal in Brugge', desc: 'Makkelijk bereikbaar & dichtbij.', icon: MapPin, bg: 'bg-sk_mint/20', color: 'text-green-800' },
              { title: 'Warme sfeer', desc: 'Een klein en vertrouwd team.', icon: Heart, bg: 'bg-sk_pink/20', color: 'text-red-800' },
              { title: 'Educatief sterk', desc: 'Spelend leren staat centraal.', icon: BookOpen, bg: 'bg-sk_yellow/20', color: 'text-yellow-800' },
              { title: 'Goede partners', desc: 'Nauwe band met de scholen.', icon: Star, bg: 'bg-sk_teal/20', color: 'text-teal-800' },
            ].map((usp, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group p-6 rounded-3xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className={`mb-6 w-20 h-20 rounded-full ${usp.bg} flex items-center justify-center ${usp.color} group-hover:scale-110 transition-transform`}>
                  <usp.icon size={32} strokeWidth={2} />
                </div>
                <h4 className="font-bold text-xl text-gray-800 mb-2">{usp.title}</h4>
                <p className="text-gray-500 font-medium">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Short - Playful Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-sk_mint/10 rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
           {/* Decorative circle */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-sk_mint/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>

           <div className="flex-1 relative z-10 order-2 md:order-1">
              <div className="relative">
                 <div className="absolute inset-0 bg-sk_yellow rounded-[2rem] rotate-3 transform translate-x-2 translate-y-2"></div>
                 {/* Image: Team photo */}
                 <img src="/images/team.jpg" alt="Team" className="relative rounded-[2rem] shadow-lg w-full border-4 border-white" />
              </div>
           </div>
           <div className="flex-1 relative z-10 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Samen groeien & bloeien</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                VZW De Speelkamer werkt nauw samen met VBS De Frères, Sint-Andreas en Het Kleurenpalet.
                Ons doel is om een naadloze overgang te bieden tussen school en vrije tijd.
              </p>
              <Link to="/team" className="inline-block bg-white text-sk_teal border-2 border-sk_teal px-8 py-3 rounded-full font-bold hover:bg-sk_teal hover:text-white transition-colors shadow-sm">
                Ontmoet ons team
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};
