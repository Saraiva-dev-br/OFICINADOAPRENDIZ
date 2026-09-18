import React from 'react';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  Briefcase, 
  Sparkles, 
  MessageCircle, 
  ArrowRight,
  Building2
} from 'lucide-react';
import { Hire } from '../types';
import { SITE_INFO } from '../data/siteData';
import { getMediaUrl, getLocalFallbackMediaUrl } from '../utils/media';

interface HiredProfileModalProps {
  hire: Hire | null;
  onClose: () => void;
  onOpenCurriculum: () => void;
}

export const HiredProfileModal: React.FC<HiredProfileModalProps> = ({
  hire,
  onClose,
  onOpenCurriculum
}) => {
  if (!hire) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eadfeb] my-6 flex flex-col text-[#25102b]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient banner */}
        <div className="bg-gradient-to-r from-[#531062] via-[#4b0d59] to-[#25102b] p-6 text-white text-center relative pt-8 pb-14">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc928]/20 border border-[#ffc928]/40 text-[#ffc928] text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ffc928]" />
            <span>Jovem Contratado(a) em Teresina</span>
          </div>
          <h3 className="text-xl font-black text-white">
            História de Sucesso
          </h3>
        </div>

        {/* Overlapping Avatar */}
        <div className="relative -mt-12 flex justify-center">
          <div className="relative">
            <img
              src={getMediaUrl(hire.photoKey)}
              alt={hire.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-[#ffc928]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getLocalFallbackMediaUrl(hire.photoKey);
              }}
            />
            <span className="absolute bottom-1 right-1 p-1.5 bg-[#531062] text-[#ffc928] rounded-full shadow-md">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          <div>
            <h4 className="text-2xl font-black text-[#25102b]">
              {hire.name}
            </h4>
            <p className="text-sm font-semibold text-[#716575]">
              {hire.age} anos · Teresina - PI
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f1e2f4] text-[#812392] text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#812392]" />
            <span>{hire.unit || 'Unidade Dirceu'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] text-left space-y-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-1 border-b border-[#eadfeb]">
              <span className="text-[#716575]">Status no Projeto:</span>
              <span className="font-black text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Contratado(a)
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-[#eadfeb]">
              <span className="text-[#716575]">Polo / Unidade:</span>
              <span className="font-bold text-[#25102b]">{hire.unit || 'Unidade Dirceu'}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-[#eadfeb]">
              <span className="text-[#716575]">Atuação:</span>
              <span className="font-bold text-[#25102b]">{hire.role || 'Jovem Aprendiz'}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-[#716575]">Área / Setor:</span>
              <span className="font-bold text-[#812392]">{hire.companySector || 'Administrativo'}</span>
            </div>
          </div>

          <p className="text-xs text-[#6c6570] italic leading-relaxed px-2">
            “Assim como {hire.name}, centenas de jovens em Teresina já deram o primeiro passo através da Oficina do Aprendiz.”
          </p>

          <div className="pt-3 border-t border-[#eadfeb] space-y-2">
            <button
              onClick={() => {
                onClose();
                onOpenCurriculum();
              }}
              className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Cadastre Seu Currículo Também</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
