import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);

  // Helper to split text into words wrapped in spans for animation
  const splitTextToSpans = (text: string, baseClass: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.3em] align-top">
        <span className={`inline-block ${baseClass} word-inner`}>{word}</span>
      </span>
    ));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words1 = text1Ref.current?.querySelectorAll('.word-inner');
      const words2 = text2Ref.current?.querySelectorAll('.word-inner');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse',
        }
      });

      if (words1 && words1.length > 0) {
        tl.from(words1, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power4.out',
        });
      }

      if (words2 && words2.length > 0) {
        tl.from(words2, {
          yPercent: 100,
          opacity: 0,
          color: '#FF5500', // start orange and transition to target color if needed
          stagger: 0.08,
          duration: 1,
          ease: 'power4.out',
        }, "-=0.4");
      }
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-40 px-4 sm:px-6 bg-[#050506] relative"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12 md:gap-20">
        
        <p 
          ref={text1Ref}
          className="text-3xl md:text-5xl lg:text-6xl font-space font-medium tracking-tight text-ash/80 leading-tight max-w-4xl"
        >
          {splitTextToSpans("La mayoría construye webs para tener presencia digital.", "text-ash/60")}
        </p>

        <p 
          ref={text2Ref}
          className="text-4xl md:text-6xl lg:text-7xl font-space font-bold tracking-tight text-bone leading-[1.1] max-w-5xl"
        >
          {splitTextToSpans("Nosotros construimos activos digitales diseñados para ", "text-bone")}
          {splitTextToSpans("dominar tu mercado.", "font-syne italic text-[#FF5500] text-glow")}
        </p>
        
      </div>
    </section>
  );
}
