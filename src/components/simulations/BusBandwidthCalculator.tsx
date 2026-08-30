import React from 'react';
import { useSimStore } from '../../store/useSimStore';
import { KaTeXBlock } from '../common/KaTeXBlock';

export const BusBandwidthCalculator: React.FC = () => {
  const { simData, updateSimData } = useSimStore();

  const width = simData['bus_w'] || 32;
  const freq = simData['bus_f'] || 100;
  const cycles = simData['bus_c'] || 1;

  const throughput = (width * freq) / (8 * cycles);

  // Max theoretical is 64 bit * 500 MHz / 1 cycle = 4000 MB/s
  const utilization = Math.min(100, (throughput / 4000) * 100);

  return (
    <div className="flex flex-col h-full bg-surface-elevated border-structural p-6 space-y-6">
      <h3 className="font-sans font-semibold text-text-primary tracking-tight border-structural-b pb-2">
        Throughput Calculator
      </h3>

      <div className="grid grid-cols-1 gap-6 flex-1">

        <div className="space-y-4">
          <ParamSlider
            label="Bus Width (W)" val={width} min={8} max={64} step={8} unit="bits"
            onChange={(v: number) => updateSimData('bus_w', v)}
          />
          <ParamSlider
            label="Clock Freq (f)" val={freq} min={1} max={500} step={1} unit="MHz"
            onChange={(v: number) => updateSimData('bus_f', v)}
          />
          <ParamSlider
            label="Cycles/Transfer (C)" val={cycles} min={1} max={8} step={1} unit="cyc"
            onChange={(v: number) => updateSimData('bus_c', v)}
          />
        </div>

        <div className="bg-surface-inset border-structural p-4 flex flex-col justify-center">
          <KaTeXBlock formula="T = \frac{W \times f}{8 \times C}" block className="!my-0 !border-0 bg-transparent text-center mb-4" />

          <div className="flex justify-between items-end mb-2">
            <span className="font-mono text-xs text-text-secondary uppercase">Result</span>
            <span className="font-mono text-2xl font-bold text-hw-data">{throughput.toFixed(2)} MB/s</span>
          </div>

          {/* Bar Graph */}
          <div className="h-2 w-full bg-surface-base border-structural overflow-hidden relative">
            <div
              className="absolute left-0 top-0 bottom-0 bg-hw-data transition-all duration-300"
              style={{ width: `${utilization}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ParamSlider = ({ label, val, min, max, step, unit, onChange }: any) => (
  <div>
    <div className="flex justify-between font-mono text-xs mb-2 text-text-secondary">
      <span>{label}</span>
      <span className="text-text-primary bg-surface-inset px-2 py-0.5 border-structural">{val} {unit}</span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={val}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1 appearance-none bg-zinc-300 dark:bg-zinc-700 outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-hw-control [&::-webkit-slider-thumb]:rounded-none"
    />
  </div>
);
