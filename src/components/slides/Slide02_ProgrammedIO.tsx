import React from 'react';
import { KaTeXBlock } from '../common/KaTeXBlock';

export const Slide02_ProgrammedIO: React.FC = () => {
  return (
    <div className="flex-1 flex px-12 py-8 overflow-hidden gap-12">
      {/* Left Pane: Content */}
      <div className="flex-1 flex flex-col pt-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-text-primary mb-6">
          Programmed I/O (Polling)
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            In Programmed I/O, the CPU is entirely responsible for extracting data from the device. It executes a <strong className="text-text-primary">busy-wait loop</strong> (spinlock) continuously checking the status register until the device indicates it is ready.
          </p>

          <div className="bg-surface-inset border-structural p-4 font-mono text-sm">
            <div className="text-text-muted mb-2">// Typical Polling Loop (x86 ASM)</div>
            <div className="text-hw-control">POLL:</div>
            <div className="ml-4">IN AL, STATUS_REG</div>
            <div className="ml-4">TEST AL, 1 <span className="text-text-muted ml-2">; Check Ready bit</span></div>
            <div className="ml-4 text-hw-interrupt">JZ POLL <span className="text-text-muted ml-5">; Spin if 0</span></div>
            <div className="ml-4">IN AL, DATA_REG</div>
          </div>

          <p>
            This incurs massive CPU overhead, calculated as the ratio of polling time to the interval between actual data events:
          </p>

          <KaTeXBlock formula="\text{Overhead} = \frac{T_{poll}}{T_{interval}} \times 100\%" block />
        </div>
      </div>

      {/* Right Pane: Diagram */}
      <div className="flex-1 bg-surface-elevated border-structural flex flex-col p-6">
        <h3 className="font-sans font-semibold text-text-primary tracking-tight border-structural-b pb-2 mb-6">
          Polling Flow Execution
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center gap-6 font-mono text-sm uppercase tracking-wider">
          <div className="border-structural px-6 py-3 bg-surface-inset text-text-primary">Read Status Reg</div>
          <div className="w-0.5 h-6 bg-border-color"></div>

          <div className="border-structural px-6 py-6 bg-surface-base rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-hw-address font-bold text-center">Ready?</span>
          </div>

          <div className="w-0.5 h-6 bg-border-color relative">
             <div className="absolute top-1/2 right-4 -translate-y-1/2 text-hw-interrupt text-xs">NO</div>
             {/* Simple visual feedback loop line */}
             <div className="absolute top-1/2 right-0 w-32 h-32 border-t border-r border-border-color border-solid rounded-tr-3xl -translate-y-[calc(100%+3rem)]"></div>
          </div>

          <div className="border-structural px-6 py-3 bg-hw-data/10 border-hw-data text-hw-data">Read Data Reg</div>
        </div>
      </div>
    </div>
  );
};
