import React, { useState } from 'react';
import { 
  MapPin, 
  Building, 
  Phone, 
  Clock, 
  MessageCircle, 
  Navigation, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { STATES_PRESENCE, SITE_INFO } from '../data/siteData';

interface PresenceSectionProps {
  onSelectUnit: (unitId: string) => void;
}

export const PresenceSection: React.FC<PresenceSectionProps> = ({ onSelectUnit }) => {
  const [activeUf, setActiveUf] = useState<string>('PI');

  const selectedState = STATES_PRESENCE.find(s => s.uf === activeUf) || STATES_PRESENCE[0];

  return (
    <section id="presenca" className="py-8 md:py-12 bg-[#f7f3f8] border-b border-[#eadfeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-xs font-black tracking-wider uppercase mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#812392]" />
            <span>ONDE ESTAMOS · PRESENÇA NACIONAL & LOCAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#25102b] tracking-tight">
            Proximidade que faz a diferença no seu dia a dia.
          </h2>
          <p className="text-[#6c6570] text-sm sm:text-base mt-1.5">
            Atuamos em 10 estados brasileiros e contamos com dois polos presenciais modernos e bem localizados em Teresina - PI.
          </p>
        </div>

        {/* Highlight: Teresina Units Cards */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffc928]" />
            <h3 className="text-base sm:text-lg font-black text-[#25102b]">
              Polos de Atendimento em Teresina - Piauí
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {SITE_INFO.units.map((unit) => (
              <div
                key={unit.id}
                className="bg-white rounded-2xl border-2 border-[#eadfeb] hover:border-[#812392] p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#531062] text-[#ffc928] shadow-2xs">
                      {unit.badge}
                    </span>
                    <span className="text-xs font-bold text-[#716575]">
                      Teresina - PI
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-[#25102b] mb-1.5">
                    {unit.name}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#6c6570] mb-4 leading-relaxed">
                    {unit.description}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-[#eadfeb] text-xs text-[#4d3e51]">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#812392] shrink-0 mt-0.5" />
                      <span className="font-semibold leading-snug">{unit.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#716575] shrink-0" />
                      <span>{unit.hours}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#531062] shrink-0" />
                      <span className="font-semibold">WhatsApp / Central: {SITE_INFO.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-[#eadfeb] flex flex-col sm:flex-row items-center gap-2.5">
                  <a
                    href={unit.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-2 px-3.5 text-xs font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Conversar pelo WhatsApp da {unit.name}</span>
                  </a>

                  <button
                    onClick={() => onSelectUnit(unit.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2 px-3.5 text-xs font-black text-[#531062] bg-[#f1e2f4] hover:bg-[#efe3f2] border border-[#e5d9e8] rounded-xl transition"
                  >
                    <span>Cadastrar Currículo</span>
                    <ChevronRight className="w-4 h-4 text-[#812392]" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* National Presence Grid */}
        <div className="rounded-2xl bg-[#17081d] text-white p-4 sm:p-5 border border-[#381044] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#381044]">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#ffc928]">
                Rede Parceira Consolidada
              </span>
              <h4 className="text-lg sm:text-xl font-black text-white mt-0.5">
                Presença nos Polos Regionais pelo Brasil
              </h4>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-[#23092c] text-[#ffc928] rounded-full border border-[#531062] self-start sm:self-auto">
              Total de 10 Estados Atendidos
            </span>
          </div>

          {/* State Buttons Bar */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {STATES_PRESENCE.map((st) => (
              <button
                key={st.uf}
                onClick={() => setActiveUf(st.uf)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                  activeUf === st.uf
                    ? 'bg-[#ffc928] text-[#28102d] shadow-md'
                    : 'bg-[#23092c] text-[#d7a8df] hover:text-white hover:bg-[#381044]'
                }`}
              >
                <span>{st.uf}</span>
                <span className="ml-1 text-[10px] opacity-75 font-normal">({st.polos})</span>
              </button>
            ))}
          </div>

          {/* Selected State Details Card */}
          <div className="bg-[#23092c] rounded-xl p-3.5 sm:p-4 border border-[#531062] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-white">
                  {selectedState.name} ({selectedState.uf})
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#531062] text-[#ffc928] font-bold border border-[#812392]">
                  Capital: {selectedState.capital}
                </span>
              </div>
              <p className="text-xs text-[#e9dfea] mt-1 max-w-2xl">
                {selectedState.details}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-[#d7a8df] block font-medium">Polos de Atendimento</span>
                <span className="text-xl sm:text-2xl font-black text-[#ffc928]">{selectedState.polos}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
