import React from 'react';
import { EventTimeline } from '../services/gemini';
import { Clock } from 'lucide-react';

interface TimelineIntelligencePanelProps {
  timeline: EventTimeline[];
}

export const TimelineIntelligencePanel: React.FC<TimelineIntelligencePanelProps> = ({ timeline }) => {
  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <Clock className="w-4 h-4" />
        Timeline Intelligence Panel
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        <div className="relative border-l border-line ml-2 space-y-6">
          {timeline?.map((item, index) => (
            <div key={index} className="relative pl-6">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-red" />
              <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">
                {item.date}
              </div>
              <div className="text-sm text-ink">{item.event}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
