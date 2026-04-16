import React from 'react';
import { EscalationModel } from '../services/gemini';
import { TrendingUp } from 'lucide-react';
import clsx from 'clsx';

interface EscalationPanelProps {
  model: EscalationModel;
}

export const EscalationPanel: React.FC<EscalationPanelProps> = ({ model }) => {
  const getStageColor = (stage: string) => {
    if (stage?.includes('Stage 1')) return 'text-blue';
    if (stage?.includes('Stage 2')) return 'text-green';
    if (stage?.includes('Stage 3')) return 'text-yellow';
    if (stage?.includes('Stage 4')) return 'text-orange';
    if (stage?.includes('Stage 5')) return 'text-red';
    return 'text-muted';
  };

  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <TrendingUp className="w-4 h-4" />
        Escalation Model
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div className="text-4xl font-mono font-bold text-ink">
            {(model.score || 0).toFixed(1)}
          </div>
          <div className={clsx("text-sm font-bold uppercase tracking-wider", getStageColor(model.stage))}>
            {model.stage}
          </div>
        </div>
        <div className="text-xs text-muted leading-relaxed">
          {model.description}
        </div>
      </div>
    </div>
  );
};
