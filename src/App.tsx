import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Manifesto from './components/Manifesto';
import SystemArchive from './components/SystemArchive';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Global ScrollTrigger setup or refresh if needed
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative min-h-screen bg-carbon overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Manifesto />
        <SystemArchive />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
