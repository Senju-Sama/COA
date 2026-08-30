import React from 'react';

interface SignalIndicatorProps {
  label: string;
  active: boolean;
  colorClass?: string; // e.g. bg-hw-data
  pulsing?: boolean;
}

export const SignalIndicator: React.FC<SignalIndicatorProps> = ({
  label, active, colorClass = 'bg-hw-control', pulsing = false
}) => {
  return (
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
      <div className={`relative flex h-3 w-3 items-center justify-center`}>
        {active && pulsing && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${active ? colorClass : 'bg-zinc-300 dark:bg-zinc-700'}`}></span>
      </div>
      <span className={active ? 'text-zinc-900 dark:text-zinc-100 font-bold' : 'text-zinc-500 dark:text-zinc-500'}>
        {label}
      </span>
    </div>
  );
};
