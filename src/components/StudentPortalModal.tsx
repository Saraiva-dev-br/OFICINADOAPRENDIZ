import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Calendar, 
  MessageSquareText, 
  Users, 
  Clock, 
  CheckCircle2, 
  GraduationCap, 
  MapPin, 
  Send, 
  AlertCircle, 
  Building2, 
  Lightbulb, 
  MessageCircle,
  Share2,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  HOLIDAYS_2026, 
  LECTURE_SESSIONS, 
  STUDENT_NOTICES, 
  SITE_INFO 
} from '../data/siteData';
import { StudentNotice, LectureSession } from '../types';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'avisos' | 'palestra' | 'feriados' | 'sugestao';
  notices?: StudentNotice[];
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'avisos',
  notices = STUDENT_NOTICES
}) => {
  const [activeTab, setActiveTab] = useState<'avisos' | 'palestra' | 'feriados' | 'sugestao'>(initialTab);
  const [selectedSessionId, setSelectedSessionId] = useState<string>(LECTURE_SESSIONS[0]?.id || '');
  const [holidayFilter, setHolidayFilter] = useState<'todos' | 'Nacional' | 'Estadual' | 'Municipal'>('todos');

  // Lecture Form State
  const [lectureForm, setLectureForm] = useState({
    studentName: '',
    birthDate: '',
    course: '',
    neighborhood: '',
    zone: 'Zona Sudeste',
    sessionId: LECTURE_SESSIONS[0]?.id || ''
  });
  const [lectureSubmitted, setLectureSubmitted] = useState<boolean>(false);

  // Suggestion Form State
  const [suggestionForm, setSuggestionForm] = useState({
    studentName: '',
    birthDate: '',
    responsibleName: '',
    neighborhood: '',
    zone: 'Zona Sudeste',
    course: '',
    message: ''
  });
  const [suggestionSubmitted, setSuggestionSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRegisterLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lectureForm.studentName.trim() || !lectureForm.birthDate || !lectureForm.course.trim()) {
      return;
    }
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setLectureSubmitted(true);
  };

  const handleSendLectureToWhatsApp = () => {
    const session = LECTURE_SESSIONS.find((s: LectureSession) => s.id === (lectureForm.sessionId || selectedSessionId));
    const locationInfo = lectureForm.neighborhood 
      ? `*Bairro:* ${lectureForm.neighborhood} (${lectureForm.zone})\n`
      : `*Zona:* ${lectureForm.zone}\n`;
    const text = encodeURIComponent(
      `Olá! Realizei minha inscrição na *Palestra de Empregabilidade* da Oficina do Aprendiz:\n\n` +
      `*Aluno:* ${lectureForm.studentName}\n` +
      `*Nascimento:* ${lectureForm.birthDate}\n` +
      `*Curso:* ${lectureForm.course}\n` +
      locationInfo +
      `*Horário Escolhido:* ${session?.label || 'Segunda-feira'} (${session?.eventTime})\n\n` +
      `Por favor, confirmem minha presença no polo de Teresina.`
    );
    window.open(`https://wa.me/${SITE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const handleSendSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestionForm.studentName.trim() || !suggestionForm.message.trim()) {
      return;
    }
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setSuggestionSubmitted(true);
  };

  const handleSendSuggestionToWhatsApp = () => {
    const locationInfo = suggestionForm.neighborhood 
      ? `*Bairro / Zona:* ${suggestionForm.neighborhood} (${suggestionForm.zone})\n`
      : `*Zona:* ${suggestionForm.zone}\n`;
    const text = encodeURIComponent(
      `Olá, Diretoria da Oficina do Aprendiz! Sou aluno e gostaria de registrar a seguinte sugestão:\n\n` +
      `*Aluno:* ${suggestionForm.studentName}\n` +
      `*Curso:* ${suggestionForm.course}\n` +
      locationInfo +
      (suggestionForm.responsibleName ? `*Responsável:* ${suggestionForm.responsibleName}\n` : '') +
      `*Mensagem:* ${suggestionForm.message}`
    );
    window.open(`https://wa.me/${SITE_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const filteredHolidays = holidayFilter === 'todos'
    ? HOLIDAYS_2026
    : HOLIDAYS_2026.filter(h => h.scope.toLowerCase().includes(holidayFilter.toLowerCase()));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eadfeb] my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4b0d59] via-[#3d094a] to-[#25102b] p-6 text-white relative shrink-0 border-b border-[#380a43]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc928]/20 border border-[#ffc928]/40 text-[#ffc928] text-xs font-black uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#ffc928]" />
            <span>ÁREA EXCLUSIVA DOS ALUNOS · TERESINA</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Informação, formação e oportunidades em um só lugar
          </h3>
          <p className="text-xs sm:text-sm text-[#e9dfea] mt-1">
            Acompanhe os avisos da Oficina do Aprendiz, participe das palestras e consulte o calendário letivo.
          </p>

          {/* Navigation Sub-Tabs matching original site */}
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <button
              onClick={() => setActiveTab('avisos')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'avisos'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-xs'
                  : 'bg-[#380a43] text-[#e9dfea] hover:text-white hover:bg-[#531062]'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Mural de Avisos</span>
            </button>

            <button
              onClick={() => setActiveTab('palestra')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'palestra'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-xs'
                  : 'bg-[#380a43] text-[#e9dfea] hover:text-white hover:bg-[#531062]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Palestra de Empregabilidade</span>
            </button>

            <button
              onClick={() => setActiveTab('feriados')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'feriados'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-xs'
                  : 'bg-[#380a43] text-[#e9dfea] hover:text-white hover:bg-[#531062]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendário 2026 (Feriados)</span>
            </button>

            <button
              onClick={() => setActiveTab('sugestao')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'sugestao'
                  ? 'bg-[#ffc928] text-[#28102d] shadow-xs'
                  : 'bg-[#380a43] text-[#e9dfea] hover:text-white hover:bg-[#531062]'
              }`}
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>Deixe sua Sugestão</span>
            </button>
          </div>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: MURAL DE AVISOS */}
          {activeTab === 'avisos' && (
            <div className="space-y-5">
              <div className="border-b border-[#eadfeb] pb-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#812392] block">
                  Informações Importantes
                </span>
                <h4 className="text-xl font-black text-[#25102b]">
                  Mural de Avisos
                </h4>
              </div>

              {notices.length > 0 ? (
                <div className="space-y-3">
                  {notices.map((notice: StudentNotice) => (
                    <article key={notice.id} className="p-4 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb]">
                      <h5 className="font-bold text-[#25102b] text-sm">{notice.title}</h5>
                      <p className="text-xs text-[#534657] mt-1">{notice.body}</p>
                    </article>
                  ))}
                </div>
              ) : (
                /* Authentic empty notice state as in original site */
                <div className="p-8 text-center rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] space-y-2">
                  <Bell className="w-8 h-8 text-[#812392]/50 mx-auto" />
                  <p className="text-sm font-semibold text-[#534657]">
                    Nenhum aviso publicado no momento.
                  </p>
                  <p className="text-xs text-[#716575]">
                    Fique atento aos comunicados presenciais nos Polos Dirceu e Centro.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PALESTRA DE EMPREGABILIDADE */}
          {activeTab === 'palestra' && (
            <div className="space-y-6">
              
              {/* Poster Header */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#531062] to-[#380a43] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black text-[#ffc928] uppercase tracking-wider block">
                    SEGUNDA-FEIRA
                  </span>
                  <h4 className="text-lg font-black text-white mt-0.5">
                    Palestra de Empregabilidade
                  </h4>
                  <p className="text-xs text-[#e9dfea] mt-0.5">
                    Toda segunda-feira · Cada turma possui até 10 vagas.
                  </p>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white font-bold self-start sm:self-auto">
                  Vagas Limitadas (10 por turma)
                </div>
              </div>

              {!lectureSubmitted ? (
                <form onSubmit={handleRegisterLecture} className="space-y-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#812392] block">
                      PALESTRA DE EMPREGABILIDADE
                    </span>
                    <h5 className="text-base font-black text-[#25102b] mt-0.5">
                      Clique e Inscreva-se
                    </h5>
                    <p className="text-xs text-[#6c6570] mt-0.5">
                      Escolha o horário da manhã ou da tarde.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#eadfeb]">
                    <div>
                      <label className="block text-xs font-bold text-[#25102b] mb-1">
                        Nome Completo do Jovem *
                      </label>
                      <input
                        name="studentName"
                        type="text"
                        required
                        placeholder="Seu nome completo"
                        value={lectureForm.studentName}
                        onChange={(e) => setLectureForm({ ...lectureForm, studentName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#25102b] mb-1">
                          Data de Nascimento *
                        </label>
                        <input
                          name="birthDate"
                          type="date"
                          required
                          value={lectureForm.birthDate}
                          onChange={(e) => setLectureForm({ ...lectureForm, birthDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#25102b] mb-1">
                          Curso em Andamento *
                        </label>
                        <input
                          name="course"
                          type="text"
                          required
                          placeholder="Ex: Auxiliar Administrativo"
                          value={lectureForm.course}
                          onChange={(e) => setLectureForm({ ...lectureForm, course: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#25102b] mb-1">
                          Bairro em Teresina *
                        </label>
                        <input
                          name="neighborhood"
                          type="text"
                          required
                          placeholder="Ex: Dirceu, Promorar, Saci..."
                          value={lectureForm.neighborhood}
                          onChange={(e) => setLectureForm({ ...lectureForm, neighborhood: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#25102b] mb-1">
                          Zona da Cidade *
                        </label>
                        <select
                          name="zone"
                          value={lectureForm.zone}
                          onChange={(e) => setLectureForm({ ...lectureForm, zone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition font-medium"
                        >
                          <option value="Zona Sudeste">Zona Sudeste</option>
                          <option value="Zona Sul">Zona Sul</option>
                          <option value="Zona Leste">Zona Leste</option>
                          <option value="Zona Norte">Zona Norte</option>
                          <option value="Centro">Centro</option>
                          <option value="Região Metropolitana">Região Metropolitana</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#25102b] mb-2">
                        Escolha o Horário:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {LECTURE_SESSIONS.map((session: LectureSession) => (
                          <button
                            type="button"
                            key={session.id}
                            onClick={() => {
                              setSelectedSessionId(session.id);
                              setLectureForm({ ...lectureForm, sessionId: session.id });
                            }}
                            className={`p-3.5 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                              (lectureForm.sessionId || selectedSessionId) === session.id
                                ? 'border-[#812392] bg-[#f1e2f4]'
                                : 'border-[#eadfeb] bg-white hover:border-[#812392]/50'
                            }`}
                          >
                            <span className="text-xs font-black text-[#531062]">{session.label}</span>
                            <span className="text-xs text-[#716575] mt-1">{session.eventTime} · {session.period}</span>
                            <span className="text-[11px] font-bold text-emerald-700 mt-2">
                              {session.maxSlots - session.registrations} vagas restantes
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 text-xs sm:text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#28102d]" />
                        <span>Confirmar Inscrição na Palestra</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#4b0d59] text-[#ffc928] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-black text-[#25102b] text-lg">
                      Inscrição Registrada com Sucesso!
                    </h5>
                    <p className="text-xs text-[#534657] max-w-md mx-auto mt-1 leading-relaxed">
                      Sua solicitação de vaga para a Palestra de Empregabilidade foi gerada. Você pode confirmar sua vaga diretamente com a coordenação.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleSendLectureToWhatsApp}
                      className="w-full sm:w-auto px-5 py-3 text-xs font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Enviar Comprovante via WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        setLectureSubmitted(false);
                        setLectureForm({ studentName: '', birthDate: '', course: '', neighborhood: '', zone: 'Zona Sudeste', sessionId: '' });
                      }}
                      className="w-full sm:w-auto px-4 py-3 text-xs font-bold text-[#4b0d59] bg-white border border-[#eadfeb] rounded-xl hover:bg-[#f1e2f4] transition cursor-pointer"
                    >
                      Fazer Nova Inscrição
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CALENDÁRIO 2026 (FERIADOS - NÃO HAVERÁ AULA) */}
          {activeTab === 'feriados' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#eadfeb] pb-3 gap-2">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#812392] block">
                    CALENDÁRIO 2026
                  </span>
                  <h4 className="text-xl font-black text-[#25102b]">
                    Feriados — Não Haverá Aula
                  </h4>
                  <p className="text-xs text-[#6c6570] mt-0.5">
                    Datas nacionais, estaduais do Piauí e municipais de Teresina.
                  </p>
                </div>

                {/* Filter Scope */}
                <div className="flex items-center gap-1 bg-[#f7f3f8] p-1 rounded-xl border border-[#eadfeb]">
                  {(['todos', 'Nacional', 'Estadual', 'Municipal'] as const).map((scope) => (
                    <button
                      key={scope}
                      onClick={() => setHolidayFilter(scope)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition cursor-pointer ${
                        holidayFilter === scope
                          ? 'bg-[#531062] text-[#ffc928]'
                          : 'text-[#716575] hover:text-[#25102b]'
                      }`}
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-[#eadfeb] border border-[#eadfeb] rounded-2xl overflow-hidden bg-white">
                {filteredHolidays.map((h, i) => (
                  <article key={i} className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-[#f7f3f8] transition">
                    <div className="flex items-center gap-3">
                      <time className="w-11 h-11 rounded-xl bg-[#f7f3f8] text-[#4b0d59] font-black flex flex-col items-center justify-center text-xs leading-tight shrink-0 border border-[#eadfeb]">
                        <span>{h.date.slice(0, 2)}</span>
                        <span className="text-[10px] text-[#812392] font-semibold">{h.date.slice(3, 5)}/26</span>
                      </time>
                      <div>
                        <b className="font-bold text-[#25102b] text-xs sm:text-sm block">
                          {h.name}
                        </b>
                        <small className="text-[11px] text-[#716575]">
                          {h.scope}
                        </small>
                      </div>
                    </div>
                    <em className="text-[11px] font-bold text-[#b91c1c] bg-[#fef2f2] px-2.5 py-1 rounded-full border border-[#fecaca] not-italic shrink-0">
                      SEM AULA
                    </em>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DEIXE SUA SUGESTÃO (SUA OPINIÃO IMPORTA) */}
          {activeTab === 'sugestao' && (
            <div className="space-y-5">
              <div className="border-b border-[#eadfeb] pb-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#812392] block">
                  SUA OPINIÃO IMPORTA
                </span>
                <h4 className="text-xl font-black text-[#25102b]">
                  Deixe Sua Sugestão
                </h4>
                <p className="text-xs text-[#6c6570] mt-0.5">
                  A mensagem será recebida diretamente pela coordenação e direção da Oficina do Aprendiz.
                </p>
              </div>

              {!suggestionSubmitted ? (
                <form onSubmit={handleSendSuggestion} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#25102b] mb-1">
                      Nome Completo do Aluno *
                    </label>
                    <input
                      name="studentName"
                      type="text"
                      required
                      placeholder="Nome completo do aluno"
                      value={suggestionForm.studentName}
                      onChange={(e) => setSuggestionForm({ ...suggestionForm, studentName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#25102b] mb-1">
                        Data de Nascimento
                      </label>
                      <input
                        name="birthDate"
                        type="date"
                        value={suggestionForm.birthDate}
                        onChange={(e) => setSuggestionForm({ ...suggestionForm, birthDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#25102b] mb-1">
                        Nome do Responsável <small className="text-[10px] text-[#716575] font-normal">(se for menor de idade)</small>
                      </label>
                      <input
                        name="responsibleName"
                        type="text"
                        placeholder="Nome do responsável"
                        value={suggestionForm.responsibleName}
                        onChange={(e) => setSuggestionForm({ ...suggestionForm, responsibleName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#25102b] mb-1">
                        Bairro em Teresina
                      </label>
                      <input
                        name="neighborhood"
                        type="text"
                        placeholder="Ex: Dirceu, Promorar, Saci..."
                        value={suggestionForm.neighborhood}
                        onChange={(e) => setSuggestionForm({ ...suggestionForm, neighborhood: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#25102b] mb-1">
                        Zona da Cidade
                      </label>
                      <select
                        name="zone"
                        value={suggestionForm.zone}
                        onChange={(e) => setSuggestionForm({ ...suggestionForm, zone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition font-medium"
                      >
                        <option value="Zona Sudeste">Zona Sudeste</option>
                        <option value="Zona Sul">Zona Sul</option>
                        <option value="Zona Leste">Zona Leste</option>
                        <option value="Zona Norte">Zona Norte</option>
                        <option value="Centro">Centro</option>
                        <option value="Região Metropolitana">Região Metropolitana</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#25102b] mb-1">
                      Curso em Andamento
                    </label>
                    <input
                      name="course"
                      type="text"
                      placeholder="Ex: Auxiliar Administrativo / Atendimento"
                      value={suggestionForm.course}
                      onChange={(e) => setSuggestionForm({ ...suggestionForm, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#25102b] mb-1">
                      Sua Sugestão ou Dúvida *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Escreva sua sugestão..."
                      value={suggestionForm.message}
                      onChange={(e) => setSuggestionForm({ ...suggestionForm, message: e.target.value })}
                      className="w-full p-3.5 text-xs rounded-xl border border-[#eadfeb] focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 text-xs sm:text-sm font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>Registrar Minha Sugestão</span>
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#4b0d59] text-[#ffc928] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-black text-[#25102b] text-lg">
                      Sugestão Registrada com Sucesso!
                    </h5>
                    <p className="text-xs text-[#534657] max-w-md mx-auto mt-1 leading-relaxed">
                      Sua mensagem foi armazenada. Se preferir, você pode encaminhá-la diretamente à coordenação pelo WhatsApp.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleSendSuggestionToWhatsApp}
                      className="w-full sm:w-auto px-5 py-3 text-xs font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Encaminhar via WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        setSuggestionSubmitted(false);
                        setSuggestionForm({ studentName: '', birthDate: '', responsibleName: '', neighborhood: '', zone: 'Zona Sudeste', course: '', message: '' });
                      }}
                      className="w-full sm:w-auto px-4 py-3 text-xs font-bold text-[#4b0d59] bg-white border border-[#eadfeb] rounded-xl hover:bg-[#f1e2f4] transition cursor-pointer"
                    >
                      Enviar Outra Sugestão
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f7f3f8] border-t border-[#eadfeb] flex items-center justify-between text-xs text-[#534657]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#812392]" />
            <span>Polos Dirceu e Centro · Teresina - PI</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[#eadfeb] bg-white hover:bg-[#eadfeb] font-bold text-[#25102b] transition cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
