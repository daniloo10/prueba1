import React, { useState } from 'react';
import { X, Building2, Globe, TrendingUp, AlertTriangle, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: '',
    monthlyRevenue: '',
    mainProblem: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Debes iniciar sesión para agendar una auditoría.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('audit_requests')
        .insert([
          {
            user_id: user.id,
            company_name: formData.companyName,
            website_url: formData.websiteUrl,
            monthly_revenue: formData.monthlyRevenue,
            main_problem: formData.mainProblem,
          }
        ]);

      if (submitError) throw submitError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Ha ocurrido un error al enviar la solicitud.');
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
      <div className="relative w-full max-w-lg bg-carbon border border-[#FF5500]/20 rounded-2xl shadow-[0_0_50px_rgba(255,85,0,0.1)] overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-bone/50 hover:text-bone transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-space font-bold text-bone mb-2">
              Solicitud de Auditoría
            </h2>
            <p className="text-bone/60 text-sm">
              Analizaremos tu ecosistema actual para encontrar cuellos de botella en la conversión.
            </p>
          </div>

          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-[#FF5500]/20 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 size={32} className="text-[#FF5500]" />
              </div>
              <h3 className="text-xl font-bold text-bone">Solicitud Recibida</h3>
              <p className="text-bone/70 text-sm max-w-sm">
                Hemos registrado tu solicitud. Nuestro equipo revisará la información y se pondrá en contacto contigo pronto.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-bone rounded-lg transition-colors text-sm font-medium"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-bone/80 mb-1.5">
                  Nombre de la Empresa
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" size={18} />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-bone placeholder:text-bone/30 focus:outline-none focus:border-[#FF5500]/50 focus:ring-1 focus:ring-[#FF5500]/50 transition-all"
                    placeholder="Tu Empresa S.L."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-bone/80 mb-1.5">
                  URL del Sitio Web
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" size={18} />
                  <input
                    type="url"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-bone placeholder:text-bone/30 focus:outline-none focus:border-[#FF5500]/50 focus:ring-1 focus:ring-[#FF5500]/50 transition-all"
                    placeholder="https://www.tuempresa.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-bone/80 mb-1.5">
                  Facturación Mensual Aprox.
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" size={18} />
                  <select
                    name="monthlyRevenue"
                    value={formData.monthlyRevenue}
                    onChange={handleChange}
                    required
                    className="w-full bg-carbon border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-bone focus:outline-none focus:border-[#FF5500]/50 focus:ring-1 focus:ring-[#FF5500]/50 transition-all appearance-none"
                  >
                    <option value="" disabled>Selecciona un rango</option>
                    <option value="< $10k">Menos de $10,000</option>
                    <option value="$10k - $50k">$10,000 - $50,000</option>
                    <option value="$50k - $100k">$50,000 - $100,000</option>
                    <option value="> $100k">Más de $100,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-bone/80 mb-1.5">
                  Mayor problema de conversión actual
                </label>
                <div className="relative">
                  <AlertTriangle className="absolute left-3 top-3 text-bone/40" size={18} />
                  <textarea
                    name="mainProblem"
                    value={formData.mainProblem}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-bone placeholder:text-bone/30 focus:outline-none focus:border-[#FF5500]/50 focus:ring-1 focus:ring-[#FF5500]/50 transition-all resize-none"
                    placeholder="Tenemos mucho tráfico pero pocas ventas..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF5500] text-white font-semibold py-3 rounded-lg hover:bg-[#FF5500]/90 transition-all shadow-[0_0_15px_rgba(255,85,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  'Enviar Solicitud'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
