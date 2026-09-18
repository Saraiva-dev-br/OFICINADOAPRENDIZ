import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  MessageCircle,
  DollarSign,
  GraduationCap,
  Filter,
  ChevronDown
} from 'lucide-react';
import { OPPORTUNITIES, SITE_INFO } from '../data/siteData';
import { Opportunity } from '../types';
import { OpportunityModal } from './OpportunityModal';

interface OpportunitiesSectionProps {
  onOpenCurriculum: (unit?: 'dirceu' | 'centro') => void;
  opportunities?: Opportunity[];
}

export const OpportunitiesSection: React.FC<OpportunitiesSectionProps> = ({ 
  onOpenCurriculum,
  opportunities = OPPORTUNITIES
}) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [showRightsGuide, setShowRightsGuide] = useState<boolean>(false);

  // Filter logic
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(op => {
      const matchesSearch = 
        op.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'todos' ||
        op.sector.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        op.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [opportunities, searchQuery, selectedCategory]);

  const categories = [
    { id: 'todos', label: 'Todas as Vagas' },
    { id: 'administrativo', label: 'Administrativo' },
    { id: 'recepção', label: 'Recepção / Atendimento' }
  ];

  return (
    <section id="oportunidades" className="py-8 md:py-12 bg-[#f3edf5] border-b border-[#e5d9e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-xs font-black tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#812392]" />
              <span>PAINEL DE OPORTUNIDADES OFICIAIS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#25102b] tracking-tight">
              Seu próximo passo pode começar aqui.
            </h2>
            <p className="text-[#6c6570] text-sm sm:text-base mt-1.5 max-w-2xl">
              Consulte as oportunidades de aprendizagem abertas para os polos de Teresina. Processo 100% gratuito para o jovem.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-white text-[#531062] border border-[#e5d9e8] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Vagas em Processo de Avaliação</span>
            </span>
          </div>
        </div>

        {/* Big Counter Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#812392]/30 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#716575]">
                Oportunidades Disponíveis em Teresina
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#531062] mt-0.5">
                {opportunities.length} {opportunities.length === 1 ? 'vaga' : 'vagas'}
              </div>
              <p className="text-xs text-[#716575] mt-0.5 font-medium">
                Candidaturas abertas para avaliação nos polos
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#f1e2f4] text-[#812392] flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5d9e8] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#716575]">
                Oportunidades Esgotadas em Teresina
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#25102b] mt-0.5">
                498
              </div>
              <p className="text-xs text-[#716575] mt-0.5 font-medium">
                Impacto acumulado no último ano
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#f7f3f8] text-[#531062] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-[#e5d9e8] p-3 sm:p-3.5 mb-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#716575] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por cargo ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-semibold text-[#25102b] bg-[#f7f3f8] border border-[#eadfeb] rounded-xl focus:outline-hidden focus:border-[#812392] focus:bg-white transition"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === cat.id
                    ? 'bg-[#531062] text-[#ffc928] shadow-xs'
                    : 'bg-[#f7f3f8] text-[#716575] hover:text-[#25102b] hover:bg-[#efe3f2]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities Grid */}
        {filteredOpportunities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e5d9e8] p-8 text-center text-[#716575] my-4">
            <Briefcase className="w-9 h-9 text-[#812392] mx-auto mb-2.5 opacity-60" />
            <h4 className="text-base font-black text-[#25102b]">Nenhuma vaga encontrada para esta busca</h4>
            <p className="text-xs mt-1">Tente remover os filtros ou cadastre seu currículo para vagas futuras.</p>
            <button
              onClick={() => onOpenCurriculum()}
              className="mt-3.5 px-5 py-2 rounded-xl bg-[#531062] text-[#ffc928] text-xs font-black shadow-xs hover:bg-[#812392] transition"
            >
              Cadastrar Currículo Geral
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-5">
            {filteredOpportunities.map((op) => (
              <div
                key={op.id}
                className="bg-white rounded-2xl border border-[#e5d9e8] p-4 sm:p-5 shadow-xs hover:shadow-lg hover:border-[#812392] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-black uppercase bg-[#f1e2f4] text-[#812392]">
                      {op.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#f7f3f8] text-[#4d3e51]">
                      {op.sector}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#ffc928]/20 text-[#531062] border border-[#ffc928]/40">
                      {op.city} - PI
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black text-[#25102b] mb-1.5 group-hover:text-[#812392] transition">
                    {op.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6c6570] mb-3.5 leading-relaxed">
                    {op.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-2.5 p-3 sm:p-3.5 rounded-xl bg-[#f7f3f8] border border-[#eadfeb] text-xs text-[#4d3e51] mb-3.5">
                    <div>
                      <span className="text-[#716575] block font-medium text-[11px]">Faixa Etária:</span>
                      <span className="font-black text-[#25102b] text-xs sm:text-sm">{op.ageRange}</span>
                    </div>
                    <div>
                      <span className="text-[#716575] block font-medium text-[11px]">Carga Horária:</span>
                      <span className="font-black text-[#25102b] text-xs sm:text-sm">{op.workload}</span>
                    </div>
                    <div>
                      <span className="text-[#716575] block font-medium text-[11px]">Bolsa / Salário:</span>
                      <span className="font-black text-[#812392] text-xs sm:text-sm">{op.salary}</span>
                    </div>
                    <div>
                      <span className="text-[#716575] block font-medium text-[11px]">Perfil Solicitado:</span>
                      <span className="font-black text-[#25102b] text-xs sm:text-sm">{op.sex || 'Ambos os sexos'}</span>
                    </div>
                  </div>

                  {/* Requirements Preview */}
                  <div className="text-xs text-[#6c6570] bg-[#faf6fb] p-2.5 rounded-lg border border-[#eadfeb] mb-3.5">
                    <strong className="text-[#25102b]">Requisitos:</strong> {op.requirements}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#eadfeb] flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <button
                    onClick={() => setSelectedOpportunity(op)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#531062] bg-[#f1e2f4] hover:bg-[#efe3f2] rounded-xl transition"
                  >
                    <span>Ver Requisitos Completos</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#812392]" />
                  </button>

                  <button
                    onClick={() => onOpenCurriculum()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs transition"
                  >
                    <span>Cadastrar para Esta Vaga</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Guia de Direitos do Aprendiz (Accordion) */}
        <div className="bg-white rounded-2xl border border-[#e5d9e8] p-4 sm:p-5 shadow-xs">
          <button
            onClick={() => setShowRightsGuide(!showRightsGuide)}
            className="w-full flex items-center justify-between text-left focus:outline-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f1e2f4] text-[#812392] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-[#25102b]">
                  Dúvidas sobre o Programa Jovem Aprendiz e Direitos Garantidos por Lei
                </h3>
                <p className="text-xs text-[#716575]">
                  Saiba como funciona a Lei 10.097/2000, remuneração, carga horária e proteção escolar.
                </p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-[#812392] transition-transform duration-300 ${showRightsGuide ? 'rotate-180' : ''}`} />
          </button>

          {showRightsGuide && (
            <div className="mt-4 pt-4 border-t border-[#eadfeb] grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs text-[#4d3e51] animate-in fade-in duration-200">
              <div className="p-3.5 rounded-xl bg-[#f7f3f8] border border-[#eadfeb]">
                <h4 className="font-black text-[#25102b] text-sm mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#812392]" />
                  <span>100% Gratuito</span>
                </h4>
                <p className="leading-relaxed text-[#6c6570]">
                  O jovem não paga nenhum valor para se cadastrar, participar de entrevistas ou receber orientações da Oficina do Aprendiz.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7f3f8] border border-[#eadfeb]">
                <h4 className="font-black text-[#25102b] text-sm mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#812392]" />
                  <span>Jornada Reduzida</span>
                </h4>
                <p className="leading-relaxed text-[#6c6570]">
                  Carga horária compatível com a vida escolar (geralmente de 4h a 6h diárias), preservando a dedicação aos estudos regulares.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7f3f8] border border-[#eadfeb]">
                <h4 className="font-black text-[#25102b] text-sm mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#812392]" />
                  <span>Carteira Assinada & FGTS</span>
                </h4>
                <p className="leading-relaxed text-[#6c6570]">
                  Contrato formal com direito a remuneração mensal, férias remuneradas coincidentes com o recesso escolar e FGTS (2%).
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Opportunity Detail Modal */}
      <OpportunityModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onOpenCurriculum={onOpenCurriculum}
      />
    </section>
  );
};
