import React from 'react';

export const Slide06_IOInterfaces: React.FC = () => {
  return (
    <div className="flex-1 flex px-12 py-8 overflow-hidden gap-12">
      {/* Left Pane: Content */}
      <div className="flex-1 flex flex-col pt-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-text-primary mb-6">
          I/O Interfaces
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            An I/O interface bridges the gap between the system bus (parallel) and the peripheral device (which may be serial or parallel).
          </p>

          <table className="w-full text-left font-mono text-sm border-structural">
            <thead className="bg-surface-inset border-structural-b">
              <tr>
                <th className="p-3">Interface Type</th>
                <th className="p-3">Characteristics</th>
                <th className="p-3">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              <tr>
                <td className="p-3 text-hw-control font-bold">Parallel</td>
                <td className="p-3">High bandwidth, short distance, prone to skew.</td>
                <td className="p-3 text-text-muted">SCSI, IDE, LPT</td>
              </tr>
              <tr>
                <td className="p-3 text-hw-address font-bold">Serial (Async)</td>
                <td className="p-3">Low pin count, longer distance, start/stop bits.</td>
                <td className="p-3 text-text-muted">RS-232, UART</td>
              </tr>
              <tr>
                <td className="p-3 text-hw-data font-bold">Serial (Sync)</td>
                <td className="p-3">Shared clock, high speed serial link.</td>
                <td className="p-3 text-text-muted">SPI, I2C, USB, PCIe</td>
              </tr>
            </tbody>
          </table>

          <p className="text-sm border-l-2 border-hw-data pl-4 py-1">
            <strong>Trend:</strong> Modern architectures favor high-speed synchronous serial interfaces (like PCIe and USB) over parallel buses to avoid clock skew and crosstalk at gigahertz frequencies.
          </p>
        </div>
      </div>

      {/* Right Pane: Visual */}
      <div className="flex-1 bg-surface-elevated border-structural p-6 flex flex-col gap-8">
        <h3 className="font-sans font-semibold text-text-primary tracking-tight border-structural-b pb-2 mb-2 w-full text-left">
          Parallel to Serial Conversion
        </h3>

        <div className="flex-1 flex flex-col items-center justify-center relative">

          <div className="flex items-center w-full max-w-md gap-4">

            {/* Parallel Side */}
            <div className="flex flex-col gap-1 items-end w-16">
              {[1,0,1,1,0,1,0,1].map((b,i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-text-muted">{b}</span>
                  <div className={`w-12 h-0.5 ${b ? 'bg-hw-data' : 'bg-surface-inset'}`}></div>
                </div>
              ))}
            </div>

            {/* Shift Register */}
            <div className="w-32 h-32 bg-surface-base border-structural flex flex-col items-center justify-center p-2 relative">
              <span className="font-mono text-xs font-bold mb-2">Shift Reg</span>
              <div className="flex gap-0.5 w-full">
                {[1,0,1,1,0,1,0,1].map((b,i) => (
                  <div key={i} className={`flex-1 h-6 border-structural flex items-center justify-center text-[10px] font-mono ${b ? 'bg-hw-data/20 text-hw-data' : 'text-text-muted'}`}>{b}</div>
                ))}
              </div>
              <div className="absolute -bottom-6 flex items-center gap-1 font-mono text-[10px] text-hw-control">
                <span>CLK</span> <div className="w-4 h-4 border border-hw-control rounded-full flex items-center justify-center">∿</div>
              </div>
            </div>

            {/* Serial Side */}
            <div className="flex-1 flex flex-col items-start gap-1 w-full pl-2">
              <div className="relative w-full h-8 flex items-center">
                <div className="absolute w-full h-0.5 bg-border-color"></div>
                {/* Simulated packet moving */}
                <div className="absolute w-1/3 h-2 bg-hw-data top-1/2 -translate-y-1/2 left-4 shadow-[0_0_8px_currentColor]"></div>
              </div>
              <span className="font-mono text-[10px] text-text-muted tracking-widest">[ 1 0 1 1 0 1 0 1 ]</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
