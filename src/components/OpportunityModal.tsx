import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  MessageCircle, 
  FileText, 
  Share2, 
  Check, 
  Sparkles,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Opportunity } from '../types';
import { SITE_INFO } from '../data/siteData';

interface OpportunityModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onOpenCurriculum: (unit?: 'dirceu' | 'centro') => void;
}

export const OpportunityModal: React.FC<OpportunityModalProps> = ({
  opportunity,
  onClose,
  onOpenCurriculum
}) => {
  const [copied, setCopied] = useState(false);

  if (!opportunity) return null;

  const handleApplyWhatsApp = (unit: 'dirceu' | 'centro') => {
    const unitName = unit === 'centro' ? 'Unidade Centro' : 'Unidade Dirceu';
    const text = encodeURIComponent(
      `Olá! Vi a vaga de "${opportunity.title}" no site da Oficina do Aprendiz e gostaria de me candidatar para a ${unitName} em Teresina.`
    );
    window.open(`https://wa.me/${SITE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const handleShare = () => {
    const shareText = `Vaga de Jovem Aprendiz em Teresina - PI:\n*${opportunity.title}*\n${opportunity.sector} · ${opportunity.ageRange}\nInscrições gratuitas na Oficina do Aprendiz.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eadfeb] my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#531062] via-[#4b0d59] to-[#25102b] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#ffc928] text-[#28102d]">
              {opportunity.category}
            </span>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-white/15 text-white">
              {opportunity.sector}
            </span>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#812392] text-white">
              {opportunity.city} - PI
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {opportunity.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#e9dfea] mt-1">
            Processo de intermediação oficial da Oficina do Aprendiz · Teresina
          </p>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-[#25102b]">
          
          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb]">
            <div>
              <span className="text-[11px] font-bold text-[#716575] uppercase block">Faixa Etária</span>
              <span className="text-sm font-black text-[#25102b] block mt-0.5">{opportunity.ageRange}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#716575] uppercase block">Carga Horária</span>
              <span className="text-sm font-black text-[#25102b] block mt-0.5">{opportunity.workload}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#716575] uppercase block">Bolsa / Salário</span>
              <span className="text-sm font-black text-[#812392] block mt-0.5">{opportunity.salary}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#716575] uppercase block">Público / Vaga</span>
              <span className="text-sm font-black text-[#25102b] block mt-0.5">{opportunity.sex || 'Ambos os sexos'}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#531062] mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#812392]" />
              <span>Descrição da Oportunidade</span>
            </h3>
            <p className="text-sm sm:text-base text-[#4d3e51] leading-relaxed bg-white p-4 rounded-xl border border-[#eadfeb]">
              {opportunity.description || 'Participe do processo seletivo para formação e inserção no mercado de trabalho em Teresina - PI.'}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#531062] mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#812392]" />
              <span>Requisitos Informados</span>
            </h3>
            <div className="bg-[#fcfaff] p-4 rounded-xl border border-[#e5d9e8] text-sm text-[#4d3e51] leading-relaxed">
              {opportunity.requirements}
            </div>
          </div>

          {/* Process & Tips Box */}
          <div className="p-4 rounded-xl bg-[#fffbeb] border border-[#fde68a] text-[#78350f] text-xs sm:text-sm space-y-1.5">
            <div className="flex items-center gap-1.5 font-black text-[#92400e]">
              <Sparkles className="w-4 h-4" />
              <span>Dicas para a sua entrevista em Teresina:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-[#92400e]/90 pl-1">
              <li>Mantenha seus documentos em dia (RG, CPF e declaração escolar).</li>
              <li>Compareça ao polo pontualmente no horário agendado pela coordenação.</li>
              <li>O processo é 100% gratuito — nenhuma taxa é cobrada do jovem.</li>
            </ul>
          </div>

          {/* Application Action Cards */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#25102b] mb-3">
              Como se candidatar a esta vaga:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleApplyWhatsApp('dirceu')}
                className="p-4 rounded-2xl bg-[#f7f3f8] hover:bg-[#efe3f2] border-2 border-[#eadfeb] hover:border-[#812392] text-left transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black uppercase text-[#812392]">Zona Sudeste · Parque Ideal</span>
                    <MessageCircle className="w-4 h-4 text-[#25d366]" />
                  </div>
                  <span className="font-black text-[#25102b] text-sm block">Candidatar-se pelo Polo Dirceu</span>
                  <span className="text-xs text-[#716575] block mt-1 leading-snug">
                    R. Dr. Pedro Teixeira, 2964 - Parque Ideal
                  </span>
                </div>
                <span className="mt-3 text-xs font-bold text-[#531062] group-hover:underline">
                  Enviar Mensagem &rarr;
                </span>
              </button>

              <button
                onClick={() => handleApplyWhatsApp('centro')}
                className="p-4 rounded-2xl bg-[#f7f3f8] hover:bg-[#efe3f2] border-2 border-[#eadfeb] hover:border-[#812392] text-left transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black uppercase text-[#812392]">Centro · Ed. Cel. Otávio Miranda</span>
                    <MessageCircle className="w-4 h-4 text-[#25d366]" />
                  </div>
                  <span className="font-black text-[#25102b] text-sm block">Candidatar-se pelo Polo Centro</span>
                  <span className="text-xs text-[#716575] block mt-1 leading-snug">
                    Rua Rui Barbosa, nº 68 - 6º Andar, Sala 613
                  </span>
                </div>
                <span className="mt-3 text-xs font-bold text-[#531062] group-hover:underline">
                  Enviar Mensagem &rarr;
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#f7f3f8] border-t border-[#eadfeb] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#531062] bg-white hover:bg-slate-50 border border-[#eadfeb] rounded-xl transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#812392]" />}
            <span>{copied ? 'Informações Copiadas!' : 'Compartilhar Vaga'}</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenCurriculum();
              }}
              className="w-full sm:w-auto px-5 py-3 text-xs font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-md transition"
            >
              Cadastrar Currículo Completo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
