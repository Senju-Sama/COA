import React from 'react';
import { KaTeXBlock } from '../common/KaTeXBlock';

export const Slide09_Performance: React.FC = () => {
  return (
    <div className="flex-1 flex px-12 py-8 overflow-hidden gap-12">
      {/* Left Pane: Content */}
      <div className="flex-1 flex flex-col pt-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-text-primary mb-6">
          Performance & Bus Contention
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            System performance is heavily gated by <strong className="text-text-primary">bus contention</strong>. The Von Neumann bottleneck occurs because instructions and data share the same bus.
          </p>

          <div className="bg-surface-elevated border-structural p-5 space-y-4">
            <h4 className="font-sans font-semibold text-text-primary">Key Metrics</h4>

            <div>
              <span className="font-mono text-xs text-hw-control uppercase tracking-widest block mb-1">Latency</span>
              <p className="text-sm">The time delay between requesting data and receiving the first byte. Dominated by arbitration overhead and memory access times.</p>
            </div>

            <div>
              <span className="font-mono text-xs text-hw-data uppercase tracking-widest block mb-1">Effective Bandwidth</span>
              <p className="text-sm">The theoretical peak bandwidth reduced by protocol overhead (packet headers, ACKs) and wait states.</p>
            </div>
          </div>

          <KaTeXBlock formula="\text{Utilization} = \frac{\sum (\text{Device Throughput})}{\text{Bus Capacity}} \times 100\%" block />
        </div>
      </div>

      {/* Right Pane: Topology Diagram */}
      <div className="flex-1 bg-surface-elevated border-structural p-6 flex flex-col items-center justify-center">
        <h3 className="font-sans font-semibold text-text-primary tracking-tight border-structural-b pb-2 mb-8 w-full text-left">
          Modern Hierarchical Bus Topology
        </h3>

        <div className="w-full max-w-md flex flex-col items-center relative gap-8">

          <div className="w-full flex justify-between gap-4">
            <div className="flex-1 h-16 bg-surface-base border-structural flex items-center justify-center font-bold text-hw-control">CPU Core</div>
            <div className="flex-1 h-16 bg-surface-base border-structural flex items-center justify-center font-bold text-hw-control">L1/L2 Cache</div>
          </div>

          {/* High speed bus */}
          <div className="w-full h-4 bg-hw-data relative flex items-center justify-center">
            <span className="absolute bg-surface-elevated px-2 text-[10px] font-mono text-hw-data font-bold tracking-widest">FRONTSIDE BUS / QPI (High BW)</span>
          </div>

          <div className="w-48 h-16 bg-surface-base border-structural flex flex-col items-center justify-center font-bold text-text-primary">
            Memory Controller
            <span className="text-[10px] font-mono text-text-muted">(Northbridge)</span>
          </div>

          {/* PCIe bus */}
          <div className="w-full h-3 bg-hw-address relative flex items-center justify-center">
            <span className="absolute bg-surface-elevated px-2 text-[10px] font-mono text-hw-address font-bold tracking-widest">PCIe BUS</span>
          </div>

          <div className="w-full flex justify-between gap-4">
            <div className="flex-1 h-12 bg-surface-inset border-structural flex flex-col items-center justify-center">
              <span className="font-bold text-sm">GPU</span>
              <span className="text-[10px] font-mono text-hw-data">x16</span>
            </div>
            <div className="flex-1 h-12 bg-surface-inset border-structural flex flex-col items-center justify-center">
              <span className="font-bold text-sm">NVMe</span>
              <span className="text-[10px] font-mono text-hw-data">x4</span>
            </div>
          </div>

          {/* DMI / Southbridge */}
          <div className="w-full h-1 bg-zinc-600 relative flex items-center justify-center mt-2"></div>

          <div className="w-32 h-12 bg-surface-base border-structural flex flex-col items-center justify-center font-bold text-text-secondary text-sm">
            I/O Hub (PCH)
          </div>

        </div>

      </div>
    </div>
  );
};
