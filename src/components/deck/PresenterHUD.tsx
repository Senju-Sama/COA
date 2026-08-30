import React from 'react';
import { useDeckStore } from '../../store/useDeckStore';
import { useToolsStore } from '../../store/useToolsStore';
import { useAudioFeedback } from '../../hooks/useAudioFeedback';
import { Volume2, VolumeX, PenTool, Focus, BookOpen, Grid, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export const PresenterHUD: React.FC = () => {
  const { prevSlide, nextSlide, currentSlide, isNotesOpen, toggleNotes, isOverviewOpen, toggleOverview, isShortcutsOpen, toggleShortcuts } = useDeckStore();
  const { isWhiteboardActive, toggleWhiteboard, isSpotlightActive, toggleSpotlight, isAudioMuted, toggleAudio } = useToolsStore();
  const { playClick, playToggle } = useAudioFeedback();

  const handleToggle = (action: () => void) => {
    playToggle();
    action();
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-surface-elevated border-structural shadow-2xl z-50">

      {/* Navigation */}
      <div className="flex border-structural-r">
        <button onClick={() => { playClick(); prevSlide(); }} className="p-3 hover:bg-surface-inset transition-colors border-structural-r text-text-secondary hover:text-text-primary group">
          <ChevronLeft size={20} className="group-active:-translate-x-1 transition-transform" />
        </button>
        <div className="px-4 py-3 font-mono text-sm flex items-center justify-center text-text-primary bg-surface-base">
          {currentSlide.toString().padStart(2, '0')}
        </div>
        <button onClick={() => { playClick(); nextSlide(); }} className="p-3 hover:bg-surface-inset transition-colors border-structural-l text-text-secondary hover:text-text-primary group">
          <ChevronRight size={20} className="group-active:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Tools */}
      <div className="flex p-1 gap-1">
        <HudButton active={isWhiteboardActive} onClick={() => handleToggle(toggleWhiteboard)} icon={<PenTool size={18} />} label="W" color="bg-hw-address" />
        <HudButton active={isSpotlightActive} onClick={() => handleToggle(toggleSpotlight)} icon={<Focus size={18} />} label="S" color="bg-hw-data" />
        <HudButton active={isNotesOpen} onClick={() => handleToggle(toggleNotes)} icon={<BookOpen size={18} />} label="N" color="bg-hw-control" />
        <HudButton active={isOverviewOpen} onClick={() => handleToggle(toggleOverview)} icon={<Grid size={18} />} label="O" color="bg-zinc-500" />

        <div className="w-px bg-zinc-200 dark:bg-zinc-800 my-2 mx-1" />

        <HudButton active={!isAudioMuted} onClick={() => handleToggle(toggleAudio)} icon={isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />} label="M" color="bg-hw-interrupt" />
        <HudButton active={isShortcutsOpen} onClick={() => handleToggle(toggleShortcuts)} icon={<HelpCircle size={18} />} label="?" color="bg-zinc-500" />
      </div>

    </div>
  );
};

const HudButton = ({ active, onClick, icon, label, color }: any) => (
  <button
    onClick={onClick}
    className="relative p-3 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors hover:bg-surface-inset"
  >
    {icon}
    {/* Active Pill Indicator */}
    <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full transition-opacity ${active ? `opacity-100 ${color}` : 'opacity-0'}`} />
    {/* Keyboard hint */}
    <div className="absolute bottom-1 right-1 text-[8px] font-mono text-text-muted opacity-50">{label}</div>
  </button>
);
