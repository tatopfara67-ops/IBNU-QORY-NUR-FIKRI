import React from 'react';
import { NarrativeRealityIndex, NarrativeSimilarity, EscalationIndex } from '../services/gemini';
import { BookOpen, GitCompare, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

interface GeoAnalyticsPanelProps {
  narrativeReality: NarrativeRealityIndex;
  similarities: NarrativeSimilarity[];
  escalation: EscalationIndex;
}

export const GeoAnalyticsPanel: React.FC<GeoAnalyticsPanelProps> = ({ narrativeReality, similarities, escalation }) => {
  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <BookOpen className="w-4 h-4" />
        Geopolitical Analytics
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-6">
        {/* Narrative vs Reality */}
        <div className="bg-panel border border-line p-3 rounded">
          <div className="text-[10px] font-mono text-muted uppercase tracking-wider font-bold mb-2">Narrative vs Reality</div>
          <div className="text-xs text-ink mb-2">{narrativeReality.interpretation ? narrativeReality.interpretation.replace('_', ' ') : 'N/A'}</div>
          <div className="flex justify-between text-[10px] text-muted">
            <span>N: {narrativeReality.narrativeIntensity}</span>
            <span>P: {narrativeReality.policyIntensity}</span>
            <span>M: {narrativeReality.militaryIntensity}</span>
          </div>
        </div>

        {/* Escalation Index */}
        {escalation && (
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-muted uppercase tracking-wider font-bold flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" /> Escalation Index: {escalation.totalEscalationScore}
            </div>
            {escalation.events?.map((e, i) => (
              <div key={i} className="flex justify-between text-xs text-ink">
                <span>{e.event}</span>
                <span className="font-mono">{e.score}</span>
              </div>
            ))}
          </div>
        )}

        {/* Narrative Similarity */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-muted uppercase tracking-wider font-bold flex items-center gap-1">
            <GitCompare className="w-3 h-3" /> Narrative Similarity
          </div>
          {similarities?.map((sim, i) => (
            <div key={i} className="text-xs text-ink bg-panel p-2 rounded border border-line">
              <div className="flex justify-between">
                <span className="truncate">{sim.articleA?.substring(0, 15)}... vs {sim.articleB?.substring(0, 15)}...</span>
                <span className={clsx("font-mono", sim.similarityScore > 0.85 ? 'text-red' : sim.similarityScore > 0.6 ? 'text-yellow' : 'text-green')}>
                  {((sim.similarityScore || 0) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
