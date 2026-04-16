import React from 'react';
import { StrategicPrediction } from '../services/gemini';
import { Users, AlertTriangle, Target, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

interface StrategicPredictionsPanelProps {
  predictions: StrategicPrediction[];
}

export function StrategicPredictionsPanel({ predictions }: StrategicPredictionsPanelProps) {
  if (!predictions || predictions.length === 0) return null;

  return (
    <div className="panel col-span-1 lg:col-span-3">
      <div className="panel-header">
        <Users className="w-4 h-4" />
        Pemetaan Tokoh & Prediksi Strategis
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="col-header">Tokoh / Peran</th>
              <th className="col-header">Negara</th>
              <th className="col-header">Analisis Pernyataan</th>
              <th className="col-header">Prediksi Rencana</th>
              <th className="col-header text-center">Keyakinan</th>
              <th className="col-header text-center">Dampak (0-10)</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((pred, idx) => (
              <tr key={idx} className="data-row">
                <td className="p-3 border-b border-line">
                  <div className="font-bold text-ink">{pred.figureName}</div>
                  <div className="text-xs text-muted mt-1">{pred.role}</div>
                </td>
                <td className="p-3 border-b border-line">
                  <span className="px-2 py-1 bg-line text-ink text-xs rounded-full font-mono">
                    {pred.country}
                  </span>
                </td>
                <td className="p-3 border-b border-line text-sm text-ink max-w-xs">
                  {pred.analysis}
                </td>
                <td className="p-3 border-b border-line">
                  <div className="flex items-center gap-2 text-sm font-medium text-ink">
                    <Target className="w-3 h-3 text-blue" />
                    {pred.predictedPlan}
                  </div>
                </td>
                <td className="p-3 border-b border-line text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className={clsx(
                      "text-sm font-mono font-bold",
                      pred.confidenceLevel >= 80 ? "text-green" :
                      pred.confidenceLevel >= 50 ? "text-yellow" : "text-red"
                    )}>
                      {pred.confidenceLevel}%
                    </span>
                    <div className="w-16 h-1.5 bg-line rounded-full overflow-hidden">
                      <div 
                        className={clsx(
                          "h-full",
                          pred.confidenceLevel >= 80 ? "bg-green" :
                          pred.confidenceLevel >= 50 ? "bg-yellow" : "bg-red"
                        )}
                        style={{ width: `${pred.confidenceLevel}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-3 border-b border-line text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className={clsx(
                      "text-sm font-mono font-bold",
                      pred.potentialImpact >= 8 ? "text-red" :
                      pred.potentialImpact >= 5 ? "text-yellow" : "text-green"
                    )}>
                      {pred.potentialImpact}/10
                    </span>
                    <div className="w-16 h-1.5 bg-line rounded-full overflow-hidden">
                      <div 
                        className={clsx(
                          "h-full",
                          pred.potentialImpact >= 8 ? "bg-red" :
                          pred.potentialImpact >= 5 ? "bg-yellow" : "bg-green"
                        )}
                        style={{ width: `${(pred.potentialImpact / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
