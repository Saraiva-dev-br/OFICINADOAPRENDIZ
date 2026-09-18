import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  ArrowUpRight, 
  Building2, 
  TrendingUp, 
  MapPin, 
  Globe,
  Award
} from 'lucide-react';
import { NATIONAL_METRICS, REGIONAL_METRICS } from '../data/siteData';

export const ResultsSection: React.FC = () => {
  const [viewScope, setViewScope] = useState<'teresina' | 'brasil'>('teresina');

  return (
    <section id="resultados" className="py-8 md:py-12 bg-[#17081d] text-white relative overflow-hidden border-b border-[#300f3a]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#812392]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#531062] border border-[#812392] text-[#ffc928] text-xs font-black tracking-wider uppercase mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>RESULTADOS COMPROVADOS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Uma rede sólida que aproxima talentos e oportunidades.
            </h2>
            <p className="text-[#d7a8df] text-sm sm:text-base mt-1.5 max-w-2xl">
              Confira os números consolidados que refletem a dedicação da nossa equipe em transformar vidas pelo trabalho.
            </p>
          </div>

          {/* Scope Toggle Tabs */}
          <div className="flex items-center p-1 bg-[#23092c] border border-[#531062] rounded-xl self-start md:self-auto">
            <button
              onClick={() => setViewScope('teresina')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black rounded-lg transition ${
                viewScope === 'teresina'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-sm'
                  : 'text-[#d7a8df] hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Teresina - PI (1 ano)</span>
            </button>
            <button
              onClick={() => setViewScope('brasil')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black rounded-lg transition ${
                viewScope === 'brasil'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-sm'
                  : 'text-[#d7a8df] hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Rede Brasil (15+ anos)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        {viewScope === 'teresina' ? (
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#ffc928] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#ffc928]" />
              <span>Impacto em um ano construído perto de nós · Teresina, Piauí</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              
              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-4 sm:p-5 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#ffc928] tracking-tight mb-0.5">
                  {REGIONAL_METRICS.resumes}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#e9dfea]">
                  {REGIONAL_METRICS.resumesLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-4 sm:p-5 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-3">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#ffc928] tracking-tight mb-0.5">
                  {REGIONAL_METRICS.opportunities}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#e9dfea]">
                  {REGIONAL_METRICS.opportunitiesLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-4 sm:p-5 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-3">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#ffc928] tracking-tight mb-0.5">
                  {REGIONAL_METRICS.referrals}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#e9dfea]">
                  {REGIONAL_METRICS.referralsLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#ffc928] rounded-2xl p-4 sm:p-5 hover:border-white transition duration-300 shadow-md ring-2 ring-[#ffc928]/40">
                <div className="w-10 h-10 rounded-xl bg-[#ffc928] text-[#28102d] flex items-center justify-center mb-3 shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-0.5">
                  {REGIONAL_METRICS.hires}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#ffc928]">
                  {REGIONAL_METRICS.hiresLabel}
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#ffc928] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#ffc928]" />
              <span>Resultados consolidados da rede parceira · 10 estados do Brasil</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              
              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-4 sm:p-5 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#ffc928] tracking-tight mb-0.5">
                  {NATIONAL_METRICS.resumes}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#e9dfea]">
                  {NATIONAL_METRICS.resumesLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-4 sm:p-5 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-3">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#ffc928] tracking-tight mb-0.5">
                  {NATIONAL_METRICS.opportunities}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#e9dfea]">
                  {NATIONAL_METRICS.opportunitiesLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#7b1a90] rounded-2xl p-4 sm:p-5 hover:border-[#ffc928] transition duration-300 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#23092c] border border-[#812392] text-[#ffc928] flex items-center justify-center mb-3">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#ffc928] tracking-tight mb-0.5">
                  {NATIONAL_METRICS.referrals}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#e9dfea]">
                  {NATIONAL_METRICS.referralsLabel}
                </div>
              </div>

              <div className="bg-[#531062] border border-[#ffc928] rounded-2xl p-4 sm:p-5 hover:border-white transition duration-300 shadow-md ring-2 ring-[#ffc928]/40">
                <div className="w-10 h-10 rounded-xl bg-[#ffc928] text-[#28102d] flex items-center justify-center mb-3 shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-0.5">
                  {NATIONAL_METRICS.hires}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#ffc928]">
                  {NATIONAL_METRICS.hiresLabel}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
