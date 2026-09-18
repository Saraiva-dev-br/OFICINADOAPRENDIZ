import React from 'react';
import { 
  Building2, 
  HeartHandshake, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Compass, 
  CheckCircle2,
  Users
} from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-8 md:py-12 bg-gradient-to-b from-[#f7f3f8] via-white to-white border-b border-[#eadfeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#eadfeb] shadow-xl bg-white p-5 sm:p-6">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#eadfeb] flex items-center justify-center p-2 mb-4 shadow-xs">
                <img 
                  src="/logo-icon.png" 
                  alt="Oficina do Aprendiz" 
                  className="w-full h-full object-contain" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo-oficina.jpeg';
                  }}
                />
              </div>

              <span className="text-xs font-black uppercase tracking-wider text-[#812392]">
                Iniciativa de Impacto Social & Empregabilidade
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#25102b] mt-1.5 mb-3 leading-tight">
                Uma ponte sólida entre a formação e o mercado formal.
              </h3>
              
              <p className="text-[#6c6570] text-sm leading-relaxed mb-4">
                Criada por quem vivenciou na pele os obstáculos de conseguir a primeira oportunidade, a Oficina do Aprendiz transforma o potencial de jovens teresinenses em realização profissional.
              </p>

              <div className="space-y-2 pt-3 border-t border-[#eadfeb] text-xs font-semibold text-[#4d3e51]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#812392] shrink-0" />
                  <span>Em Teresina desde <b className="text-[#25102b]">agosto de 2025</b></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#812392] shrink-0" />
                  <span>Rede parceira com mais de <b className="text-[#25102b]">15 anos de atuação no Brasil</b></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#812392] shrink-0" />
                  <span>Dois polos presenciais: <b className="text-[#25102b]">Dirceu e Centro</b></span>
                </div>
              </div>
            </div>

            {/* Decorative background blur */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#812392]/10 rounded-full blur-2xl -z-10" />
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-xs font-black tracking-wider uppercase mb-2 self-start">
              <Compass className="w-3.5 h-3.5 text-[#812392]" />
              <span>QUEM SOMOS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#25102b] tracking-tight leading-tight mb-4">
              Uma ponte humana e eficiente entre jovens e oportunidades profissionais.
            </h2>

            <div className="prose max-w-none text-sm sm:text-base text-[#6c6570] space-y-2.5 leading-relaxed font-normal">
              <p>
                A <strong className="text-[#25102b] font-bold">Oficina do Aprendiz</strong> é uma iniciativa privada criada por um empreendedor nordestino que conheceu de perto as dificuldades de ingressar no mercado de trabalho.
              </p>
              <p>
                Em parceria com empresas locais de Teresina, organizações nacionais e projetos consolidados, chegou à capital piauiense em <strong className="text-[#25102b] font-bold">agosto de 2025</strong> para aproximar jovens de oportunidades concretas, realizando <span className="text-[#812392] font-bold">intermediação, capacitação e encaminhamento profissional</span>.
              </p>
              <p className="text-xs sm:text-sm text-[#716575]">
                No Brasil, a rede de iniciativas parceiras atua há mais de 15 anos com metodologia comprovada, já tendo cadastrado mais de 310 mil currículos e viabilizado mais de 37 mil oportunidades para jovens em todo o território nacional.
              </p>
            </div>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#eadfeb]">
              <div className="p-3.5 rounded-xl bg-white border border-[#eadfeb] shadow-2xs hover:border-[#812392]/40 transition">
                <HeartHandshake className="w-5 h-5 text-[#812392] mb-1.5" />
                <h4 className="font-black text-[#25102b] text-sm">Acolhimento Real</h4>
                <p className="text-xs text-[#716575] mt-0.5">Escuta atenta e orientação humanizada para cada aluno e família.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#eadfeb] shadow-2xs hover:border-[#812392]/40 transition">
                <Award className="w-5 h-5 text-[#ffc928] mb-1.5 fill-[#ffc928]/20" />
                <h4 className="font-black text-[#25102b] text-sm">Preparação Prática</h4>
                <p className="text-xs text-[#716575] mt-0.5">Treinamento intensivo em postura corporativa e rotinas reais.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#eadfeb] shadow-2xs hover:border-[#812392]/40 transition">
                <ShieldCheck className="w-5 h-5 text-[#531062] mb-1.5" />
                <h4 className="font-black text-[#25102b] text-sm">Transparência Total</h4>
                <p className="text-xs text-[#716575] mt-0.5">Conformidade estrita com a Lei do Aprendiz (Lei 10.097/2000).</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
