export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050506] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Status */}
        <div className="flex items-center gap-3 bg-carbon border border-glass px-4 py-2 rounded-lg font-mono text-xs">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          <span className="text-bone/80">Servidores: <span className="text-green-500 font-bold">100% Operativos</span></span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm font-space text-bone/50">
          <a href="#" className="hover:text-[#FF5500] transition-colors">Términos</a>
          <a href="#" className="hover:text-[#FF5500] transition-colors">Privacidad</a>
          <a href="#" className="hover:text-[#FF5500] transition-colors">Contacto</a>
        </div>

        {/* Copyright */}
        <div className="text-xs font-mono text-ash flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} ORANGE ENGINE //</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">Diseñado con precisión.</span>
        </div>

      </div>
    </footer>
  );
}
