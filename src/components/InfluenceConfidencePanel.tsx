import React from 'react';
import { ActorInfluenceWeight, ConfidenceEstimation } from '../services/gemini';
import { BarChart3, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

interface InfluenceConfidencePanelProps {
  influenceWeights: ActorInfluenceWeight[];
  confidence: ConfidenceEstimation;
}

export const InfluenceConfidencePanel: React.FC<InfluenceConfidencePanelProps> = ({ influenceWeights, confidence }) => {
  const getConfidenceColor = (interpretation: string) => {
    switch (interpretation) {
      case 'WEAK_EVIDENCE': return 'text-red';
      case 'MODERATE': return 'text-yellow';
      case 'STRONG': return 'text-green';
      default: return 'text-muted';
    }
  };

  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <BarChart3 className="w-4 h-4" />
        Influence & Confidence
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-6">
        {/* Confidence Estimation */}
        <div className="bg-panel border border-line p-3 rounded">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider font-bold">Confidence Estimation</span>
            <span className={clsx("text-xs font-bold", getConfidenceColor(confidence.interpretation))}>
              {confidence.interpretation ? confidence.interpretation.replace('_', ' ') : 'N/A'}
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-ink mb-2">{(confidence.confidenceScore || 0).toFixed(3)}</div>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-muted">
            <div className="text-center">E: {(confidence.evidenceStrength || 0).toFixed(1)}</div>
            <div className="text-center">S: {(confidence.sourceCredibility || 0).toFixed(1)}</div>
            <div className="text-center">D: {(confidence.signalDiversity || 0).toFixed(1)}</div>
          </div>
        </div>

        {/* Actor Influence */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-muted uppercase tracking-wider font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Actor Influence Weights
          </div>
          {influenceWeights?.map((aw, i) => (
            <div key={i} className="flex justify-between items-center text-xs text-ink">
              <span className="truncate">{aw.actor}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-line rounded-full overflow-hidden">
                  <div className="h-full bg-blue" style={{ width: `${aw.weight * 100}%` }} />
                </div>
                <span className="font-mono w-8 text-right">{(aw.weight || 0).toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
