import React from 'react';
import { Cluster } from '../services/gemini';
import { Layers } from 'lucide-react';

interface ClusterDetectionPanelProps {
  clusters: Cluster[];
}

export const ClusterDetectionPanel: React.FC<ClusterDetectionPanelProps> = ({ clusters }) => {
  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <Layers className="w-4 h-4" />
        Cluster Detection
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        {clusters?.map((cluster) => (
          <div key={cluster.id} className="bg-panel border border-line p-3 rounded">
            <div className="text-[10px] font-mono text-blue uppercase tracking-wider font-bold mb-2">
              Cluster {cluster.id}: {cluster.name}
            </div>
            <ul className="space-y-1">
              {cluster.issues?.map((issue, i) => (
                <li key={i} className="text-xs text-ink flex items-start gap-2">
                  <span className="text-muted">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
