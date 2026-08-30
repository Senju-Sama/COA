import React, { useState } from 'react';
import { TechnicalButton } from '../common/TechnicalButton';

export const InterruptCycleFlow: React.FC = () => {
  const [stage, setStage] = useState(0);

  const stages = [
    { id: 1, name: 'Device Raises IRQ', desc: 'Peripheral asserts interrupt request line.', registers: { PC: '0x0400', SP: '0x1FFF', PSW: '0x0002' } },
    { id: 2, name: 'Priority Resolution', desc: 'PIC resolves multiple IRQs, sends INTR to CPU.', registers: { PC: '0x0400', SP: '0x1FFF', PSW: '0x0002' } },
    { id: 3, name: 'Push Context (PC/PSW)', desc: 'CPU pushes current Program Counter and Status Word to stack.', registers: { PC: '0x0400', SP: '0x1FFD', PSW: '0x0000' } }, // SP decrements
    { id: 4, name: 'Fetch Vector Address', desc: 'CPU reads ISR starting address from Vector Table.', registers: { PC: '0xA000', SP: '0x1FFD', PSW: '0x0000' } }, // PC jumps to ISR
    { id: 5, name: 'ISR Execute & IRET', desc: 'ISR executes, then IRET pops old PC/PSW back.', registers: { PC: '0x0401', SP: '0x1FFF', PSW: '0x0002' } }, // Back to normal
  ];

  return (
    <div className="flex flex-col h-full bg-surface-elevated border-structural p-6">
      <h3 className="font-sans font-semibold text-text-primary tracking-tight border-structural-b pb-2 mb-6">
        Interrupt Execution Pipeline
      </h3>

      <div className="flex-1 grid grid-cols-2 gap-6">

        {/* Pipeline Steps */}
        <div className="space-y-2 flex flex-col justify-center">
          {stages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStage(i)}
              className={`w-full text-left p-3 border-structural transition-colors text-sm font-mono ${
                stage === i
                  ? 'bg-hw-interrupt text-white'
                  : stage > i
                    ? 'bg-surface-inset text-text-secondary hover:bg-zinc-800'
                    : 'bg-surface-base text-text-muted hover:bg-zinc-800'
              }`}
            >
              {s.id}. {s.name}
            </button>
          ))}
        </div>

        {/* State View */}
        <div className="flex flex-col gap-4">
          <div className="bg-surface-inset border-structural p-4 flex-1">
            <div className="text-xs font-mono text-text-muted uppercase mb-4">CPU State Map</div>

            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center border-structural-b pb-1">
                <span className="text-hw-control">PC</span>
                <span className="text-text-primary">{stages[stage].registers.PC}</span>
              </div>
              <div className="flex justify-between items-center border-structural-b pb-1">
                <span className="text-hw-address">SP</span>
                <span className="text-text-primary">{stages[stage].registers.SP}</span>
              </div>
              <div className="flex justify-between items-center border-structural-b pb-1">
                <span className="text-hw-data">PSW</span>
                <span className="text-text-primary">{stages[stage].registers.PSW}</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-text-secondary leading-relaxed">
              <strong className="text-text-primary block mb-1">Action:</strong>
              {stages[stage].desc}
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-end mt-6 gap-2">
        <TechnicalButton onClick={() => setStage(0)} disabled={stage === 0}>Reset</TechnicalButton>
        <TechnicalButton variant="primary" onClick={() => setStage(s => Math.min(4, s + 1))} disabled={stage === 4}>
          Step Pipeline
        </TechnicalButton>
      </div>
    </div>
  );
};
