import React from 'react';
import { BusBandwidthCalculator } from '../simulations/BusBandwidthCalculator';
import { KaTeXBlock } from '../common/KaTeXBlock';

export const Slide01_IntroIO: React.FC = () => {
  return (
    <div className="flex-1 flex px-12 py-8 overflow-hidden gap-12">
      {/* Left Pane: Content */}
      <div className="flex-1 flex flex-col pt-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-text-primary mb-6">
          I/O Subsystems & Throughput
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            Peripheral devices are hardware components that expand a computer's capabilities. Because these devices range from slow human-interface devices to blazing-fast storage, managing their <strong className="text-text-primary font-mono bg-surface-inset px-1">throughput</strong> and <strong className="text-text-primary font-mono bg-surface-inset px-1">bandwidth</strong> is a core challenge.
          </p>

          <div className="bg-surface-elevated border-structural p-6 mt-4">
            <h3 className="font-mono text-sm uppercase tracking-widest text-hw-control mb-4">Device Classifications</h3>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex justify-between border-structural-b pb-2">
                <span className="text-text-primary">Human Interface (KB, Mouse)</span>
                <span className="text-text-muted">&lt; 1 MB/s</span>
              </li>
              <li className="flex justify-between border-structural-b pb-2">
                <span className="text-text-primary">Network (NIC, Wi-Fi)</span>
                <span className="text-text-muted">10 - 1,000 MB/s</span>
              </li>
              <li className="flex justify-between">
                <span className="text-text-primary">Storage (NVMe SSD)</span>
                <span className="text-hw-data">3,000 - 14,000 MB/s</span>
              </li>
            </ul>
          </div>

          <KaTeXBlock formula="\text{Throughput} = \frac{\text{Bytes Transferred}}{\text{Time Taken}}" block />
        </div>
      </div>

      {/* Right Pane: Simulator */}
      <div className="flex-1">
        <BusBandwidthCalculator />
      </div>
    </div>
  );
};
