import React from 'react';
import { SignalExtractionLayer } from '../services/gemini';
import { Radio, ShieldAlert, DollarSign, Swords, Globe } from 'lucide-react';
import clsx from 'clsx';

interface SignalExtractionPanelProps {
  data: SignalExtractionLayer;
}

export const SignalExtractionPanel: React.FC<SignalExtractionPanelProps> = ({ data }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'POLICY': return <ShieldAlert className="w-4 h-4 text-blue" />;
      case 'ECONOMIC': return <DollarSign className="w-4 h-4 text-green" />;
      case 'MILITARY': return <Swords className="w-4 h-4 text-red" />;
      case 'DIPLOMATIC': return <Globe className="w-4 h-4 text-yellow" />;
      default: return <Radio className="w-4 h-4 text-muted" />;
    }
  };

  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <Radio className="w-4 h-4" />
        Signal Extraction Layer
      </div>
      <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
        <div className="text-sm text-ink leading-relaxed">
          {data.summary}
        </div>
        <div className="space-y-3">
          {data.signals?.map((signal, index) => (
            <div key={index} className="bg-panel border border-line p-3 rounded flex items-start gap-3">
              <div className="mt-0.5">{getIcon(signal.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider font-bold">{signal.type} | {signal.source ? signal.source.replace('_', ' ') : 'N/A'}</span>
                  <span className="text-[10px] font-mono text-ink">Score: {((signal.intensity || 0) * (signal.weight || 0)).toFixed(1)}</span>
                </div>
                <div className="text-xs text-ink">{signal.description}</div>
                <div className="flex justify-between mt-2 text-[10px] text-muted">
                  <span>Intensity: {signal.intensity}</span>
                  <span>Weight: {(signal.weight || 0).toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
