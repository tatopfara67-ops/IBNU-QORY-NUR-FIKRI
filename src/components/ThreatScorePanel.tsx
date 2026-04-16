import React from 'react';
import { MultiFactorThreatScore } from '../services/gemini';
import { ShieldAlert } from 'lucide-react';

interface ThreatScorePanelProps {
  score: MultiFactorThreatScore;
}

export const ThreatScorePanel: React.FC<ThreatScorePanelProps> = ({ score }) => {
  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <ShieldAlert className="w-4 h-4" />
        Multi-Factor Threat Score
      </div>
      <div className="p-4 space-y-4">
        <div className="text-3xl font-mono font-bold text-center text-red">
          {(score.totalScore || 0).toFixed(2)}
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px] text-muted">
          <div>Probability: <span className="text-ink">{score.probability}</span></div>
          <div>Impact: <span className="text-ink">{score.impact}</span></div>
          <div>Escalation: <span className="text-ink">{score.escalation}</span></div>
          <div>Capability: <span className="text-ink">{score.actorCapability}</span></div>
          <div className="col-span-2">Strategic Importance: <span className="text-ink">{score.strategicImportance}</span></div>
        </div>
      </div>
    </div>
  );
};
