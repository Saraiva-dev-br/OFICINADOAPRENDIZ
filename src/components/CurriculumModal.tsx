import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Building2, 
  FileText, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_INFO } from '../data/siteData';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedUnit?: 'dirceu' | 'centro' | string;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  isOpen,
  onClose,
  preselectedUnit = 'dirceu'
}) => {
  const [selectedUnit, setSelectedUnit] = useState<string>(preselectedUnit === 'centro' ? 'centro' : 'dirceu');
  const [candidateName, setCandidateName] = useState<string>('');
  const [candidateAge, setCandidateAge] = useState<string>('');
  const [candidatePhone, setCandidatePhone] = useState<string>('');
  const [candidateNeighborhood, setCandidateNeighborhood] = useState<string>('');
  const [candidateZone, setCandidateZone] = useState<string>('Zona Sudeste');
  const [candidateSchooling, setCandidateSchooling] = useState<string>('Ensino Médio (cursando)');
  const [candidateArea, setCandidateArea] = useState<string>('Administrativo / Recepção');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const popularNeighborhoods = [
    { name: 'Dirceu', zone: 'Zona Sudeste' },
    { name: 'Mocambinho', zone: 'Zona Norte' },
    { name: 'Centro', zone: 'Centro' },
    { name: 'Promorar', zone: 'Zona Sul' },
    { name: 'Parque Piauí', zone: 'Zona Sul' },
    { name: 'Renascença', zone: 'Zona Sudeste' },
    { name: 'São Cristóvão', zone: 'Zona Leste' }
  ];

  const buildMessage = () => {
    const unitName = selectedUnit === 'centro' ? 'Unidade Centro' : 'Unidade Dirceu';
    let message = `Olá! Gostaria de cadastrar meu currículo na Oficina do Aprendiz (${unitName}).`;
    if (candidateName.trim()) {
      message += `\n\n*Nome Completo:* ${candidateName.trim()}`;
    }
    if (candidateAge.trim()) {
      message += `\n*Idade:* ${candidateAge.trim()} anos`;
    }
    if (candidatePhone.trim()) {
      message += `\n*Contato / WhatsApp:* ${candidatePhone.trim()}`;
    }
    if (candidateNeighborhood.trim()) {
      message += `\n*Bairro:* ${candidateNeighborhood.trim()}`;
    }
    message += `\n*Zona da Cidade:* ${candidateZone}`;
    if (candidateSchooling) {
      message += `\n*Escolaridade:* ${candidateSchooling}`;
    }
    if (candidateArea) {
      message += `\n*Área de Interesse:* ${candidateArea}`;
    }
    message += `\n\n_Cadastro enviado via portal oficial Oficina do Aprendiz Teresina._`;
    return message;
  };

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildMessage();
    const encoded = encodeURIComponent(message);
    
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    window.open(`https://wa.me/${SITE_INFO.whatsappRaw}?text=${encoded}`, '_blank');
    onClose();
  };

  const handleCopyMessage = () => {
    const message = buildMessage();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
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
        className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eadfeb] my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#531062] via-[#4b0d59] to-[#25102b] p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ffc928]/20 border border-[#ffc928]/40 text-[#ffc928] text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ffc928]" />
            <span>Processo Gratuito · Teresina - PI</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            Cadastrar Currículo na Oficina do Aprendiz
          </h3>
          <p className="text-xs sm:text-sm text-[#e9dfea] mt-1">
            Escolha sua unidade de preferência e inicie seu atendimento oficial em Teresina.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* Unit Selector */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#25102b] mb-2.5">
              1. Selecione o Polo Mais Próximo de Você:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedUnit('dirceu')}
                className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer ${
                  selectedUnit === 'dirceu'
                    ? 'border-[#812392] bg-[#f1e2f4] shadow-xs'
                    : 'border-[#eadfeb] hover:border-[#812392]/50 bg-white'
                }`}
              >
                <div>
                  <span className="text-xs font-black text-[#812392] uppercase tracking-wider block">
                    Zona Sudeste · Parque Ideal
                  </span>
                  <span className="font-black text-[#25102b] text-base block mt-0.5">
                    Unidade Dirceu
                  </span>
                  <span className="text-xs text-[#716575] block mt-1 leading-relaxed">
                    R. Dr. Pedro Teixeira, 2964 - Parque Ideal
                  </span>
                </div>
                {selectedUnit === 'dirceu' && (
                  <div className="mt-3 flex items-center gap-1 text-xs font-black text-[#531062]">
                    <CheckCircle2 className="w-4 h-4 text-[#812392]" />
                    <span>Polo Selecionado</span>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedUnit('centro')}
                className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer ${
                  selectedUnit === 'centro'
                    ? 'border-[#812392] bg-[#f1e2f4] shadow-xs'
                    : 'border-[#eadfeb] hover:border-[#812392]/50 bg-white'
                }`}
              >
                <div>
                  <span className="text-xs font-black text-[#812392] uppercase tracking-wider block">
                    Centro · Ed. Cel. Otávio Miranda
                  </span>
                  <span className="font-black text-[#25102b] text-base block mt-0.5">
                    Unidade Centro
                  </span>
                  <span className="text-xs text-[#716575] block mt-1 leading-relaxed">
                    Rua Rui Barbosa, nº 68, Centro - 6º Andar, sala 613
                  </span>
                </div>
                {selectedUnit === 'centro' && (
                  <div className="mt-3 flex items-center gap-1 text-xs font-black text-[#531062]">
                    <CheckCircle2 className="w-4 h-4 text-[#812392]" />
                    <span>Polo Selecionado</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSendViaWhatsApp} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#25102b] mb-1.5">
                2. Dados Básicos do Candidato:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Nome completo do jovem *"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b]"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    required
                    placeholder="Idade (14 a 24 anos) *"
                    min="14"
                    max="29"
                    value={candidateAge}
                    onChange={(e) => setCandidateAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="tel"
                  placeholder="DDD + Telefone / WhatsApp"
                  value={candidatePhone}
                  onChange={(e) => setCandidatePhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b]"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Seu Bairro em Teresina"
                  value={candidateNeighborhood}
                  onChange={(e) => setCandidateNeighborhood(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b]"
                />
              </div>
            </div>

            {/* Zona da Cidade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-[11px] font-bold text-[#716575] mb-1">
                  Zona da Cidade em Teresina:
                </label>
                <select
                  value={candidateZone}
                  onChange={(e) => setCandidateZone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] font-medium"
                >
                  <option value="Zona Sudeste">Zona Sudeste</option>
                  <option value="Zona Sul">Zona Sul</option>
                  <option value="Zona Leste">Zona Leste</option>
                  <option value="Zona Norte">Zona Norte</option>
                  <option value="Centro">Centro</option>
                  <option value="Região Metropolitana">Região Metropolitana</option>
                </select>
              </div>

              {/* Quick Neighborhood Chips */}
              <div>
                <span className="text-[11px] text-[#716575] font-semibold block mb-1">
                  Bairros Frequentes:
                </span>
                <div className="flex flex-wrap gap-1">
                  {popularNeighborhoods.map((bairro) => (
                    <button
                      type="button"
                      key={bairro.name}
                      onClick={() => {
                        setCandidateNeighborhood(bairro.name);
                        setCandidateZone(bairro.zone);
                      }}
                      className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-[#f7f3f8] text-[#531062] hover:bg-[#efe3f2] border border-[#eadfeb] transition cursor-pointer"
                    >
                      {bairro.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#716575] mb-1">
                  Escolaridade Atual:
                </label>
                <select
                  value={candidateSchooling}
                  onChange={(e) => setCandidateSchooling(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] font-medium"
                >
                  <option value="Ensino Médio (cursando)">Ensino Médio (cursando)</option>
                  <option value="Ensino Médio Concluído">Ensino Médio Concluído</option>
                  <option value="Ensino Superior (cursando)">Ensino Superior (cursando)</option>
                  <option value="Ensino Fundamental">Ensino Fundamental</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#716575] mb-1">
                  Área de Interesse:
                </label>
                <select
                  value={candidateArea}
                  onChange={(e) => setCandidateArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] font-medium"
                >
                  <option value="Administrativo / Recepção">Administrativo / Recepção</option>
                  <option value="Atendimento ao Cliente">Atendimento ao Cliente</option>
                  <option value="Apoio Pedagógico">Apoio Pedagógico</option>
                  <option value="Primeira Oportunidade (Qualquer)">Primeira Oportunidade (Qualquer)</option>
                </select>
              </div>
            </div>

            {/* Document Checklist Info */}
            <div className="p-3.5 rounded-xl bg-[#f7f3f8] border border-[#eadfeb] text-xs text-[#4d3e51] space-y-1">
              <span className="font-bold text-[#25102b] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#812392]" />
                Documentos recomendados para levar ao atendimento presencial:
              </span>
              <p className="text-[#6c6570] text-[11px]">
                RG, CPF, comprovante de residência recente e declaração escolar atualizada.
              </p>
            </div>

            {/* Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#28102d]" />
                <span>Enviar Cadastro para o WhatsApp Oficial</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold text-[#531062] bg-[#f7f3f8] hover:bg-[#efe3f2] border border-[#eadfeb] rounded-xl transition cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#812392]" />}
                <span>{copied ? 'Mensagem Copiada para a Área de Transferência!' : 'Copiar Texto Formatado do Cadastro'}</span>
              </button>
            </div>
          </form>

          {/* Reassurance Footer */}
          <div className="p-3.5 rounded-xl bg-[#fcfaff] border border-[#eadfeb] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#716575]">
            <span className="flex items-center gap-1.5 font-bold text-[#4d3e51]">
              <Clock className="w-3.5 h-3.5 text-[#812392]" />
              Atendimento: Segunda a sexta-feira, das 08h às 17h
            </span>
            <span className="font-semibold text-[#812392]">Central: {SITE_INFO.phone}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
