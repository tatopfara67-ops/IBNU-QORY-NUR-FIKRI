import React from 'react';
import { BrainCircuit, CheckCircle2, AlertTriangle, ShieldCheck, EyeOff } from 'lucide-react';
import type { IntelligenceLogicLayer } from '../services/gemini';

interface IntelligenceLogicPanelProps {
  logicLayers: IntelligenceLogicLayer[];
}

export function IntelligenceLogicPanel({ logicLayers }: IntelligenceLogicPanelProps) {
  const getIconForLayer = (layerName: string) => {
    if (layerName.includes('Dasar')) return <BrainCircuit className="w-5 h-5 text-blue" />;
    if (layerName.includes('Structured')) return <CheckCircle2 className="w-5 h-5 text-green" />;
    if (layerName.includes('OSINT')) return <ShieldCheck className="w-5 h-5 text-yellow" />;
    if (layerName.includes('Anti-Bias')) return <EyeOff className="w-5 h-5 text-red" />;
    return <BrainCircuit className="w-5 h-5 text-muted" />;
  };

  return (
    <div className="lg:col-span-3 panel overflow-hidden flex flex-col">
      <div className="panel-header">
        <BrainCircuit className="w-4 h-4" />
        <h2>Alur Logika Intelijen (Intelligence Logic Framework)</h2>
      </div>
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {logicLayers.map((layer, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-2 border-b border-line pb-2">
              {getIconForLayer(layer.layerName)}
              <div>
                <h3 className="font-semibold text-ink">{layer.layerName}</h3>
                <p className="text-xs text-muted">{layer.layerDescription}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {layer.components.map((comp, idx) => (
                <div key={idx} className="bg-panel rounded-lg p-3 border border-line hover:border-orange transition-colors shadow-sm">
                  <h4 className="text-sm font-medium text-orange mb-1">{comp.name}</h4>
                  <p className="text-xs text-muted mb-2 italic">{comp.description}</p>
                  <div className="bg-bg rounded p-2 text-xs text-ink leading-relaxed border-l-2 border-orange/30">
                    <span className="text-orange font-semibold mr-1">Penerapan:</span>
                    {comp.application}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
