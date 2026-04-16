import React from 'react';
import { StructuredEvent } from '../services/gemini';
import { Target, Calendar, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

interface EventDetectionPanelProps {
  events: StructuredEvent[];
}

export const EventDetectionPanel: React.FC<EventDetectionPanelProps> = ({ events }) => {
  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <Target className="w-4 h-4" />
        Event Detection Engine
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        <div className="space-y-3">
          {events?.map((event, index) => (
            <div key={index} className="bg-panel border border-line p-3 rounded flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-red uppercase tracking-wider font-bold">{event.eventType}</span>
                <span className={clsx("text-[10px] font-mono",
                  event.confidence >= 0.7 ? "text-green" :
                  event.confidence >= 0.4 ? "text-yellow" : "text-red"
                )}>Conf: {((event.confidence || 0) * 100).toFixed(0)}%</span>
              </div>
              <div className="text-sm text-ink font-medium">{event.actor} → {event.target}</div>
              <div className="text-xs text-muted">Sector: {event.sector}</div>
              <div className="flex items-center gap-1 text-[10px] text-muted font-mono">
                <Calendar className="w-3 h-3" />
                {event.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
