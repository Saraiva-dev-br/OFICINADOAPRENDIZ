import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  BrainCircuit, 
  GraduationCap, 
  MessageCircle, 
  FileText,
  MapPin,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface HeaderProps {
  onOpenVocational: () => void;
  onOpenStudentPortal: () => void;
  onOpenCurriculum: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenVocational,
  onOpenStudentPortal,
  onOpenCurriculum,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#eadfeb] shadow-xs transition-all">
      {/* Top micro banner */}
      <div className="bg-[#17081d] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-6 lg:px-8 flex items-center justify-between border-b border-[#2d1238] gap-2">
        <div className="flex items-center gap-2 font-medium tracking-wide truncate">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc928] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffc928]"></span>
          </span>
          <span className="text-[#e9dfea] truncate">Atendimento presencial em Teresina - PI · Polos Dirceu e Centro</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[#d7a8df] text-[11px] shrink-0">
          <a 
            href={SITE_INFO.whatsappUrlGeneral} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#ffc928] transition flex items-center gap-1 font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#ffc928]" />
            WhatsApp: {SITE_INFO.phone}
          </a>
          <span className="text-[#531062]">|</span>
          <span className="text-[#e9dfea]">Seg. a Sex.: 08h às 17h</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[3.75rem] sm:min-h-[4.25rem] py-1.5 sm:py-2 gap-2">
          
          {/* Brand Logo */}
          <a 
            href="#inicio" 
            className="flex items-center gap-2 sm:gap-3 group focus:outline-hidden shrink-0"
            id="nav-brand"
          >
            <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white p-1 border border-[#eadfeb] shadow-xs group-hover:shadow-md transition-all duration-300">
              <img 
                src="/logo-icon.png" 
                alt="Oficina do Aprendiz" 
                className="h-9 sm:h-11 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-oficina.jpeg';
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-xl font-black tracking-tight text-[#25102b] leading-tight">
                Oficina do Aprendiz
              </span>
              <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-[#812392]">
                Teresina · Piauí
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 xl:gap-2">
            <a 
              href="#sobre" 
              className="px-3 py-2 text-sm font-semibold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition"
            >
              Quem Somos
            </a>
            <a 
              href="#etapas" 
              className="px-3 py-2 text-sm font-semibold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition"
            >
              Etapas
            </a>
            <a 
              href="#resultados" 
              className="px-3 py-2 text-sm font-semibold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition"
            >
              Resultados
            </a>
            <a 
              href="#oportunidades" 
              className="px-3 py-2 text-sm font-semibold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition"
            >
              Oportunidades
            </a>
            <a 
              href="#videos-historias" 
              className="px-3 py-2 text-sm font-semibold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition"
            >
              Vídeos
            </a>
            <a 
              href="#presenca" 
              className="px-3 py-2 text-sm font-semibold text-[#4d3e51] hover:text-[#812392] hover:bg-[#f7f3f8] rounded-lg transition"
            >
              Onde Estamos
            </a>
          </nav>

          {/* Action CTAs for Tablet & Desktop */}
          <div className="hidden md:flex items-center gap-2 lg:gap-2.5">
            {/* Teste Vocacional Button */}
            <button
              onClick={onOpenVocational}
              id="btn-nav-vocational"
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-bold text-[#531062] bg-[#f7f3f8] hover:bg-[#efe3f2] border border-[#eadfeb] rounded-xl transition shadow-2xs hover:shadow-xs active:scale-98 min-h-[42px] cursor-pointer"
            >
              <BrainCircuit className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#812392] shrink-0" />
              <span className="hidden lg:inline">Teste Vocacional</span>
              <span className="lg:hidden">Vocacional</span>
            </button>

            {/* Portal do Aluno Button */}
            <button
              onClick={onOpenStudentPortal}
              id="btn-nav-student"
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-bold text-[#4d3e51] bg-[#f7f3f8] hover:bg-[#efe3f2] border border-[#eadfeb] rounded-xl transition active:scale-98 min-h-[42px] cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#812392] shrink-0" />
              <span className="hidden lg:inline">Área do Aluno</span>
              <span className="lg:hidden">Alunos</span>
            </button>

            {/* Cadastrar Currículo CTA - Official Yellow Button */}
            <button
              onClick={onOpenCurriculum}
              id="btn-nav-curriculum"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs hover:shadow-md transition duration-200 active:scale-98 min-h-[42px] cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-5 h-5 sm:w-[22px] sm:h-[22px] shrink-0 text-[#28102d]" />
              <span>Cadastrar Currículo</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={onOpenCurriculum}
              className="px-2.5 py-1.5 sm:px-3 text-xs font-black text-[#28102d] bg-[#ffc928] active:bg-[#e6b420] rounded-xl shadow-xs cursor-pointer min-h-[38px] flex items-center gap-1.5"
            >
              <FileText className="w-4.5 h-4.5 shrink-0 text-[#28102d]" />
              <span>Currículo</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-toggle"
              aria-label="Abrir menu de navegação"
              className="p-2 min-h-[42px] min-w-[42px] flex items-center justify-center text-[#4d3e51] hover:text-[#25102b] hover:bg-[#f7f3f8] rounded-xl transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#eadfeb] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <a
              href="#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Quem Somos</span>
              <span className="text-xs text-[#812392] font-normal">A Iniciativa</span>
            </a>
            <a
              href="#etapas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Etapas do Encaminhamento</span>
              <span className="text-xs text-[#812392] font-normal">5 Passos</span>
            </a>
            <a
              href="#resultados"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Resultados em Teresina & Brasil</span>
              <span className="text-xs text-[#812392] font-normal">Números</span>
            </a>
            <a
              href="#oportunidades"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Oportunidades em Aberto</span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Vagas</span>
            </a>
            <a
              href="#videos-historias"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Vídeos de Histórias Reais</span>
              <span className="text-xs text-[#812392] font-normal">Depoimentos</span>
            </a>
            <a
              href="#presenca"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-semibold text-[#4d3e51] hover:bg-[#f7f3f8] rounded-xl transition flex items-center justify-between"
            >
              <span>Onde Estamos</span>
              <span className="text-xs text-[#812392] font-normal">Dirceu & Centro</span>
            </a>
          </div>

          <div className="pt-3 border-t border-[#eadfeb] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVocational();
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 text-xs sm:text-sm font-bold text-[#531062] bg-[#f7f3f8] rounded-xl border border-[#eadfeb] active:bg-[#efe3f2] min-h-[46px] cursor-pointer"
            >
              <BrainCircuit className="w-5 h-5 text-[#812392] shrink-0" />
              <span>Fazer Teste Vocacional Grátis</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudentPortal();
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 text-xs sm:text-sm font-bold text-[#4d3e51] bg-[#f7f3f8] rounded-xl border border-[#eadfeb] active:bg-[#efe3f2] min-h-[46px] cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-[#812392] shrink-0" />
              <span>Acessar Área do Aluno</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCurriculum();
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs min-h-[48px] cursor-pointer"
            >
              <FileText className="w-5 h-5 shrink-0 text-[#28102d]" />
              <span>Cadastrar Currículo no WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
