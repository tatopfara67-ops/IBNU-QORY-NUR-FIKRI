import React from 'react';
import { TimeSeriesData, WeakSignal, ConfidenceModel, TemporalMomentum } from '../services/gemini';
import { TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';

interface IntelligenceAnalyticsPanelProps {
  timeSeries: TimeSeriesData[];
  weakSignals: WeakSignal[];
  confidence: ConfidenceModel;
  momentum: TemporalMomentum;
}

export const IntelligenceAnalyticsPanel: React.FC<IntelligenceAnalyticsPanelProps> = ({ timeSeries, weakSignals, confidence, momentum }) => {
  const getMomentumColor = (interpretation: string) => {
    switch (interpretation) {
      case 'ISU_MENURUN': return 'text-green';
      case 'STABIL': return 'text-yellow';
      case 'ESKALASI_CEPAT': return 'text-red';
      default: return 'text-muted';
    }
  };

  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <Zap className="w-4 h-4" />
        Intelligence Analytics
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-6">
        {/* Momentum Score */}
        {momentum && (
          <div className="bg-panel border border-line p-3 rounded">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider font-bold">Temporal Momentum</span>
              <span className={clsx("text-xs font-bold", getMomentumColor(momentum.interpretation))}>
                {momentum.interpretation ? momentum.interpretation.replace('_', ' ') : 'N/A'}
              </span>
            </div>
            <div className="text-2xl font-mono font-bold text-ink mt-1">
              {(momentum.momentumScore || 0).toFixed(2)}
            </div>
          </div>
        )}

        {/* Time Series */}
        <div className="space-y-2">
          <div className="text-[10px] text-muted uppercase tracking-wider">Time-Series Intelligence</div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries}>
                <XAxis dataKey="week" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: 'none', fontSize: '10px' }} />
                <Line type="monotone" dataKey="mentions" stroke="#8C9A9E" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weak Signals */}
        <div className="space-y-2">
          <div className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Weak Signal Detection
          </div>
          {weakSignals?.map((signal, index) => (
            <div key={index} className="text-xs text-ink bg-panel p-2 rounded border-l-2 border-yellow">
              <div className="flex justify-between">
                <span>{signal.description}</span>
                <span className="font-mono text-yellow">{signal.confidence}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Confidence Model */}
        {confidence && (
          <div className="space-y-2">
            <div className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3 h-3" /> Confidence Model
            </div>
            <div className="bg-panel p-3 rounded space-y-2">
              <div className="text-xs text-ink font-bold">{confidence.prediction}</div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Confidence</span>
                <span className="font-mono text-green">{((confidence.confidence || 0) * 100).toFixed(0)}%</span>
              </div>
              <div className="text-[10px] text-muted space-y-1">
                <div>Media: {confidence.evidence?.mediaSignals}</div>
                <div>Policy: {confidence.evidence?.policySignals}</div>
                <div>Military: {confidence.evidence?.militarySignals}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
