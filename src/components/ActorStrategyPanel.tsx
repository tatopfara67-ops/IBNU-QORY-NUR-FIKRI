import React from 'react';
import { ActorStrategy } from '../services/gemini';
import { BrainCircuit } from 'lucide-react';
import clsx from 'clsx';

interface ActorStrategyPanelProps {
  strategies: ActorStrategy[];
}

export const ActorStrategyPanel: React.FC<ActorStrategyPanelProps> = ({ strategies }) => {
  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <BrainCircuit className="w-4 h-4" />
        Actor Strategy Model
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        {strategies?.map((strategy, index) => (
          <div key={index} className="bg-panel border border-line p-3 rounded space-y-2">
            <div className="text-sm font-bold text-ink">{strategy.actor}</div>
            <div className="text-[10px] text-muted uppercase tracking-wider">Priorities</div>
            <ul className="list-disc list-inside text-xs text-ink space-y-0.5">
              {strategy.priorities?.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <div className="flex justify-between text-[10px] text-muted font-mono">
              <span>Risk: {strategy.riskTolerance}</span>
              <span>Pattern: {strategy.responsePattern}</span>
            </div>
            <div className="mt-2 p-2 bg-bg rounded text-xs text-green font-medium">
              Prediction: {strategy.predictedResponse}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
