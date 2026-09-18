import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  Sparkles, 
  Quote, 
  CheckCircle,
  Video,
  ArrowRight
} from 'lucide-react';
import { VIDEO_STORIES } from '../data/siteData';
import { VideoStory } from '../types';
import { getMediaUrl, getLocalFallbackMediaUrl } from '../utils/media';

interface VideoStoriesProps {
  onOpenCurriculum: (unit?: 'dirceu' | 'centro') => void;
  stories?: VideoStory[];
}

export const VideoStories: React.FC<VideoStoriesProps> = ({ 
  onOpenCurriculum,
  stories = VIDEO_STORIES 
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoStory | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const openVideoModal = (story: VideoStory) => {
    setSelectedVideo(story);
  };

  const closeVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideo(null);
  };

  return (
    <section id="videos-historias" className="py-8 md:py-12 bg-white border-b border-[#eadfeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-xs font-black tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#812392]" />
              <span>JOVENS TALENTOS · GRANDES HISTÓRIAS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#25102b] tracking-tight leading-tight">
              Quando encaminhamento encontra oportunidade, novas histórias começam.
            </h2>
            <p className="text-[#6c6570] text-sm sm:text-base mt-1.5 leading-relaxed">
              Assista aos depoimentos em vídeo gravados pelos próprios jovens encaminhados e contratados pela Oficina do Aprendiz em Teresina.
            </p>
          </div>

          <button
            onClick={() => onOpenCurriculum()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-black text-[#531062] bg-[#f1e2f4] hover:bg-[#efe3f2] border border-[#e5d9e8] rounded-xl transition self-start md:self-auto shadow-2xs cursor-pointer"
          >
            <span>Cadastre Seu Currículo</span>
            <ArrowRight className="w-4 h-4 text-[#812392]" />
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => openVideoModal(story)}
              className="group relative bg-[#17081d] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between border border-[#381044] aspect-[9/14] sm:aspect-[9/15]"
            >
              {/* Background Video Preview */}
              <video
                src={getMediaUrl(story.mediaKey)}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLVideoElement).src = getLocalFallbackMediaUrl(story.mediaKey);
                }}
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17081d] via-[#17081d]/50 to-transparent" />

              {/* Top Tag & Badge */}
              <div className="relative z-10 p-3.5 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black tracking-wider uppercase bg-[#531062]/90 text-[#ffc928] backdrop-blur-xs flex items-center gap-1 border border-[#812392]/50">
                  <Video className="w-3 h-3" />
                  <span>Depoimento Real</span>
                </span>
                <span className="text-xs text-[#d7a8df] font-mono bg-black/50 px-2 py-0.5 rounded-sm">
                  {story.duration || 'Vídeo'}
                </span>
              </div>

              {/* Center Play Button Pulse */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="w-12 h-12 rounded-full bg-[#ffc928] text-[#28102d] flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-white group-hover:text-[#531062] transition-all duration-300">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Quote & Caption */}
              <div className="relative z-10 p-3.5 sm:p-4 text-white">
                <Quote className="w-4 h-4 text-[#ffc928] mb-1.5 opacity-90" />
                <p className="text-xs sm:text-sm font-medium leading-snug line-clamp-3 text-slate-100 group-hover:text-white transition">
                  {story.caption}
                </p>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-slate-300">
                  <span className="font-bold text-[#ffc928]">{story.authorNeighborhood || 'Teresina - PI'}</span>
                  <span className="flex items-center gap-1 text-[#ffc928]">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verificado</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Full Video Modal Player */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={closeVideoModal}
        >
          <div 
            className="relative w-full max-w-lg bg-[#1f0927] rounded-2xl overflow-hidden shadow-2xl border border-[#7b1a90] flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#17081d] border-b border-[#381044] flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffc928] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-[#e9dfea]">
                  História da Oficina do Aprendiz · Teresina
                </span>
              </div>
              <button
                onClick={closeVideoModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#381044] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas */}
            <div className="relative bg-black flex items-center justify-center flex-1 overflow-hidden min-h-[360px] sm:min-h-[480px]">
              <video
                ref={videoRef}
                src={getMediaUrl(selectedVideo.mediaKey)}
                autoPlay
                controls
                playsInline
                className="w-full h-full max-h-[65vh] object-contain"
                onError={(e) => {
                  (e.target as HTMLVideoElement).src = getLocalFallbackMediaUrl(selectedVideo.mediaKey);
                }}
              />
            </div>

            {/* Caption & Call to Action Footer */}
            <div className="p-5 bg-[#17081d] border-t border-[#381044] text-white space-y-4">
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-[#ffc928] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                  {selectedVideo.caption}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-[#d7a8df] text-center sm:text-left">
                  Você também pode começar sua trajetória profissional hoje mesmo.
                </span>
                <button
                  onClick={() => {
                    closeVideoModal();
                    onOpenCurriculum();
                  }}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-md transition whitespace-nowrap cursor-pointer"
                >
                  Cadastrar Meu Currículo
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
