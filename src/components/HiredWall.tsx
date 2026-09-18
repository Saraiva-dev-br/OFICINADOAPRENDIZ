import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Filter,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { HIRED_STUDENTS } from '../data/siteData';
import { Hire } from '../types';
import { getMediaUrl, getLocalFallbackMediaUrl } from '../utils/media';
import { HiredProfileModal } from './HiredProfileModal';

interface HiredWallProps {
  onOpenCurriculum: (unit?: 'dirceu' | 'centro') => void;
  hires?: Hire[];
}

export const HiredWall: React.FC<HiredWallProps> = ({ 
  onOpenCurriculum,
  hires = HIRED_STUDENTS 
}) => {
  const [selectedHire, setSelectedHire] = useState<Hire | null>(null);

  return (
    <section className="py-8 md:py-12 bg-[#f7f3f8] border-b border-[#eadfeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-xs font-black tracking-wider uppercase mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#812392]" />
              <span>CONTRATADOS RECENTES · TERESINA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#25102b] tracking-tight">
              Orgulho de quem conquistou o primeiro emprego.
            </h2>
            <p className="text-[#6c6570] text-sm sm:text-base mt-1.5 max-w-2xl">
              Mais de 145 jovens já foram contratados pelo polo de Teresina. Conheça alguns dos rostos e histórias que nos inspiram todos os dias.
            </p>
          </div>

          {/* Unit Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#eadfeb] rounded-xl shadow-2xs self-start md:self-auto text-xs font-bold text-[#531062]">
            <MapPin className="w-4 h-4 text-[#812392]" />
            <span>Polo de Formação: <b className="font-black text-[#25102b]">Unidade Dirceu</b></span>
          </div>
        </div>

        {/* Grid of Hired Students */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
          {hires.map((hire) => (
            <div
              key={hire.id}
              onClick={() => setSelectedHire(hire)}
              className="bg-white rounded-2xl border border-[#eadfeb] p-3.5 sm:p-4 shadow-xs hover:shadow-lg hover:border-[#812392] transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Photo */}
              <div className="relative mb-2.5">
                <img
                  src={getMediaUrl(hire.photoKey)}
                  alt={hire.name}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-3 border-white shadow-md group-hover:scale-105 transition-transform duration-300 ring-2 ring-[#ffc928]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getLocalFallbackMediaUrl(hire.photoKey);
                  }}
                />
                <span className="absolute bottom-0 right-0 p-1 bg-[#531062] text-[#ffc928] rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Name and Age */}
              <h3 className="text-sm sm:text-base font-black text-[#25102b] leading-tight group-hover:text-[#812392] transition">
                {hire.name}
              </h3>
              <span className="text-xs font-semibold text-[#716575] mt-0.5">
                {hire.age} anos
              </span>

              {/* Unit Pill */}
              <div className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#812392] bg-[#f1e2f4] px-2.5 py-0.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-[#812392] shrink-0" />
                <span>{hire.unit || 'Unidade Dirceu'}</span>
              </div>

              {/* Status & Area Badge */}
              <div className="mt-2.5 pt-2 border-t border-[#eadfeb] w-full flex items-center justify-center gap-1.5 text-xs font-bold text-[#531062]">
                <Briefcase className="w-3.5 h-3.5 text-[#812392] shrink-0" />
                <span className="truncate">{hire.companySector || hire.role || 'Jovem Aprendiz'}</span>
              </div>

              <span className="mt-1.5 text-[11px] font-bold text-[#812392] opacity-0 group-hover:opacity-100 transition">
                Ver Perfil Completo &rarr;
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#531062] via-[#4b0d59] to-[#25102b] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-[#7b1a90]/40">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-[#ffc928]">
              Sua foto também pode estar aqui em breve.
            </h3>
            <p className="text-[#e9dfea] text-xs sm:text-sm max-w-xl">
              O primeiro passo é cadastrar seu currículo gratuitamente em um dos nossos polos em Teresina.
            </p>
          </div>
          <button
            onClick={() => onOpenCurriculum()}
            className="px-5 py-2.5 text-xs sm:text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-md transition duration-200 whitespace-nowrap"
          >
            Cadastre Seu Currículo Grátis
          </button>
        </div>

      </div>

      {/* Hired Student Modal */}
      <HiredProfileModal
        hire={selectedHire}
        onClose={() => setSelectedHire(null)}
        onOpenCurriculum={onOpenCurriculum}
      />
    </section>
  );
};
