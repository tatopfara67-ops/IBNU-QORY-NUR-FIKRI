import React from 'react';
import { ScenarioProbability, RiskMatrix } from '../services/gemini';
import { BrainCircuit, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

interface ScenarioRiskPanelProps {
  scenarioProbabilities: ScenarioProbability[];
  riskMatrix: RiskMatrix;
}

export const ScenarioRiskPanel: React.FC<ScenarioRiskPanelProps> = ({ scenarioProbabilities, riskMatrix }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green';
      case 'MEDIUM': return 'text-yellow';
      case 'HIGH': return 'text-red';
      default: return 'text-muted';
    }
  };

  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <BrainCircuit className="w-4 h-4" />
        Scenario & Risk
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-6">
        {/* Scenario Probability */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-muted uppercase tracking-wider font-bold">Scenario Probabilities (Bayesian)</div>
          {scenarioProbabilities?.map((sp, i) => (
            <div key={i} className="text-xs text-ink bg-panel p-2 rounded border border-line">
              <div className="flex justify-between mb-1">
                <span className="truncate">{sp.scenario}</span>
                <span className="font-mono">{((sp.posteriorProbability || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-1 bg-line rounded-full overflow-hidden">
                <div className="h-full bg-blue" style={{ width: `${sp.posteriorProbability * 100}%` }} />
              </div>
              <div className="text-[9px] text-muted mt-1">Prior: {((sp.priorProbability || 0) * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>

        {/* Risk Matrix */}
        {riskMatrix && (
          <div className="bg-panel border border-line p-3 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Risk Matrix
              </span>
              <span className={clsx("text-xs font-bold", getRiskColor(riskMatrix.level))}>
                {riskMatrix.level}
              </span>
            </div>
            <div className="text-2xl font-mono font-bold text-ink mb-2">{(riskMatrix.riskScore || 0).toFixed(0)}</div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-muted">
              <div>Prob: {riskMatrix.probability}</div>
              <div>Impact: {riskMatrix.impact}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
