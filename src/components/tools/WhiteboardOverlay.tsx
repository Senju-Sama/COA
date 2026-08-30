import React, { useRef } from 'react';
import { useToolsStore } from '../../store/useToolsStore';
import { useWhiteboard } from '../../hooks/useWhiteboard';

export const WhiteboardOverlay: React.FC = () => {
  const { isWhiteboardActive, activeTool, setTool, strokeColor, setColor } = useToolsStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { onPointerDown, onPointerMove, onPointerUp, clearCanvas, undo } = useWhiteboard(canvasRef);

  if (!isWhiteboardActive) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-30 cursor-crosshair touch-none"
        onPointerDown={onPointerDown as any}
        onPointerMove={onPointerMove as any}
        onPointerUp={onPointerUp as any}
        onPointerOut={onPointerUp as any}
        onPointerCancel={onPointerUp as any}
      />

      {/* Floating Tool Palette */}
      <div className="absolute top-24 left-6 z-40 bg-surface-elevated border-structural flex flex-col gap-1 p-2 shadow-2xl">
        <div className="text-[10px] font-mono text-text-muted text-center uppercase tracking-wider mb-2 border-structural-b pb-1">Tools</div>

        {/* Tools */}
        <ToolBtn active={activeTool === 'pen'} onClick={() => setTool('pen')} label="Pen" />
        <ToolBtn active={activeTool === 'highlighter'} onClick={() => setTool('highlighter')} label="Highlighter" />
        <ToolBtn active={activeTool === 'eraser'} onClick={() => setTool('eraser')} label="Eraser" />

        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 my-2" />

        {/* Colors */}
        {['#10b981', '#f59e0b', '#06b6d4', '#ef4444', '#f4f4f5'].map(c => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-8 h-8 flex items-center justify-center transition-all ${strokeColor === c ? 'bg-surface-inset border-structural' : 'hover:bg-surface-inset border border-transparent'}`}
            title={c}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c }} />
          </button>
        ))}

        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 my-2" />

        {/* Actions */}
        <button onClick={undo} className="w-8 h-8 font-mono text-xs hover:bg-surface-inset transition-colors">↶</button>
        <button onClick={clearCanvas} className="w-8 h-8 font-mono text-xs hover:bg-hw-interrupt hover:text-white transition-colors">✕</button>
      </div>
    </>
  );
};

const ToolBtn = ({ active, onClick, label }: any) => (
  <button
    onClick={onClick}
    className={`w-8 h-8 font-mono text-xs transition-colors flex items-center justify-center ${active ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900' : 'bg-surface-inset text-text-secondary hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
    title={label}
  >
    {label[0]}
  </button>
);
