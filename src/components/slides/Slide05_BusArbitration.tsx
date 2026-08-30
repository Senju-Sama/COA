import React from 'react';
import { SignalIndicator } from '../common/SignalIndicator';

export const Slide05_BusArbitration: React.FC = () => {
  return (
    <div className="flex-1 flex px-12 py-8 overflow-hidden gap-12">
      {/* Left Pane: Content */}
      <div className="flex-1 flex flex-col pt-8">
        <h2 className="font-sans text-4xl font-semibold tracking-tight text-text-primary mb-6">
          Bus Arbitration
        </h2>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            When multiple devices (like the CPU and several DMA controllers) share the system bus, an arbiter must decide who gets control to prevent data collisions.
          </p>

          <div className="space-y-4 font-mono text-sm">
            <div className="bg-surface-elevated border-structural p-4">
              <h4 className="text-hw-control uppercase mb-2">Daisy Chaining (Centralized)</h4>
              <p className="text-text-secondary normal-case font-sans">
                A single Bus Grant signal passes sequentially from device to device. Physical proximity to the arbiter dictates priority.
              </p>
            </div>

            <div className="bg-surface-elevated border-structural p-4">
              <h4 className="text-hw-address uppercase mb-2">Independent Requests</h4>
              <p className="text-text-secondary normal-case font-sans">
                Each device has dedicated Request and Grant lines to the central arbiter, allowing dynamic priority scheduling.
              </p>
            </div>

            <div className="bg-surface-elevated border-structural p-4">
              <h4 className="text-hw-data uppercase mb-2">Distributed Arbitration</h4>
              <p className="text-text-secondary normal-case font-sans">
                No central arbiter. Devices use a shared priority bus to determine who has the highest priority ID during arbitration phases (e.g., SCSI).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Daisy Chain Visual */}
      <div className="flex-1 bg-surface-elevated border-structural p-6 flex flex-col items-center justify-center">
        <h3 className="font-sans font-semibold text-text-primary tracking-tight border-structural-b pb-2 mb-8 w-full text-left">
          Daisy Chain Architecture Topology
        </h3>

        <div className="w-full flex items-center gap-4 relative">

          <div className="w-24 h-24 bg-surface-base border-structural flex flex-col items-center justify-center z-10">
            <span className="font-bold">CPU</span>
            <span className="text-[10px] text-text-muted mt-1">Arbiter</span>
          </div>

          <div className="flex-1 flex relative items-center">
            {/* Bus lines */}
            <div className="absolute w-full flex flex-col gap-2">
              <div className="h-1 bg-hw-interrupt opacity-50 relative"><span className="absolute -top-4 text-[10px] text-hw-interrupt">BREQ (Shared)</span></div>
              <div className="h-1 bg-hw-control relative"><span className="absolute -top-4 text-[10px] text-hw-control">BGRANT</span></div>
            </div>

            {/* Devices inline */}
            <div className="w-full flex justify-around z-10 px-8 relative">
              <DeviceNode id="1" priority="High" active />
              <DeviceNode id="2" priority="Med" />
              <DeviceNode id="3" priority="Low" />
            </div>
          </div>

        </div>

        <div className="mt-12 text-sm text-text-secondary bg-surface-inset border-structural p-4">
          <SignalIndicator label="BGRANT Signal blocked at Device 1" active={true} colorClass="bg-hw-control" pulsing />
          <p className="mt-2 text-xs">Device 1 intercepting the grant signal prevents Device 2 and 3 from taking the bus, enforcing strict priority.</p>
        </div>
      </div>
    </div>
  );
};

const DeviceNode = ({ id, priority, active }: any) => (
  <div className={`w-16 h-16 border-structural flex flex-col items-center justify-center bg-surface-elevated ${active ? 'ring-2 ring-hw-control border-transparent' : ''}`}>
    <span className="font-mono text-sm text-text-primary">DEV {id}</span>
    <span className="font-mono text-[9px] text-text-muted mt-1">{priority}</span>
  </div>
);
