import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Activity, Calendar } from 'lucide-react';

const ImpactCalculator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const metrics = [
    { label: 'Velocidad de carga', value: '<400ms', color: 'text-green-400' },
    { label: 'Tasa de conversión', value: '+34%', color: 'text-[#FF5500]' },
    { label: 'Retención visual', value: 'x2.5', color: 'text-purple-400' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.metric-card');
      if (cards.length === 0) return;

      const tl = gsap.timeline({ repeat: -1 });

      cards.forEach((card) => {
        
        // Show current card
        tl.to(card, { y: 0, opacity: 1, scale: 1, zIndex: 10, duration: 0.8, ease: 'back.out(1.7)' })
          // Wait 2.7s (total 3.5s cycle)
          .to(card, { duration: 2.7 })
          // Push it back and fade
          .to(card, { y: -20, opacity: 0, scale: 0.95, zIndex: 1, duration: 0.5, ease: 'power2.inOut' }, ">")
          // Reset for next cycle
          .set(card, { y: 20 });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-64 bg-titanium rounded-2xl border border-glass p-6 flex flex-col items-center justify-center overflow-hidden group">
      <div className="absolute top-4 left-4 flex items-center gap-2 text-bone/50 text-sm font-space">
        <Activity className="w-4 h-4" /> Diagnóstico
      </div>
      <div className="relative w-full max-w-[240px] h-32 mt-6 perspective-[1000px]">
        {metrics.map((m, i) => (
          <div 
            key={i} 
            className="metric-card absolute inset-0 bg-ash/50 backdrop-blur-md rounded-xl border border-white/10 p-5 flex flex-col justify-center shadow-2xl"
            style={{ opacity: 0, transform: 'translateY(20px) scale(0.95)' }}
          >
            <span className="text-xs text-bone/60 font-mono uppercase tracking-wider mb-1">{m.label}</span>
            <span className={`text-3xl font-space font-bold ${m.color}`}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TelemetryTerminal = () => {
  const [text, setText] = useState('');
  const textRef = useRef<HTMLSpanElement>(null);
  
  const commands = [
    "> Auditando velocidad de carga...",
    "> Eliminando fricción en la UI...",
    "> Desplegando arquitectura en Vercel...",
    "> Sistema optimizado. Listo."
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {});
    
    // Custom typewriter effect using GSAP TextPlugin is preferred, but without it we can use simple JS intervals within GSAP timeline context or raw JS.
    let currentCmd = 0;
    let currentChar = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const fullTxt = commands[currentCmd];
      
      if (isDeleting) {
        setText(fullTxt.substring(0, currentChar - 1));
        currentChar--;
      } else {
        setText(fullTxt.substring(0, currentChar + 1));
        currentChar++;
      }

      let typeSpeed = isDeleting ? 30 : 80;

      if (!isDeleting && currentChar === fullTxt.length) {
        typeSpeed = 2000; // pause at end
        isDeleting = true;
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentCmd = (currentCmd + 1) % commands.length;
        typeSpeed = 500; // pause before next
      }

      timeout = setTimeout(type, typeSpeed + (Math.random() * 30));
    };

    timeout = setTimeout(type, 1000);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-[#050506] rounded-2xl border border-glass p-6 h-64 flex flex-col relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex items-center gap-2 border border-[#FF5500]/30 bg-[#FF5500]/10 px-2 py-1 rounded text-[10px] font-mono text-[#FF5500]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse"></div>
          LIVE ENGINE
        </div>
      </div>
      <div className="flex-1 font-mono text-sm md:text-base text-bone/80 flex items-start">
        <span ref={textRef}>{text}</span>
        <span className="w-2.5 h-5 bg-[#FF5500] ml-1 animate-pulse"></span>
      </div>
    </div>
  );
};

const BookingModule = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const [activeDay, setActiveDay] = useState(2); // 'X' default

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simulate ghost cursor movement and clicking
      const cursor = document.createElement('div');
      cursor.className = 'w-6 h-6 bg-white/20 rounded-full absolute pointer-events-none z-50 backdrop-blur-[2px] border border-white/40 shadow-lg';
      cursor.style.top = '120px';
      cursor.style.left = '40px';
      
      const el = containerRef.current;
      if (!el) return;
      el.appendChild(cursor);

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      
      // Move to Thursday (index 3)
      tl.to(cursor, { x: 140, y: -45, duration: 1.5, ease: 'power2.inOut', delay: 1 })
        // Simulate press
        .to(cursor, { scale: 0.6, duration: 0.15 })
        .call(() => setActiveDay(3))
        .to(cursor, { scale: 1, duration: 0.15 })
        // Move away
        .to(cursor, { x: 220, y: 50, opacity: 0, duration: 1, ease: 'power2.in' })
        // Reset
        .set(cursor, { x: 0, y: 0, opacity: 1 })
        .call(() => setActiveDay(2));

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-titanium rounded-2xl border border-glass p-6 h-64 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center gap-2 text-bone/50 text-sm font-space mb-4">
        <Calendar className="w-4 h-4" /> Reserva Inmediata
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-space text-bone">Septiembre 2026</span>
        </div>
        <div className="flex justify-between gap-1 mt-4">
          {days.map((d, i) => (
            <div 
              key={i}
              onClick={() => setActiveDay(i)}
              className={`w-8 h-10 rounded-md flex items-center justify-center text-xs font-mono font-medium cursor-pointer transition-all duration-300
                ${activeDay === i 
                  ? 'bg-[#FF5500] text-white shadow-[0_4px_15px_rgba(255,85,0,0.4)] scale-110' 
                  : 'bg-ash text-bone/40 hover:bg-ash/80'
                }
              `}
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-carbon rounded-lg border border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-bone/40 font-mono">10:00 AM - EST</span>
          <span className="text-sm text-[#FF5500] font-medium font-space">Horario reservado</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse"></div>
      </div>
    </div>
  );
};

export default function Features() {
  return (
    <section id="sistema" className="py-32 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl font-space font-bold text-bone mb-4">
          Artefactos de <span className="font-syne italic text-[#FF5500]">Software</span>
        </h2>
        <p className="text-bone/60 max-w-xl text-lg">
          No diseñamos "páginas". Construimos herramientas interactivas que miden, optimizan y convierten de forma autónoma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImpactCalculator />
        <TelemetryTerminal />
        <BookingModule />
      </div>
    </section>
  );
}
