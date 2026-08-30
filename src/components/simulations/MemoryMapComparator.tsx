import React, { useState } from 'react';

export const MemoryMapComparator: React.FC = () => {
  const [address, setAddress] = useState('8000');

  const addrNum = parseInt(address || '0', 16);
  const isValid = !isNaN(addrNum) && addrNum >= 0 && addrNum <= 0xFFFF;

  // In Isolated I/O, I/O space is entirely separate from Memory space.
  // In Memory-Mapped I/O, I/O space takes up a chunk of the Memory space (e.g., top 4KB: F000-FFFF).

  const isMmio = addrNum >= 0xF000;

  return (
    <div className="flex flex-col h-full bg-surface-elevated border-structural p-6">
      <h3 className="font-sans font-semibold text-text-primary tracking-tight border-structural-b pb-2 mb-6">
        I/O Address Decoding
      </h3>

      <div className="flex gap-4 items-end mb-8">
        <div className="flex-1">
          <label className="block text-xs font-mono text-text-muted uppercase mb-1">Target Address (Hex)</label>
          <div className="flex">
            <span className="bg-surface-inset border-structural border-r-0 px-3 py-2 font-mono text-sm text-text-secondary">0x</span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0,4).toUpperCase())}
              className="flex-1 bg-surface-base border-structural px-3 py-2 font-mono text-sm text-text-primary outline-none focus:border-hw-control"
              placeholder="0000 - FFFF"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8">

        {/* Isolated I/O */}
        <div className="flex flex-col">
          <h4 className="text-xs font-mono text-text-secondary uppercase mb-2 text-center">Isolated I/O</h4>
          <div className="flex-1 flex gap-2">
            <div className="flex-1 border-structural relative flex flex-col items-center justify-center bg-surface-base opacity-50">
              <span className="absolute top-1 text-[10px] font-mono text-text-muted">FFFF</span>
              <span className="text-sm font-bold text-text-secondary">MEM</span>
              <span className="absolute bottom-1 text-[10px] font-mono text-text-muted">0000</span>
              {isValid && <Indicator addr={addrNum} max={0xFFFF} color="bg-hw-address" />}
            </div>
            <div className="flex-1 border-structural relative flex flex-col items-center justify-center bg-surface-base">
              <span className="absolute top-1 text-[10px] font-mono text-text-muted">FFFF</span>
              <span className="text-sm font-bold text-hw-control">I/O</span>
              <span className="absolute bottom-1 text-[10px] font-mono text-text-muted">0000</span>
              {isValid && <Indicator addr={addrNum} max={0xFFFF} color="bg-hw-control" />}
            </div>
          </div>
          <div className="mt-3 text-center bg-surface-inset border-structural p-2 font-mono text-xs text-hw-control">
            Requires IN/OUT instructions
          </div>
        </div>

        {/* Memory Mapped I/O */}
        <div className="flex flex-col">
          <h4 className="text-xs font-mono text-text-secondary uppercase mb-2 text-center">Memory-Mapped I/O</h4>
          <div className="flex-1 border-structural relative flex flex-col bg-surface-base">
            <span className="absolute top-1 left-1 text-[10px] font-mono text-text-muted z-10">FFFF</span>

            <div className="h-[10%] bg-hw-control/20 border-structural-b w-full flex items-center justify-center">
               <span className="text-xs font-bold text-hw-control">I/O (F000-FFFF)</span>
            </div>
            <div className="flex-1 flex items-center justify-center opacity-50">
               <span className="text-sm font-bold text-text-secondary">MEM</span>
            </div>

            <span className="absolute bottom-1 left-1 text-[10px] font-mono text-text-muted">0000</span>

            {isValid && <Indicator addr={addrNum} max={0xFFFF} color={isMmio ? 'bg-hw-control' : 'bg-hw-address'} />}
          </div>
          <div className="mt-3 text-center bg-surface-inset border-structural p-2 font-mono text-xs text-hw-address">
            Uses standard MOV instructions
          </div>
        </div>

      </div>
    </div>
  );
};

const Indicator = ({ addr, max, color }: { addr: number, max: number, color: string }) => {
  const percent = 100 - ((addr / max) * 100);
  return (
    <div
      className={`absolute left-0 right-0 h-1 z-20 ${color} transition-all duration-300 shadow-[0_0_8px_currentColor]`}
      style={{ top: `${percent}%` }}
    />
  );
};
