import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useMagneticHover(strength = 0.5) {
  const ref = useRef<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = el.getBoundingClientRect();
        
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        xTo(x * strength);
        yTo(y * strength);
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);

      return () => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      };
    }, ref);

    return () => ctx.revert();
  }, [strength]);

  return ref;
}
