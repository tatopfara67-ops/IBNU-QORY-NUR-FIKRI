import React from 'react';
import { ACHAnalysis } from '../services/gemini';
import { Target, AlertTriangle, CheckCircle2, XCircle, HelpCircle, EyeOff, Star, Zap } from 'lucide-react';
import clsx from 'clsx';

interface ACHPanelProps {
  ach: ACHAnalysis;
}

export function ACHPanel({ ach }: ACHPanelProps) {
  if (!ach || !ach.hypotheses || !ach.evidence) return null;

  const renderEvaluationIcon = (evalValue: string) => {
    if (evalValue === '+') return <CheckCircle2 className="w-4 h-4 text-green mx-auto" />;
    if (evalValue === '-') return <XCircle className="w-4 h-4 text-red mx-auto" />;
    return <span className="text-muted text-xs font-sans">N/A</span>;
  };

  const minInconsistencies = Math.min(...ach.hypotheses.map(h => h.inconsistencies));

  return (
    <div className="panel col-span-1 lg:col-span-3">
      <div className="panel-header">
        <Target className="w-4 h-4" />
        Analysis of Competing Hypotheses (ACH)
      </div>
      
      <div className="p-4 overflow-x-auto">
        {/* ACH Table */}
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="col-header w-12 text-center">No</th>
              <th className="col-header w-1/3">Evidence / Bukti (dengan link & tanggal)</th>
              {ach.hypotheses.map((hyp, idx) => (
                <th key={hyp.id} className={clsx("col-header text-center relative", hyp.inconsistencies === minInconsistencies ? "bg-green/10 border-t-2 border-green" : "")} title={hyp.description}>
                  {hyp.inconsistencies === minInconsistencies && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green text-panel text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap shadow-lg">
                      <Star className="w-3 h-3" fill="currentColor" /> STRONGEST
                    </div>
                  )}
                  <div className="text-xs text-muted mb-1">Hipotesis {idx + 1}</div>
                  <div className={clsx("font-bold", hyp.inconsistencies === minInconsistencies ? "text-green" : "text-ink")}>{hyp.name}</div>
                  <div className="text-[10px] font-normal normal-case text-muted mt-1 line-clamp-2">{hyp.description}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ach.evidence.map((ev, idx) => {
              const isCrucial = ev.id === ach.sensitivityCheck.crucialEvidenceId;
              return (
                <tr key={ev.id} className={clsx("data-row", isCrucial ? "bg-yellow/5 border-l-2 border-l-yellow" : "")}>
                  <td className="p-3 border-b border-line text-center font-sans text-sm text-muted">
                    {idx + 1}
                  </td>
                  <td className="p-3 border-b border-line text-sm text-ink">
                    <div className="flex items-start gap-2">
                      {isCrucial && <span title="Crucial Evidence for Sensitivity Check"><Zap className="w-4 h-4 text-yellow shrink-0 mt-0.5" /></span>}
                      <span className={isCrucial ? "text-yellow" : ""}>{ev.description}</span>
                    </div>
                  </td>
                  {ach.hypotheses.map(hyp => (
                    <td key={hyp.id} className={clsx("p-3 border-b border-line text-center", hyp.inconsistencies === minInconsistencies ? "bg-green/5" : "bg-panel/50")}>
                      {renderEvaluationIcon(ev.evaluations[hyp.id])}
                    </td>
                  ))}
                </tr>
              );
            })}
            
            {/* Inconsistencies Row */}
            <tr className="bg-bg">
              <td colSpan={2} className="p-3 border-b border-line text-right font-bold text-ink text-sm uppercase tracking-wider">
                Jumlah tanda – (Inconsistencies)
              </td>
              {ach.hypotheses.map(hyp => (
                <td key={hyp.id} className={clsx("p-3 border-b border-line text-center", hyp.inconsistencies === minInconsistencies ? "bg-green/10" : "")}>
                  <span className={clsx(
                    "font-sans font-bold text-lg",
                    hyp.inconsistencies === 0 ? "text-green" :
                    hyp.inconsistencies <= 2 ? "text-yellow" : "text-red"
                  )}>
                    {hyp.inconsistencies}
                  </span>
                </td>
              ))}
            </tr>
            
            {/* Confidence Level Row */}
            <tr className="bg-bg">
              <td colSpan={2} className="p-3 border-b border-line text-right font-bold text-ink text-sm uppercase tracking-wider">
                Confidence Level
              </td>
              {ach.hypotheses.map(hyp => (
                <td key={hyp.id} className={clsx("p-3 border-b border-line text-center", hyp.inconsistencies === minInconsistencies ? "bg-green/10" : "")}>
                  <span className={clsx(
                    "text-[10px] font-sans px-2 py-1 rounded uppercase tracking-wider",
                    hyp.confidenceLevel === 'High' ? "bg-green/10 text-green border border-green/20" :
                    hyp.confidenceLevel === 'Moderate' ? "bg-yellow/10 text-yellow border border-yellow/20" :
                    "bg-red/10 text-red border border-red/20"
                  )}>
                    {hyp.confidenceLevel}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Additional Columns Below Table */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Key Assumptions */}
          <div className="bg-panel border border-line p-4 rounded">
            <h4 className="flex items-center gap-2 font-bold text-sm text-ink mb-3 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-blue" />
              Key Assumptions (Asumsi Kunci)
            </h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-ink">
              {ach.keyAssumptions.map((assumption, idx) => (
                <li key={idx} className="leading-relaxed">{assumption}</li>
              ))}
            </ul>
          </div>

          {/* Rejected Hypotheses */}
          <div className="bg-panel border border-line p-4 rounded">
            <h4 className="flex items-center gap-2 font-bold text-sm text-ink mb-3 uppercase tracking-wider">
              <XCircle className="w-4 h-4 text-red" />
              Rejected Hypotheses
            </h4>
            <div className="space-y-3">
              {ach.rejectedHypotheses.map((rej, idx) => {
                const hypName = ach.hypotheses.find(h => h.id === rej.hypothesisId)?.name || rej.hypothesisId;
                return (
                  <div key={idx} className="text-sm border-l-2 border-red pl-3">
                    <span className="font-bold text-ink">{hypName}</span> ditolak karena:
                    <p className="text-muted mt-1 italic">{rej.reason}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sensitivity Check */}
          <div className="bg-panel border border-line p-4 rounded">
            <h4 className="flex items-center gap-2 font-bold text-sm text-ink mb-3 uppercase tracking-wider">
              <EyeOff className="w-4 h-4 text-yellow" />
              Sensitivity Check (Uji Sensitivitas)
            </h4>
            <div className="space-y-3 text-sm text-ink">
              <p>
                <span className="text-muted">Kalau bukti No.</span> 
                <strong className="text-ink mx-1">
                  {ach.evidence.findIndex(e => e.id === ach.sensitivityCheck.crucialEvidenceId) + 1}
                </strong> 
                <span className="text-muted">dihilangkan, apakah kesimpulan berubah?</span>
                <span className={clsx(
                  "ml-2 font-bold",
                  ach.sensitivityCheck.wouldConclusionChange ? "text-red" : "text-green"
                )}>
                  {ach.sensitivityCheck.wouldConclusionChange ? "Ya" : "Tidak"}
                </span>
              </p>
              <p>
                <span className="text-muted">Hipotesis mana yang paling sensitif terhadap bukti baru?</span>
                <strong className="block mt-1 text-blue">
                  {ach.hypotheses.find(h => h.id === ach.sensitivityCheck.mostSensitiveHypothesisId)?.name || ach.sensitivityCheck.mostSensitiveHypothesisId}
                </strong>
              </p>
            </div>
          </div>

          {/* Final Conclusion */}
          <div className="bg-panel border border-blue/30 p-4 rounded flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <h4 className="flex items-center gap-2 font-bold text-sm text-blue mb-3 uppercase tracking-wider">
              <Target className="w-4 h-4" />
              Kesimpulan Akhir
            </h4>
            <div className="text-sm text-ink leading-relaxed relative z-10">
              Hipotesis paling kuat adalah <strong className="text-ink">{ach.hypotheses.find(h => h.id === ach.finalConclusion.strongestHypothesisId)?.name}</strong> dengan tingkat kepercayaan 
              <span className={clsx(
                "mx-1 font-sans px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider",
                ach.finalConclusion.confidenceLevel === 'High' ? "bg-green/10 text-green border border-green/20" :
                ach.finalConclusion.confidenceLevel === 'Moderate' ? "bg-yellow/10 text-yellow border border-yellow/20" :
                "bg-red/10 text-red border border-red/20"
              )}>
                {ach.finalConclusion.confidenceLevel}
              </span> 
              karena:
              <p className="mt-2 text-muted italic border-l-2 border-line pl-3">
                {ach.finalConclusion.reasoning}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
