import React, { useState } from 'react';
import { X, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // Supabase might require email confirmation, but for now we just close or show success
        onClose(); 
      }
    } catch (err: any) {
      setError(err.message || 'Ha ocurrido un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-carbon/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-carbon border border-[#FF5500]/20 rounded-2xl shadow-[0_0_50px_rgba(255,85,0,0.1)] overflow-hidden">
        
        {/* Header Tabs */}
        <div className="flex border-b border-white/5">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              isLogin 
                ? 'text-[#FF5500] border-b-2 border-[#FF5500]' 
                : 'text-bone/50 hover:text-bone'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              !isLogin 
                ? 'text-[#FF5500] border-b-2 border-[#FF5500]' 
                : 'text-bone/50 hover:text-bone'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-bone/50 hover:text-bone transition-colors"
        >
          <X size={20} />
        </button>

        {/* Form Content */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-space font-bold text-bone mb-2">
              {isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
            </h2>
            <p className="text-bone/60 text-sm">
              {isLogin 
                ? 'Accede al sistema para continuar donde lo dejaste.' 
                : 'Únete a la plataforma y comienza a transformar tu negocio.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-bone/80 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-bone placeholder:text-bone/30 focus:outline-none focus:border-[#FF5500]/50 focus:ring-1 focus:ring-[#FF5500]/50 transition-all"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-bone/80 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-bone placeholder:text-bone/30 focus:outline-none focus:border-[#FF5500]/50 focus:ring-1 focus:ring-[#FF5500]/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF5500] text-white font-semibold py-3 rounded-lg hover:bg-[#FF5500]/90 transition-all shadow-[0_0_15px_rgba(255,85,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                isLogin ? 'Acceder' : 'Crear Cuenta'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
