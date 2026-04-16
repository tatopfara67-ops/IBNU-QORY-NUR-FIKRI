import React from 'react';
import { SourceDiversity } from '../services/gemini';
import { Radio } from 'lucide-react';
import clsx from 'clsx';

interface SourceDiversityPanelProps {
  diversity: SourceDiversity;
}

export const SourceDiversityPanel: React.FC<SourceDiversityPanelProps> = ({ diversity }) => {
  const total = diversity.mediaSources + diversity.governmentSource + diversity.policySource + diversity.militarySource;
  
  const getBarWidth = (val: number) => total === 0 ? 0 : (val / total) * 100;

  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <Radio className="w-4 h-4" />
        Source Diversity Score
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-muted">
            <span>Media ({diversity.mediaSources})</span>
            <div className="w-24 h-1 bg-line rounded-full overflow-hidden">
              <div className="h-full bg-blue" style={{ width: `${getBarWidth(diversity.mediaSources)}%` }} />
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-muted">
            <span>Gov ({diversity.governmentSource})</span>
            <div className="w-24 h-1 bg-line rounded-full overflow-hidden">
              <div className="h-full bg-green" style={{ width: `${getBarWidth(diversity.governmentSource)}%` }} />
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-muted">
            <span>Policy ({diversity.policySource})</span>
            <div className="w-24 h-1 bg-line rounded-full overflow-hidden">
              <div className="h-full bg-yellow" style={{ width: `${getBarWidth(diversity.policySource)}%` }} />
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-muted">
            <span>Military ({diversity.militarySource})</span>
            <div className="w-24 h-1 bg-line rounded-full overflow-hidden">
              <div className="h-full bg-red" style={{ width: `${getBarWidth(diversity.militarySource)}%` }} />
            </div>
          </div>
        </div>
        <div className="p-2 bg-bg rounded text-xs text-ink italic">
          {diversity.interpretation}
        </div>
      </div>
    </div>
  );
};
