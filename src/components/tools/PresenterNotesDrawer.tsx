import React from 'react';
import { useDeckStore } from '../../store/useDeckStore';
import { KaTeXBlock } from '../common/KaTeXBlock';

// In a real app this would be imported from a data file like the previous version
const notesData: Record<number, any> = {
  1: {
    points: ["Emphasize the difference between throughput (actual) and bandwidth (theoretical max).", "Ask students: Why isn't a mouse connected via PCIe?"],
    formulas: ["T = \\frac{W \\times f}{8 \\times C}"]
  },
  2: {
    points: ["Polling is a busy-wait loop.", "Show how CPU cycles are wasted checking the status register."],
    formulas: []
  },
  3: {
    points: ["Walk through the 5 steps carefully. This is always on the exam.", "The stack pointer decrements on push in x86 architecture."],
    formulas: []
  },
  4: {
    points: ["DMA takes the bus completely in Burst Mode.", "Cycle stealing interleaves accesses. Less impact on CPU instruction fetch, but slower transfer."],
    formulas: ["T_{burst} = \\frac{\\text{Bytes}}{\\text{DMA Rate}}"]
  },
  7: {
    points: ["Memory-mapped I/O uses standard MOV instructions.", "Isolated I/O requires IN/OUT instructions and separate control lines."],
    formulas: []
  }
};

export const PresenterNotesDrawer: React.FC = () => {
  const { isNotesOpen, toggleNotes, currentSlide } = useDeckStore();
  const note = notesData[currentSlide] || { points: ["No specific notes for this slide."], formulas: [] };

  return (
    <>
      {/* Backdrop */}
      {isNotesOpen && (
        <div
          className="absolute inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={toggleNotes}
        />
      )}

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-96 bg-surface-elevated border-structural-l z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isNotesOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-6 border-structural-b bg-surface-inset">
          <h3 className="font-sans text-lg font-semibold tracking-tight uppercase text-text-primary">Presenter Notes</h3>
          <button onClick={toggleNotes} className="font-mono text-sm tracking-widest text-text-muted hover:text-text-primary uppercase px-2 py-1 bg-surface-base border-structural hover:bg-zinc-800">
            [ESC]
          </button>
        </div>

        <div className="p-8 overflow-y-auto h-[calc(100%-80px)] flex flex-col gap-8">
          <div>
            <h4 className="font-mono text-xs text-hw-control uppercase tracking-widest mb-4">Talking Points</h4>
            <ul className="space-y-4">
              {note.points.map((p: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                  <span className="text-hw-control">→</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {note.formulas.length > 0 && (
            <div>
              <h4 className="font-mono text-xs text-hw-address uppercase tracking-widest mb-4">Formula Derivations</h4>
              {note.formulas.map((f: string, i: number) => (
                <KaTeXBlock key={i} formula={f} block className="!bg-surface-base !border-hw-address/30 text-hw-address" />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
