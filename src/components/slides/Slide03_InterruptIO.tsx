import React from 'react';
import { InterruptCycleFlow } from '../simulations/InterruptCycleFlow';

export const Slide03_InterruptIO: React.FC = () => {
  return (
    <div className="flex-1 flex px-12 py-8 overflow-hidden gap-12">
      {/* Left Pane: Content */}
      <div className="flex-1 flex flex-col pt-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-text-primary mb-6">
          Interrupt-Driven I/O
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            To avoid the inefficiency of polling, devices assert an <strong className="text-text-primary font-mono">IRQ (Interrupt Request)</strong> line when they require attention. The CPU responds by suspending its current task to execute an <strong className="text-text-primary font-mono">ISR (Interrupt Service Routine)</strong>.
          </p>

          <div className="bg-surface-elevated border-structural p-6 mt-4">
            <h3 className="font-mono text-sm uppercase tracking-widest text-hw-interrupt mb-4">Context Switching</h3>
            <p className="text-sm mb-4">
              Before jumping to the ISR, the hardware automatically pushes critical state to the stack to ensure the original program can resume correctly.
            </p>
            <ul className="space-y-2 font-mono text-xs border-structural-l pl-4 border-hw-interrupt">
              <li><span className="text-hw-control w-12 inline-block">EFLAGS</span> (Processor Status Word)</li>
              <li><span className="text-hw-address w-12 inline-block">CS</span> (Code Segment)</li>
              <li><span className="text-hw-data w-12 inline-block">EIP</span> (Instruction Pointer)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Pane: Simulator */}
      <div className="flex-1">
        <InterruptCycleFlow />
      </div>
    </div>
  );
};
