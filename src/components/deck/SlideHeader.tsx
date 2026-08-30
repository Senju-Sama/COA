import React from 'react';
import { useDeckStore } from '../../store/useDeckStore';
import { useToolsStore } from '../../store/useToolsStore';
import { Moon, Sun, Maximize } from 'lucide-react';

export const SlideHeader: React.FC = () => {
  const { currentSlide, totalSlides } = useDeckStore();
  const { theme, toggleTheme } = useToolsStore();

  const progress = (currentSlide / totalSlides) * 100;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <header className="relative flex justify-between items-center px-12 py-6 border-structural-b bg-surface-base shrink-0 z-10">
      {/* 1px Progress Indicator across the top edge */}
      <div className="absolute top-0 left-0 h-[2px] bg-surface-inset w-full">
        <div
          className="h-full bg-hw-control transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="px-3 py-1 border-structural bg-surface-inset font-mono text-sm tracking-wider text-text-muted">
          [COA-204]
        </div>
        <h1 className="font-sans font-semibold text-xl tracking-tight text-text-primary uppercase">
          Computer Architecture & Peripheral Subsystems
        </h1>
      </div>

      <div className="flex items-center gap-8 font-mono text-sm tracking-widest text-text-muted">
        <div className="flex gap-4">
          <button onClick={toggleTheme} className="hover:text-text-primary transition-colors">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={toggleFullscreen} className="hover:text-text-primary transition-colors">
            <Maximize size={18} />
          </button>
        </div>
        <div>
          SLIDE <span className="text-text-primary">{currentSlide.toString().padStart(2, '0')}</span> / {totalSlides.toString().padStart(2, '0')}
        </div>
      </div>
    </header>
  );
};
