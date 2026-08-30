import React, { useEffect, useState } from 'react';
import { TechnicalButton } from '../common/TechnicalButton';
import { SignalIndicator } from '../common/SignalIndicator';

export const DMATransferVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'burst' | 'cycle'>('cycle');
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const totalBlocks = 16;

  useEffect(() => {
    let int: ReturnType<typeof setInterval>;
    if (isPlaying) {
      int = setInterval(() => {
        setStep(s => {
          if (s >= totalBlocks * 2) {
            setIsPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, 200);
    }
    return () => clearInterval(int);
  }, [isPlaying, totalBlocks]);

  const reset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  // Logic:
  // In Burst mode, DMA takes bus completely after setup.
  // In Cycle Stealing, it alternates (CPU, DMA, CPU, DMA).

  const isDmaActive = mode === 'burst'
    ? step > 0 && step < totalBlocks * 2 // Burst: DMA active continuously after step 0
    : step % 2 === 1 && step < totalBlocks * 2; // Cycle Steal: Odd steps are DMA

  const transferred = mode === 'burst'
    ? Math.min(totalBlocks, Math.floor(step / 2))
    : Math.min(totalBlocks, Math.floor((step+1) / 2));

  return (
    <div className="flex flex-col h-full bg-surface-elevated border-structural p-6">
      <div className="flex justify-between items-center border-structural-b pb-2 mb-6">
        <h3 className="font-sans font-semibold text-text-primary tracking-tight">
          DMA Controller Simulator
        </h3>
        <div className="flex gap-2">
          <TechnicalButton active={mode === 'cycle'} onClick={() => { setMode('cycle'); reset(); }}>Cycle Steal</TechnicalButton>
          <TechnicalButton active={mode === 'burst'} onClick={() => { setMode('burst'); reset(); }}>Burst</TechnicalButton>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6">

        {/* Status Dashboard */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-inset border-structural p-3 font-mono text-sm flex flex-col gap-2">
            <div className="text-text-muted uppercase text-xs">DMAC Registers</div>
            <div className="flex justify-between"><span>MAR:</span> <span className="text-hw-address">0x{ (0x1000 + transferred * 4).toString(16).toUpperCase().padStart(4, '0') }</span></div>
            <div className="flex justify-between"><span>WC:</span> <span className="text-text-primary">{totalBlocks - transferred}</span></div>
          </div>

          <div className="bg-surface-inset border-structural p-3 flex flex-col justify-center gap-3">
            <SignalIndicator label="BUSREQ (DMA)" active={isDmaActive} colorClass="bg-hw-interrupt" />
            <SignalIndicator label="BUSACK (CPU)" active={isDmaActive} colorClass="bg-hw-data" />
          </div>
        </div>

        {/* Bus Timeline Visualization */}
        <div className="flex-1 relative border-structural bg-surface-base overflow-hidden flex items-center p-4">
          <div className="w-full flex gap-1 h-12">
            {Array.from({ length: totalBlocks * 2 }).map((_, i) => {
              const isDmaTurn = mode === 'burst' ? true : i % 2 === 1;
              const isActive = i < step;
              const isCurrent = i === step;

              return (
                <div
                  key={i}
                  className={`flex-1 transition-all duration-200 border-structural ${
                    isActive
                      ? isDmaTurn ? 'bg-hw-control/80 border-hw-control' : 'bg-hw-address/80 border-hw-address'
                      : 'bg-surface-inset opacity-50'
                  } ${isCurrent ? 'ring-1 ring-white' : ''}`}
                  title={isDmaTurn ? 'DMA Cycle' : 'CPU Cycle'}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-2 left-4 flex gap-4 text-[10px] font-mono uppercase text-text-muted">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-hw-address"></div> CPU Fetch</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-hw-control"></div> DMA Transfer</div>
          </div>
        </div>

      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-6">
        <TechnicalButton onClick={() => setIsPlaying(!isPlaying)} variant={isPlaying ? 'danger' : 'primary'} className="flex-1">
          {isPlaying ? 'PAUSE' : 'AUTO RUN'}
        </TechnicalButton>
        <TechnicalButton onClick={() => setStep(s => Math.min(totalBlocks * 2, s + 1))} disabled={isPlaying} className="flex-1">
          STEP CYCLE
        </TechnicalButton>
        <TechnicalButton onClick={reset}>
          RESET
        </TechnicalButton>
      </div>
    </div>
  );
};
