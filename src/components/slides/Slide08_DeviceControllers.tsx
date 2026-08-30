import React from 'react';

export const Slide08_DeviceControllers: React.FC = () => {
  return (
    <div className="flex-1 flex px-12 py-8 overflow-hidden gap-12">
      {/* Left Pane: Content */}
      <div className="flex-1 flex flex-col pt-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-text-primary mb-6">
          Device Controller Registers
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            An I/O module (or Device Controller) presents a standard software interface to the CPU, typically consisting of three main types of registers.
          </p>

          <div className="grid gap-4">
            <div className="bg-surface-elevated border-structural p-4 flex gap-4 items-start">
              <div className="w-16 h-16 bg-hw-data/10 border-hw-data border-structural flex items-center justify-center font-mono text-hw-data font-bold">DR</div>
              <div>
                <h4 className="font-sans font-semibold text-text-primary">Data Register</h4>
                <p className="text-sm mt-1">Holds the actual payload (e.g., the character typed on a keyboard, or the block of pixels for a display).</p>
              </div>
            </div>

            <div className="bg-surface-elevated border-structural p-4 flex gap-4 items-start">
              <div className="w-16 h-16 bg-hw-control/10 border-hw-control border-structural flex items-center justify-center font-mono text-hw-control font-bold">CR</div>
              <div>
                <h4 className="font-sans font-semibold text-text-primary">Control Register</h4>
                <p className="text-sm mt-1">Written by the CPU to send commands to the device (e.g., "Start Spin", "Reset", "Enable Interrupts").</p>
              </div>
            </div>

            <div className="bg-surface-elevated border-structural p-4 flex gap-4 items-start">
              <div className="w-16 h-16 bg-hw-address/10 border-hw-address border-structural flex items-center justify-center font-mono text-hw-address font-bold">SR</div>
              <div>
                <h4 className="font-sans font-semibold text-text-primary">Status Register</h4>
                <p className="text-sm mt-1">Read by the CPU to determine device state (e.g., "Data Ready", "Busy", "Error").</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Visual Register Map */}
      <div className="flex-1 bg-surface-elevated border-structural p-6 flex flex-col items-center justify-center">
        <h3 className="font-sans font-semibold text-text-primary tracking-tight border-structural-b pb-2 mb-8 w-full text-left">
          Status Register Bitfield Map
        </h3>

        <div className="w-full max-w-md bg-surface-base border-structural p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-sm text-text-secondary">BASE_ADDR + 0x04</span>
            <span className="font-mono text-xs bg-surface-inset px-2 py-1">READ-ONLY</span>
          </div>

          {/* Bitfield Box */}
          <div className="flex border-structural h-12">
            {[
              { b: 7, label: 'ERR', color: 'bg-hw-interrupt text-white' },
              { b: 6, label: 'RDY', color: 'bg-hw-data text-white' },
              { b: 5, label: 'BSY', color: 'bg-surface-inset text-text-muted' },
              { b: 4, label: '-', color: 'bg-surface-inset text-text-muted opacity-50' },
              { b: 3, label: '-', color: 'bg-surface-inset text-text-muted opacity-50' },
              { b: 2, label: '-', color: 'bg-surface-inset text-text-muted opacity-50' },
              { b: 1, label: 'TXE', color: 'bg-surface-inset text-text-muted' },
              { b: 0, label: 'RXNE', color: 'bg-surface-inset text-text-muted' },
            ].map(bit => (
              <div key={bit.b} className={`flex-1 border-structural-r last:border-r-0 flex flex-col items-center justify-center ${bit.color}`}>
                <span className="font-bold text-sm">{bit.b === 7 || bit.b === 6 ? '1' : '0'}</span>
              </div>
            ))}
          </div>

          {/* Bit Labels */}
          <div className="flex font-mono text-[9px] text-text-muted text-center h-8">
            <div className="flex-1">Error Flag</div>
            <div className="flex-1">Data Ready</div>
            <div className="flex-1">Busy</div>
            <div className="flex-1">Resvd</div>
            <div className="flex-1">Resvd</div>
            <div className="flex-1">Resvd</div>
            <div className="flex-1">TX Empty</div>
            <div className="flex-1">RX Not Empty</div>
          </div>

          <div className="bg-surface-inset border-structural p-3 font-mono text-xs text-hw-data">
            Current Status: 0xC0 (Error, Ready)
          </div>

        </div>
      </div>
    </div>
  );
};
