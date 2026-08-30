import React from 'react';
import { MemoryMapComparator } from '../simulations/MemoryMapComparator';

export const Slide07_MemoryMappedIO: React.FC = () => {
  return (
    <div className="flex-1 flex px-12 py-8 overflow-hidden gap-12">
      {/* Left Pane: Content */}
      <div className="flex-1 flex flex-col pt-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-text-primary mb-6">
          I/O Addressing
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            How does the CPU distinguish between reading from RAM and reading from a peripheral device? There are two primary architectural approaches:
          </p>

          <div className="bg-surface-elevated border-structural p-5">
            <h4 className="font-sans font-semibold text-hw-control mb-2">1. Isolated (Port-Mapped) I/O</h4>
            <p className="text-sm">
              Uses separate address spaces for memory and I/O. Requires dedicated CPU control lines (e.g., <code className="bg-surface-inset px-1">IOR#</code>, <code className="bg-surface-inset px-1">IOW#</code>) and special instructions (<code className="bg-surface-inset px-1">IN</code>, <code className="bg-surface-inset px-1">OUT</code> in x86).
            </p>
          </div>

          <div className="bg-surface-elevated border-structural p-5">
            <h4 className="font-sans font-semibold text-hw-address mb-2">2. Memory-Mapped I/O (MMIO)</h4>
            <p className="text-sm">
              I/O devices share the same address space as memory. The CPU uses standard memory access instructions (<code className="bg-surface-inset px-1">MOV</code>, <code className="bg-surface-inset px-1">LOAD</code>, <code className="bg-surface-inset px-1">STORE</code>). The memory controller decodes the address and routes it to the device. Common in ARM and modern PCIe.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane: Simulator */}
      <div className="flex-1">
        <MemoryMapComparator />
      </div>
    </div>
  );
};
