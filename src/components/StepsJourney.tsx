import React from 'react';
import { 
  ClipboardList, 
  MessagesSquare, 
  ShieldCheck, 
  Stethoscope, 
  GraduationCap, 
  ChevronRight,
  Info,
  CheckCircle,
  Clock
} from 'lucide-react';
import { STEPS_DATA } from '../data/siteData';

const ICONS = [
  ClipboardList,
  MessagesSquare,
  ShieldCheck,
  Stethoscope,
  GraduationCap
];

export const StepsJourney: React.FC = () => {
  return (
    <section id="etapas" className="py-8 md:py-12 bg-white border-b border-[#eadfeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-xs font-black tracking-wider uppercase mb-2">
            <span>ETAPAS DO ENCAMINHAMENTO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#25102b] tracking-tight">
            Um caminho claro, etapa por etapa.
          </h2>
          <p className="text-[#6c6570] text-sm sm:text-base mt-2">
            Conheça o fluxo transparente e estruturado que faz parte do processo de encaminhamento para as oportunidades de trabalho.
          </p>
        </div>

        {/* Steps Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 relative">
          {STEPS_DATA.map((item, idx) => {
            const Icon = ICONS[idx] || ClipboardList;
            return (
              <div 
                key={item.step}
                className="relative bg-[#f7f3f8] hover:bg-white rounded-2xl border border-[#eadfeb] hover:border-[#812392] p-4 flex flex-col justify-between transition-all duration-300 group hover:shadow-lg"
              >
                {/* Step badge & icon */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-full bg-[#531062] text-[#ffc928] font-black text-xs flex items-center justify-center shadow-xs">
                      {item.step}
                    </span>
                    <div className="p-1.5 rounded-xl bg-white border border-[#eadfeb] text-[#812392] group-hover:bg-[#531062] group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-[#812392]">
                    Etapa {item.step}
                  </span>
                  
                  <h3 className="text-sm font-black text-[#25102b] mt-0.5 mb-1.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#6c6570] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Tip at bottom */}
                <div className="mt-3 pt-2.5 border-t border-[#eadfeb] text-[10px] font-semibold text-[#716575] flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#812392] shrink-0" />
                  <span>{item.tip}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical / Legal notice */}
        <div className="mt-6 p-3.5 rounded-xl bg-[#fffbeb] border border-[#fde68a] flex items-start gap-2.5 text-[#78350f] text-xs">
          <Info className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <b className="font-bold">Transparência e conformidade legal:</b> A participação nas etapas preparatórias não garante contratação direta. O avanço em cada etapa depende estritamente dos critérios de perfil, entrevistas e decisões das empresas parceiras responsáveis por cada oportunidade.
          </p>
        </div>

      </div>
    </section>
  );
};
