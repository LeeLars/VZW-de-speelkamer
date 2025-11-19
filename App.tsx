import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Opvang } from './pages/Opvang';
import { Locaties } from './pages/Locaties';
import { Team } from './pages/Team';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { DataProvider } from './context/DataContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/opvang" element={<Opvang />} />
            <Route path="/locaties" element={<Locaties />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;