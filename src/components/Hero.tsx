import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useMagneticHover } from '../hooks/useMagneticHover';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  
  const primaryBtnRef = useMagneticHover(0.3);
  const secondaryBtnRef = useMagneticHover(0.2);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
      
      tl.from(badgeRef.current, { y: 30, opacity: 0, delay: 0.5 })
        .from(titleRef.current?.children || [], { 
          y: 60, 
          opacity: 0, 
          stagger: 0.15, 
          duration: 1.4 
        }, "-=0.8")
        .from(subtitleRef.current, { y: 30, opacity: 0 }, "-=1")
        .from(actionsRef.current, { y: 20, opacity: 0 }, "-=0.9");
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-20 px-4 sm:px-6"
    >
      {/* Background Gradient & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.1)_0%,rgba(10,10,12,1)_60%)]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Availability Badge */}
        <div 
          ref={badgeRef}
          className="flex items-center gap-2 border border-glass bg-titanium/50 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse shadow-[0_0_8px_#FF5500]"></div>
          <span className="text-xs font-mono text-bone tracking-widest uppercase">
            Disponibilidad: 2 Proyectos / Q3
          </span>
        </div>

        {/* Headlines */}
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight font-space font-bold mb-6"
        >
          <span className="block text-bone">Diseñamos el</span>
          <span className="block font-syne italic text-[#FF5500] mt-2">
            Algoritmo de Conversión
          </span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-bone/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Landing pages e ingeniería web que transforman tráfico disperso en clientes de alto valor. Cero plantillas. Cero código basura.
        </p>

        {/* Actions */}
        <div ref={actionsRef} className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            ref={primaryBtnRef as any}
            className="group relative flex items-center justify-center gap-3 bg-[#FF5500] text-white font-space font-semibold px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,85,0,0.25)] hover:shadow-[0_0_40px_rgba(255,85,0,0.4)] transition-all overflow-hidden"
          >
            <span className="relative z-10">Agendar Auditoría Técnica</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
          
          <button 
            ref={secondaryBtnRef as any}
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-glass bg-titanium/30 hover:bg-titanium/80 text-bone transition-all font-space"
          >
            <span>Ver Arquitectura //</span>
          </button>
        </div>

      </div>
    </section>
  );
}
