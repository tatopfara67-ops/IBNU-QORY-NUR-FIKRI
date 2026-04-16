import React from 'react';
import { NarrativeRealityIndex } from '../services/gemini';
import { Gauge } from 'lucide-react';

interface NarrativeRealityPanelProps {
  index: NarrativeRealityIndex;
}

export const NarrativeRealityPanel: React.FC<NarrativeRealityPanelProps> = ({ index }) => {
  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <Gauge className="w-4 h-4" />
        Narrative vs Reality Index
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-panel p-2 rounded">
            <div className="text-[10px] text-muted">Narrative</div>
            <div className="text-lg font-bold text-yellow">{index.narrativeIntensity}</div>
          </div>
          <div className="bg-panel p-2 rounded">
            <div className="text-[10px] text-muted">Policy</div>
            <div className="text-lg font-bold text-blue">{index.policyIntensity}</div>
          </div>
          <div className="bg-panel p-2 rounded">
            <div className="text-[10px] text-muted">Military</div>
            <div className="text-lg font-bold text-red">{index.militaryIntensity}</div>
          </div>
        </div>
        <div className="p-2 bg-bg rounded text-xs text-ink italic">
          {index.interpretation}
        </div>
      </div>
    </div>
  );
};
