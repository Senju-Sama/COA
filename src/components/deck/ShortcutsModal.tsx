import React from 'react';
import { useDeckStore } from '../../store/useDeckStore';

export const ShortcutsModal: React.FC = () => {
  const { isShortcutsOpen, toggleShortcuts } = useDeckStore();

  if (!isShortcutsOpen) return null;

  const shortcuts = [
    { key: 'Space / →', desc: 'Next Slide' },
    { key: '←', desc: 'Previous Slide' },
    { key: 'W', desc: 'Toggle Whiteboard Overlay' },
    { key: 'S', desc: 'Toggle Spotlight Focus Mode' },
    { key: 'N', desc: 'Toggle Presenter Notes Drawer' },
    { key: 'O', desc: 'Toggle Slide Overview Grid' },
    { key: 'M', desc: 'Toggle Audio Cues' },
    { key: 'F', desc: 'Toggle Fullscreen' },
    { key: '?', desc: 'Toggle this Help Modal' },
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-12">
      <div className="bg-surface-elevated border-structural w-full max-w-2xl flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-structural-b bg-surface-inset">
          <h2 className="font-sans text-xl font-semibold tracking-tight uppercase">Keyboard Shortcuts</h2>
          <button onClick={toggleShortcuts} className="font-mono text-sm tracking-widest text-text-muted hover:text-text-primary uppercase">
            Close [?]
          </button>
        </div>

        <div className="p-8 grid grid-cols-2 gap-x-12 gap-y-4">
          {shortcuts.map((s, i) => (
            <div key={i} className="flex justify-between items-center border-structural-b border-dashed pb-2">
              <span className="font-sans text-sm text-text-secondary">{s.desc}</span>
              <kbd className="font-mono text-xs bg-surface-inset border-structural px-2 py-1 text-text-primary">{s.key}</kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
