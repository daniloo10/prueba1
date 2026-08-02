import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Manifesto from './components/Manifesto';
import SystemArchive from './components/SystemArchive';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Global ScrollTrigger setup or refresh if needed
    ScrollTrigger.refresh();
  }, []);

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-carbon overflow-hidden">
        <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />
        <main>
          <Hero />
          <Features />
          <Manifesto />
          <SystemArchive />
          <Pricing />
        </main>
        <Footer />
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </AuthProvider>
  );
}

export default App;
