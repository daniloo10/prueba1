import { Check } from 'lucide-react';
import { useMagneticHover } from '../hooks/useMagneticHover';

const plans = [
  {
    name: "Landing MVP",
    price: "Desde 1.5k",
    timeline: "1 Semana",
    description: "Lanzamiento rápido, conversion-first para testear ofertas.",
    features: [
      "Diseño UI UX Alta Conversión",
      "Desarrollo React / Vite",
      "Optimizaciones Core Web Vitals",
      "Integración Básica (Analytics)",
      "Soporte 15 días"
    ],
    highlight: false
  },
  {
    name: "Full Web Engine",
    price: "Desde 3.5k",
    timeline: "3-4 Semanas",
    description: "El instrumento digital completo para dominar tu sector.",
    features: [
      "Diseño de Marca & Sistema UI",
      "Animaciones GSAP Avanzadas",
      "Arquitectura Multi-página",
      "Integraciones Nativas (Stripe, CRM)",
      "Telemetría y Dashboards",
      "Soporte Prioritario 3 meses"
    ],
    highlight: true
  },
  {
    name: "Custom Architecture",
    price: "Custom",
    timeline: "2+ Meses",
    description: "Plataformas complejas y sistemas web a medida.",
    features: [
      "Arquitectura Frontend Compleja",
      "Sistemas de Automatización Custom",
      "Bases de Datos & Backend API",
      "Escalabilidad Serverless",
      "Mantenimiento Continuo"
    ],
    highlight: false
  }
];

export default function Pricing() {
  const btnRefs = [
    useMagneticHover(0.2),
    useMagneticHover(0.2),
    useMagneticHover(0.2)
  ];

  return (
    <section id="inversion" className="py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      
      <div className="mb-20 text-center">
        <h2 className="text-3xl md:text-5xl font-space font-bold text-bone mb-4">
          Inversión / <span className="font-syne italic text-[#FF5500]">Compromiso</span>
        </h2>
        <p className="text-bone/60 max-w-xl mx-auto">Transparencia radical. Elige el motor que tu negocio necesita.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {plans.map((plan, i) => (
          <div 
            key={plan.name}
            className={`relative rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2
              ${plan.highlight 
                ? 'bg-titanium border border-[#FF5500]/50 shadow-[0_0_40px_rgba(255,85,0,0.1)] py-12' 
                : 'bg-carbon border border-glass hover:bg-titanium/50'
              }
            `}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF5500] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(255,85,0,0.5)]">
                Recomendado
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-space font-bold text-bone mb-2">{plan.name}</h3>
              <p className="text-sm font-mono text-ash mb-4">⏱ {plan.timeline}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className={`text-4xl font-space font-bold tracking-tight ${plan.highlight ? 'text-[#FF5500]' : 'text-bone'}`}>
                  {plan.price}
                </span>
                {plan.price !== "Custom" && <span className="text-bone/40 text-sm">/proyecto</span>}
              </div>
              <p className="text-bone/60 text-sm">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-bone/80">
                  <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-[#FF5500]' : 'text-bone/40'}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              ref={btnRefs[i] as any}
              className={`w-full py-4 rounded-xl font-space font-bold text-sm transition-all duration-300
                ${plan.highlight 
                  ? 'bg-[#FF5500] text-white shadow-[0_0_20px_rgba(255,85,0,0.3)] hover:shadow-[0_0_30px_rgba(255,85,0,0.5)]' 
                  : 'bg-titanium border border-glass text-bone hover:bg-white hover:text-carbon'
                }
              `}
            >
              Seleccionar Plan
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
