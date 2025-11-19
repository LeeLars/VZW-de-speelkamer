
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, MapPin, Mail, Phone, FileText, Lock, Heart, Puzzle, Clock, Calendar, BookOpen } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const NavItem: React.FC<{ to: string; label: string; active: boolean; onClick?: () => void }> = ({ to, label, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`px-5 py-2.5 rounded-full transition-all text-sm font-medium tracking-wide relative overflow-hidden group ${
      active
        ? 'bg-sk_teal text-white shadow-md transform -translate-y-0.5'
        : 'text-gray-600 hover:text-sk_teal hover:bg-sk_mint/20'
    }`}
  >
    <span className="relative z-10">{label}</span>
  </Link>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Hide header/footer on admin page for clean look
  const isAdmin = location.pathname === '/admin';

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
    setShowMegaMenu(true);
  };

  const handleMegaMenuLeave = () => {
    const timeout = setTimeout(() => {
      setShowMegaMenu(false);
    }, 200);
    setMegaMenuTimeout(timeout);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/opvang', label: 'Opvang & Studie' },
    { path: '/locaties', label: 'Locaties' },
    { path: '/team', label: 'Team' },
    { path: '/contact', label: 'Contact' },
  ];

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfc] font-sans selection:bg-sk_mint/50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            {/* Logo Area - Using custom image */}
            <Link to="/" className="flex items-center gap-3 group">
               <img 
                 src="/images/Logo-VZW-de-speelkamer.png" 
                 alt="Logo VZW De Speelkamer" 
                 className="h-16 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
               />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                // Special handling for Opvang & Studie with mega menu
                if (link.path === '/opvang') {
                  return (
                    <div
                      key={link.path}
                      className="relative"
                      onMouseEnter={handleMegaMenuEnter}
                      onMouseLeave={handleMegaMenuLeave}
                    >
                      <Link
                        to={link.path}
                        className={`px-5 py-2.5 rounded-full transition-all text-sm font-medium tracking-wide relative overflow-hidden group ${
                          location.pathname === link.path
                            ? 'bg-sk_teal text-white shadow-md transform -translate-y-0.5'
                            : 'text-gray-600 hover:text-sk_teal hover:bg-sk_mint/20'
                        }`}
                      >
                        <span className="relative z-10">{link.label}</span>
                      </Link>
                    </div>
                  );
                }
                return (
                  <NavItem
                    key={link.path}
                    to={link.path}
                    label={link.label}
                    active={location.pathname === link.path}
                  />
                );
              })}
              <a
                href={CONTACT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:rotate-12"
                aria-label="Facebook"
              >
                <Facebook size={20} strokeWidth={2} fill="currentColor" />
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-sk_mint/20 hover:text-sk_teal focus:outline-none transition-colors"
              >
                {isMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu for Opvang & Studie */}
        {showMegaMenu && (
          <div
            className="absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-40"
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-3 gap-6">
                {/* Voor- & Naschoolse Opvang */}
                <Link
                  to="/opvang"
                  onClick={() => setShowMegaMenu(false)}
                  className="group p-6 rounded-2xl hover:bg-sk_teal/5 transition-all duration-300 border-2 border-transparent hover:border-sk_teal/20"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-sk_teal/10 rounded-xl flex items-center justify-center text-sk_teal group-hover:bg-sk_teal group-hover:text-white transition-all">
                      <Clock size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-sk_teal transition-colors">
                      Voor- & Naschoolse opvang
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Dagelijkse opvang van 07:00 tot 19:00. Geen inschrijving nodig.
                  </p>
                </Link>

                {/* Kampen & Vrije Dagen */}
                <Link
                  to="/opvang#kampen"
                  onClick={() => setShowMegaMenu(false)}
                  className="group p-6 rounded-2xl hover:bg-sk_yellow/5 transition-all duration-300 border-2 border-transparent hover:border-sk_yellow/20"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-sk_yellow/10 rounded-xl flex items-center justify-center text-yellow-700 group-hover:bg-sk_yellow group-hover:text-yellow-900 transition-all">
                      <Calendar size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-yellow-700 transition-colors">
                      Kampen & Vrije Dagen
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Vakantiekampen en opvang tijdens pedagogische studiedagen.
                  </p>
                </Link>

                {/* Studie-aanbod */}
                <Link
                  to="/opvang#studie"
                  onClick={() => setShowMegaMenu(false)}
                  className="group p-6 rounded-2xl hover:bg-sk_pink/5 transition-all duration-300 border-2 border-transparent hover:border-sk_pink/20"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-sk_pink/10 rounded-xl flex items-center justify-center text-pink-700 group-hover:bg-sk_pink group-hover:text-white transition-all">
                      <BookOpen size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-700 transition-colors">
                      Studie aanbod
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Taallessen, studiebegeleiding en bijles op maat.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 shadow-xl absolute w-full left-0 top-24 animate-in slide-in-from-top-5">
            <div className="flex flex-col px-4 space-y-2">
              {navLinks.map((link) => (
                <NavItem
                  key={link.path}
                  to={link.path}
                  label={link.label}
                  active={location.pathname === link.path}
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
              <a
                href={CONTACT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 text-[#1877F2] font-bold bg-blue-50/50 rounded-full mt-2"
              >
                <Facebook size={18} fill="currentColor" /> Volg ons op Facebook
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow relative overflow-x-hidden">
        {children}
      </main>

      {/* Footer - Clean Rounded Design without SVG Wave */}
      <footer className="relative bg-white mt-24 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Col 1: Brand & About */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-sk_teal text-white rounded-lg flex items-center justify-center shadow-sm">
                    <Puzzle size={18} fill="currentColor" />
                 </div>
                 <h3 className="text-xl font-bold text-gray-800">De Speelkamer</h3>
              </div>
              <p className="text-gray-500 leading-relaxed font-light">
                Warme, educatieve opvang in het hart van Brugge. Verbonden aan VBS De Frères en samenwerkend met diverse partners om elk kind een tweede thuis te bieden.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-6 relative inline-block">
                Snel naar
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-sk_yellow rounded-full"></span>
              </h3>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link to="/opvang" className="text-gray-500 hover:text-sk_teal hover:pl-2 transition-all flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sk_mint"></span> Buitenschoolse Opvang
                  </Link>
                </li>
                <li>
                  <Link to="/opvang#kampen" className="text-gray-500 hover:text-sk_teal hover:pl-2 transition-all flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sk_yellow"></span> Vakantiekampen
                  </Link>
                </li>
                <li>
                  <Link to="/opvang#studie" className="text-gray-500 hover:text-sk_teal hover:pl-2 transition-all flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sk_pink"></span> Studiebegeleiding
                  </Link>
                </li>
                <li>
                   <a href={CONTACT_INFO.reglementUrl} className="text-gray-500 hover:text-sk_teal hover:pl-2 transition-all flex items-center gap-2">
                     <FileText size={14} strokeWidth={2} className="text-gray-400" /> Huishoudelijk reglement
                   </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-6 relative inline-block">
                Contact
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-sk_teal rounded-full"></span>
              </h3>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-start gap-3 text-gray-500 bg-gray-50 p-3 rounded-2xl">
                  <MapPin className="mt-0.5 flex-shrink-0 text-sk_teal" size={18} strokeWidth={2} />
                  <span>Nieuwstraat 2, 8000 Brugge</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 bg-gray-50 p-3 rounded-2xl">
                  <Mail className="flex-shrink-0 text-sk_pink" size={18} strokeWidth={2} />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-sk_teal transition-colors">{CONTACT_INFO.email}</a>
                </li>
                <li className="flex items-center gap-3 text-gray-500 bg-gray-50 p-3 rounded-2xl">
                  <Phone className="flex-shrink-0 text-sk_yellow" size={18} strokeWidth={2} />
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-sk_teal transition-colors">{CONTACT_INFO.phone}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs font-medium gap-4">
            <span>&copy; {new Date().getFullYear()} VZW De Speelkamer. Alle rechten voorbehouden.</span>
            <Link to="/admin" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-sk_teal transition-colors">
               <Lock size={12} /> Team Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
