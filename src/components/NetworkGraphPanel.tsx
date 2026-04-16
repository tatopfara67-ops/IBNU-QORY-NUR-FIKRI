import React from 'react';
import { NetworkGraph } from '../services/gemini';
import { Share2 } from 'lucide-react';

interface NetworkGraphPanelProps {
  graph: NetworkGraph;
}

export const NetworkGraphPanel: React.FC<NetworkGraphPanelProps> = ({ graph }) => {
  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <Share2 className="w-4 h-4" />
        Network Influence Graph
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        <div className="space-y-2">
          <div className="text-[10px] text-muted uppercase tracking-wider">Influence Centrality</div>
          {graph.nodes?.map((node, index) => (
            <div key={index} className="flex justify-between text-xs text-ink">
              <span>{node.label}</span>
              <span className="font-mono text-green">{(node.influenceCentrality || 0).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="text-[10px] text-muted uppercase tracking-wider">Coalition Clusters</div>
          {graph.coalitionClusters?.map((cluster, index) => (
            <div key={index} className="text-xs text-ink bg-panel p-2 rounded">
              {cluster?.map(id => graph.nodes?.find(n => n.id === id)?.label).filter(Boolean).join(', ') || 'None'}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="text-[10px] text-muted uppercase tracking-wider">Relationships</div>
          {graph.edges?.map((edge, index) => (
            <div key={index} className="flex items-center justify-between text-xs text-muted bg-panel p-2 rounded">
              <span className="font-bold text-ink">{graph.nodes?.find(n => n.id === edge.from)?.label}</span>
              <span className="text-[10px] uppercase tracking-wider border-b border-line px-2">{edge.relationship}</span>
              <span className="font-bold text-ink">{graph.nodes?.find(n => n.id === edge.to)?.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
