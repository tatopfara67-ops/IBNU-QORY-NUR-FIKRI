import React from 'react';
import { ActorAlignment } from '../services/gemini';
import { Users } from 'lucide-react';

interface AlliancePanelProps {
  alignments: ActorAlignment[];
}

export const AlliancePanel: React.FC<AlliancePanelProps> = ({ alignments }) => {
  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <Users className="w-4 h-4" />
        Actor Alignment Matching
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-3">
        {alignments?.map((alignment, index) => (
          <div key={index} className="bg-panel border border-line p-3 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-ink">{alignment.actorA} - {alignment.actorB}</span>
              <span className="text-xs font-mono text-green">{((alignment.similarity || 0) * 100).toFixed(0)}%</span>
            </div>
            <div className="text-[10px] text-muted">
              Shared: {alignment.sharedPositions?.join(', ') || 'None'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
