import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMagneticHover } from '../hooks/useMagneticHover';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

interface NavbarProps {
  onOpenAuth?: () => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const btnRef = useMagneticHover(0.2);
  const { user, signOut } = useAuth();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <div className="bg-glass border border-[#FF5500]/20 rounded-full px-6 py-4 flex items-center justify-between shadow-[0_0_30px_rgba(255,85,0,0.05)]">
        
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse"></div>
          <span className="font-space font-bold tracking-tight text-bone text-lg group-hover:text-[#FF5500] transition-colors">
            ORANGE ENGINE //
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Sistema', 'Casos', 'Inversión'].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="text-sm font-medium text-bone/70 hover:text-bone transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-bone/70 hidden sm:inline-flex items-center gap-2">
                <User size={14} className="text-[#FF5500]" />
                {user.email}
              </span>
              <button 
                onClick={signOut}
                className="text-bone/50 hover:text-[#FF5500] transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-sm font-medium text-bone/90 hover:text-[#FF5500] transition-colors"
            >
              Iniciar Sesión
            </button>
          )}

          {/* CTA */}
          <button 
            ref={btnRef as any}
            className="bg-[#FF5500] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#FF5500]/90 transition-colors shadow-[0_0_15px_rgba(255,85,0,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Agendar Auditoría
          </button>
        </div>

      </div>
    </nav>
  );
}
