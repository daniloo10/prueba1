import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Layers, Sparkles, Workflow } from 'lucide-react';

const cardsData = [
  {
    id: 1,
    title: 'Arquitectura Core',
    subtitle: 'Rendimiento Extremo',
    description: 'Código React/Vite de bajo nivel, optimizado para cargar en <400ms. Infraestructura serverless que escala sin fricción.',
    icon: Layers,
    color: '#FF5500'
  },
  {
    id: 2,
    title: 'Estética Boutique',
    subtitle: 'Diseño Sensorial',
    description: 'Interfaces magnéticas con animaciones fluidas basadas en físicas (GSAP). Cada pixel está diseñado para comunicar autoridad y lujo digital.',
    icon: Sparkles,
    color: '#F4F4F6'
  },
  {
    id: 3,
    title: 'Sistemas de Automatización',
    subtitle: 'Motor de Ingresos',
    description: 'Integraciones nativas con Stripe, CRMs y webhooks para que tu web no solo informe, sino que califique y cierre ventas 24/7.',
    icon: Workflow,
    color: '#2A2A30' // or purple maybe, but sticking to palette
  }
];

export default function SystemArchive() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.system-card');
      
      // We want to pin the container and animate cards based on scroll progress
      // Typical stacking cards setup: 
      // Pin the section, and as we scroll, cards come up from bottom and previous cards scale down.

      cards.forEach((card, index) => {
        if (index === 0) return; // First card is already visible

        const prevCards = cards.slice(0, index);

        gsap.to(prevCards, {
          scale: 0.92 - (0.02 * index), // scale down cumulatively
          opacity: 0.4,
          filter: 'blur(8px)',
          yPercent: -10 * index,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom', // when current card top hits window bottom
            end: 'top top',      // until current card top hits window top
            scrub: true,
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="casos" className="relative bg-carbon py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-space font-bold text-bone mb-4">
            Archivo / <span className="font-syne italic text-[#FF5500]">Sistema</span>
          </h2>
          <p className="text-bone/60 max-w-xl mx-auto">La anatomía de nuestros activos digitales.</p>
        </div>

        <div className="relative">
          {cardsData.map((card, i) => (
            <div 
              key={card.id}
              className={`system-card sticky top-24 w-full h-[60vh] min-h-[400px] bg-titanium rounded-[2.5rem] border border-glass p-8 md:p-16 flex flex-col justify-between overflow-hidden shadow-2xl origin-top mb-12`}
              style={{ zIndex: i + 1 }}
            >
              {/* Background gradient hint */}
              <div 
                className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-[100px] pointer-events-none"
                style={{ backgroundColor: card.color }}
              />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-carbon/50 border border-white/5 flex items-center justify-center mb-8 backdrop-blur-md">
                  <card.icon className="w-8 h-8" style={{ color: card.color === '#2A2A30' ? '#F4F4F6' : card.color }} />
                </div>
                
                <p className="text-sm font-mono text-[#FF5500] uppercase tracking-widest mb-3">
                  0{i + 1} // {card.subtitle}
                </p>
                
                <h3 className="text-4xl md:text-6xl font-space font-bold text-bone mb-6">
                  {card.title}
                </h3>
                
                <p className="text-lg md:text-xl text-bone/60 max-w-2xl font-space leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Decorative elements representing code/ui/systems */}
              <div className="absolute bottom-8 right-8 text-ash/20 font-mono text-8xl font-bold opacity-30 select-none pointer-events-none">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
