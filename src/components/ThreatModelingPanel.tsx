import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from 'recharts';
import { AlertTriangle, ShieldAlert, AlertCircle, Info } from 'lucide-react';
import clsx from 'clsx';

interface Threat {
  threatName: string;
  probability: number;
  impact: number;
  description: string;
}

interface ThreatModelingPanelProps {
  threats: Threat[];
}

export function ThreatModelingPanel({ threats }: ThreatModelingPanelProps) {
  const categorizedThreats = useMemo(() => {
    const high: Threat[] = [];
    const medium: Threat[] = [];
    const low: Threat[] = [];

    threats.forEach(threat => {
      const score = threat.probability * threat.impact;
      if (score >= 50 || (threat.probability >= 7 && threat.impact >= 7)) {
        high.push(threat);
      } else if (score >= 20 || threat.probability >= 5 || threat.impact >= 5) {
        medium.push(threat);
      } else {
        low.push(threat);
      }
    });

    return { high, medium, low };
  }, [threats]);

  const getThreatColor = (threat: Threat) => {
    const score = threat.probability * threat.impact;
    if (score >= 50 || (threat.probability >= 7 && threat.impact >= 7)) return '#C27A4E'; // High - Red/Orange
    if (score >= 20 || threat.probability >= 5 || threat.impact >= 5) return '#D9B382'; // Medium - Yellow
    return '#8C9A86'; // Low - Green
  };

  return (
    <div className="panel flex flex-col h-full">
      <div className="panel-header">
        <AlertTriangle className="w-4 h-4" />
        Threat Modeling & Prioritization
      </div>
      
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="h-[350px] flex flex-col">
          <h3 className="text-xs font-sans text-muted uppercase tracking-wider mb-4">Probability vs Impact Matrix</h3>
          <div className="flex-1 bg-bg rounded-lg border border-line p-4">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-line)" />
                <XAxis 
                  type="number" 
                  dataKey="probability" 
                  name="Probability" 
                  domain={[0, 10]} 
                  stroke="var(--theme-muted)" 
                  tick={{ fill: 'var(--theme-muted)', fontSize: 12 }} 
                  label={{ value: 'Probability', position: 'insideBottom', offset: -10, fill: 'var(--theme-muted)', fontSize: 12 }} 
                />
                <YAxis 
                  type="number" 
                  dataKey="impact" 
                  name="Impact" 
                  domain={[0, 10]} 
                  stroke="var(--theme-muted)" 
                  tick={{ fill: 'var(--theme-muted)', fontSize: 12 }} 
                  label={{ value: 'Impact', angle: -90, position: 'insideLeft', fill: 'var(--theme-muted)', fontSize: 12 }} 
                />
                <ZAxis type="number" range={[100, 400]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as Threat;
                      return (
                        <div className="bg-panel border border-line p-3 shadow-xl max-w-xs rounded-lg">
                          <p className="font-sans font-bold text-sm text-ink mb-1">{data.threatName}</p>
                          <p className="text-xs text-muted mb-2 leading-relaxed">{data.description}</p>
                          <div className="flex gap-4 text-xs font-mono">
                            <span className="text-muted">PROB: <span className="text-ink font-bold">{data.probability}/10</span></span>
                            <span className="text-muted">IMP: <span className="text-ink font-bold">{data.impact}/10</span></span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Threats" data={threats}>
                  {threats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getThreatColor(entry)} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categorization Section */}
        <div className="flex flex-col gap-4 h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-xs font-sans text-muted uppercase tracking-wider mb-0">Prioritized Threats</h3>
          
          {/* High Priority */}
          {categorizedThreats.high.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red border-b border-red/20 pb-1">
                <ShieldAlert className="w-4 h-4" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider">High Priority</h4>
              </div>
              {categorizedThreats.high.map((threat, idx) => (
                <div key={idx} className="bg-panel border border-red/30 rounded-lg p-3 shadow-sm hover:border-red/60 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-sans font-bold text-sm text-ink">{threat.threatName}</h5>
                    <span className="text-[10px] font-mono bg-red/10 text-red px-2 py-0.5 rounded-full border border-red/20">
                      P:{threat.probability} I:{threat.impact}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{threat.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Medium Priority */}
          {categorizedThreats.medium.length > 0 && (
            <div className="space-y-3 mt-2">
              <div className="flex items-center gap-2 text-yellow border-b border-yellow/20 pb-1">
                <AlertCircle className="w-4 h-4" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider">Medium Priority</h4>
              </div>
              {categorizedThreats.medium.map((threat, idx) => (
                <div key={idx} className="bg-panel border border-line rounded-lg p-3 shadow-sm hover:border-yellow/60 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-sans font-bold text-sm text-ink">{threat.threatName}</h5>
                    <span className="text-[10px] font-mono bg-yellow/10 text-yellow px-2 py-0.5 rounded-full border border-yellow/20">
                      P:{threat.probability} I:{threat.impact}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{threat.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Low Priority */}
          {categorizedThreats.low.length > 0 && (
            <div className="space-y-3 mt-2">
              <div className="flex items-center gap-2 text-green border-b border-green/20 pb-1">
                <Info className="w-4 h-4" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider">Low Priority</h4>
              </div>
              {categorizedThreats.low.map((threat, idx) => (
                <div key={idx} className="bg-panel border border-line rounded-lg p-3 shadow-sm hover:border-green/60 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-sans font-bold text-sm text-ink">{threat.threatName}</h5>
                    <span className="text-[10px] font-mono bg-green/10 text-green px-2 py-0.5 rounded-full border border-green/20">
                      P:{threat.probability} I:{threat.impact}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{threat.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
