import React from 'react';
import { DMATransferVisualizer } from '../simulations/DMATransferVisualizer';
import { KaTeXBlock } from '../common/KaTeXBlock';

export const Slide04_DMAArchitecture: React.FC = () => {
  return (
    <div className="flex-1 flex px-12 py-8 overflow-hidden gap-12">
      {/* Left Pane: Content */}
      <div className="flex-1 flex flex-col pt-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-text-primary mb-6">
          Direct Memory Access (DMA)
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            For high-speed bulk transfers, interrupts are too slow due to the context switching overhead per byte/word. A <strong className="text-text-primary">DMA Controller (DMAC)</strong> takes over bus arbitration and moves data directly between the peripheral and memory without CPU intervention.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-elevated border-structural p-4 border-t-2 border-t-hw-control">
              <h4 className="font-sans font-semibold text-text-primary mb-2">Burst Mode</h4>
              <p className="text-sm">DMA requests the bus and holds it continuously until the entire block of data is transferred. CPU is blocked from memory.</p>
            </div>
            <div className="bg-surface-elevated border-structural p-4 border-t-2 border-t-hw-address">
              <h4 className="font-sans font-semibold text-text-primary mb-2">Cycle Stealing</h4>
              <p className="text-sm">DMA transfers one word, yields the bus to the CPU for a cycle, then requests again. Interleaves execution.</p>
            </div>
          </div>

          <KaTeXBlock formula="\text{Time}_{burst} = \frac{\text{Block Size}}{\text{DMA Transfer Rate}}" block />
        </div>
      </div>

      {/* Right Pane: Simulator */}
      <div className="flex-1">
        <DMATransferVisualizer />
      </div>
    </div>
  );
};
