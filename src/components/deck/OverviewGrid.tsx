import React from 'react';
import { useDeckStore } from '../../store/useDeckStore';

// We'll need a way to render a mini version of the slide or just a title.
// For now, we'll use block colors and titles for the overview grid to keep performance high.
const slideTitles = [
  "Introduction to I/O Subsystems",
  "Programmed I/O & Polling",
  "Interrupt-Driven I/O Pipeline",
  "DMA Architecture & Cycle Stealing",
  "Bus Arbitration Strategies",
  "I/O Interfaces (Serial vs Parallel)",
  "Memory-Mapped vs Isolated I/O",
  "Device Controller Registers",
  "Bus Contention & Performance",
  "Interactive Assessment"
];

export const OverviewGrid: React.FC = () => {
  const { isOverviewOpen, toggleOverview, currentSlide, setSlide, totalSlides } = useDeckStore();

  if (!isOverviewOpen) return null;

  return (
    <div className="absolute inset-0 z-40 bg-surface-base/95 backdrop-blur-sm p-12 flex flex-col">
      <div className="flex justify-between items-center mb-8 border-structural-b pb-4">
        <h2 className="font-sans text-2xl font-semibold tracking-tight uppercase">Deck Overview</h2>
        <button onClick={toggleOverview} className="font-mono text-sm tracking-widest text-text-muted hover:text-text-primary uppercase border border-transparent hover:border-structural px-3 py-1 bg-surface-inset">
          [ESC] Close
        </button>
      </div>

      <div className="flex-1 grid grid-cols-5 gap-6 overflow-y-auto pr-4">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setSlide(i + 1); toggleOverview(); }}
            className={`flex flex-col text-left group border-structural transition-all duration-200 ${
              currentSlide === i + 1
                ? 'ring-1 ring-hw-control shadow-[0_0_15px_rgba(6,182,212,0.15)] bg-surface-elevated'
                : 'hover:border-zinc-500 bg-surface-inset opacity-80 hover:opacity-100'
            }`}
          >
            <div className="aspect-video w-full bg-surface-base border-structural-b flex items-center justify-center p-4">
              <span className="font-mono text-4xl font-bold text-surface-elevated opacity-20">{(i+1).toString().padStart(2, '0')}</span>
            </div>
            <div className="p-3">
              <div className="font-mono text-[10px] text-text-muted mb-1 uppercase tracking-wider">Slide {(i+1).toString().padStart(2, '0')}</div>
              <div className="font-sans text-sm font-semibold text-text-primary leading-tight line-clamp-2">
                {slideTitles[i]}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
