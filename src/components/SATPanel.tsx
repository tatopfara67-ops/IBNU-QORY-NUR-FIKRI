import React from 'react';
import { SATAnalysis } from '../services/gemini';
import { 
  CheckSquare, 
  ShieldAlert, 
  Ghost, 
  HelpCircle, 
  Activity, 
  GitBranch, 
  Grid,
  XCircle
} from 'lucide-react';
import clsx from 'clsx';

interface SATPanelProps {
  sat: SATAnalysis;
}

export function SATPanel({ sat }: SATPanelProps) {
  if (!sat) return null;

  return (
    <div className="col-span-1 lg:col-span-3 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-ink">Structured Analytic Techniques (SATs)</h2>
        <div className="h-px bg-line flex-1 ml-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Key Assumptions Check */}
        <div className="panel overflow-hidden flex flex-col">
          <div className="panel-header bg-panel">
            <CheckSquare className="w-4 h-4 text-blue" />
            1. Key Assumptions Check
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="pb-2 font-medium w-8 text-center">No</th>
                  <th className="pb-2 font-medium">Asumsi Kunci (Assumption)</th>
                  <th className="pb-2 font-medium">Bukti Pendukung (Supporting Evidence)</th>
                  <th className="pb-2 font-medium">Bukti Penolak (Challenging Evidence)</th>
                  <th className="pb-2 font-medium text-center">Kekuatan Asumsi</th>
                  <th className="pb-2 font-medium text-center">Tindakan yang Diambil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sat.keyAssumptionsCheck.map((item, idx) => (
                  <tr key={idx} className="hover:bg-bg">
                    <td className="py-3 text-center text-muted font-mono">{idx + 1}</td>
                    <td className="py-3 pr-4 text-ink">{item.assumption}</td>
                    <td className="py-3 pr-4 text-green text-xs">{item.supportingEvidence}</td>
                    <td className="py-3 pr-4 text-red text-xs">{item.refutingEvidence}</td>
                    <td className="py-3 text-center">
                      <span className={clsx(
                        "px-2 py-1 rounded text-[10px] uppercase tracking-wider font-mono",
                        item.strength === 'Strong' ? "bg-green/10 text-green border border-green/20" :
                        item.strength === 'Weak' ? "bg-red/10 text-red border border-red/20" :
                        "bg-line text-muted border border-line"
                      )}>
                        {item.strength}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={clsx(
                        "px-2 py-1 rounded text-[10px] uppercase tracking-wider font-mono",
                        item.actionTaken === 'Keep' ? "bg-green/10 text-green border border-green/20" :
                        item.actionTaken === 'Revise' ? "bg-yellow/10 text-yellow border border-yellow/20" :
                        "bg-red/10 text-red border border-red/20"
                      )}>
                        {item.actionTaken || 'Keep'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Devil's Advocacy */}
        <div className="panel overflow-hidden flex flex-col">
          <div className="panel-header bg-panel">
            <ShieldAlert className="w-4 h-4 text-red" />
            2. Devil's Advocacy
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-xs text-muted uppercase tracking-wider mb-1">Original Conclusion (Kesimpulan Awal)</div>
              <div className="p-3 bg-bg rounded border border-line text-sm text-ink">
                {sat.devilsAdvocacy.originalConclusion}
              </div>
            </div>
            <div>
              <div className="text-xs text-red/70 uppercase tracking-wider mb-2">Counter Arguments (Serangan Argumen Lawan)</div>
              <ul className="space-y-2">
                {sat.devilsAdvocacy.counterArguments.map((arg, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-ink">
                    <XCircle className="w-4 h-4 text-red shrink-0 mt-0.5" />
                    <span>{arg}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Red Team Analysis */}
        <div className="panel overflow-hidden flex flex-col">
          <div className="panel-header bg-panel">
            <Ghost className="w-4 h-4 text-blue" />
            3. Red Team Analysis
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-xs text-blue/70 uppercase tracking-wider mb-1">Perspektif Musuh</div>
              <div className="p-3 bg-blue/10 rounded border border-blue/20 text-sm text-ink italic">
                "{sat.redTeamAnalysis.adversaryPerspective}"
              </div>
            </div>
            <div>
              <div className="text-xs text-muted uppercase tracking-wider mb-2">Taktik Penipuan (Deception Tactics)</div>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                {sat.redTeamAnalysis.deceptionTactics.map((tactic, idx) => (
                  <li key={idx}>{tactic}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 4. What If? Analysis */}
        <div className="panel overflow-hidden flex flex-col">
          <div className="panel-header bg-panel">
            <HelpCircle className="w-4 h-4 text-yellow" />
            4. What If? Analysis
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-xs text-yellow/70 uppercase tracking-wider mb-1">Skenario Kejutan (Unlikely Scenario)</div>
              <div className="p-3 bg-yellow/10 rounded border border-yellow/20 text-sm text-ink font-medium">
                {sat.whatIfAnalysis.unlikelyScenario}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted uppercase tracking-wider mb-2">Implikasi</div>
                <ul className="list-disc list-inside space-y-1 text-xs text-muted">
                  {sat.whatIfAnalysis.implications.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs text-muted uppercase tracking-wider mb-2">Indikator Awal</div>
                <ul className="list-disc list-inside space-y-1 text-xs text-muted">
                  {sat.whatIfAnalysis.earlyIndicators.map((ind, idx) => (
                    <li key={idx}>{ind}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Indicators & Warnings */}
        <div className="panel overflow-hidden flex flex-col lg:col-span-2">
          <div className="panel-header bg-panel flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue" />
              5. Indicators & Warnings (I&W)
            </div>
            <div className={clsx(
              "px-2 py-1 rounded text-xs font-bold uppercase tracking-wider",
              sat.indicatorsAndWarnings.alertLevel === 'Critical' ? "bg-red text-ink" :
              sat.indicatorsAndWarnings.alertLevel === 'High' ? "bg-orange text-ink" :
              sat.indicatorsAndWarnings.alertLevel === 'Elevated' ? "bg-yellow text-panel" :
              "bg-green text-ink"
            )}>
              Alert Level: {sat.indicatorsAndWarnings.alertLevel}
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm text-ink mb-4">
              <span className="text-muted mr-2">Skenario yang dipantau:</span>
              <strong className="text-ink">{sat.indicatorsAndWarnings.scenario}</strong>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {sat.indicatorsAndWarnings.indicators.map((ind, idx) => (
                <div key={idx} className="p-3 bg-bg border border-line rounded flex items-start gap-3">
                  <div className={clsx(
                    "w-2 h-2 rounded-full mt-1.5 shrink-0",
                    ind.status === 'Observed' ? "bg-red shadow-[0_0_8px_rgba(239,68,68,0.8)]" :
                    ind.status === 'Emerging' ? "bg-yellow shadow-[0_0_8px_rgba(234,179,8,0.8)]" :
                    "bg-muted"
                  )}></div>
                  <div>
                    <div className="text-sm text-ink">{ind.description}</div>
                    <div className="text-[10px] text-muted uppercase mt-1">{ind.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Scenario Analysis */}
        <div className="panel overflow-hidden flex flex-col lg:col-span-2">
          <div className="panel-header bg-panel">
            <GitBranch className="w-4 h-4 text-green" />
            6. Scenario Analysis
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sat.scenarioAnalysis.map((scenario, idx) => (
              <div key={idx} className="bg-bg border border-line rounded p-3 flex flex-col">
                <div className={clsx(
                  "text-xs font-bold uppercase tracking-wider mb-2 pb-2 border-b",
                  scenario.type === 'Best Case' ? "text-green border-green/30" :
                  scenario.type === 'Worst Case' ? "text-red border-red/30" :
                  scenario.type === 'Most Likely' ? "text-blue border-blue/30" :
                  "text-blue border-blue/30"
                )}>
                  {scenario.type}
                </div>
                <div className="text-sm text-ink mb-3 flex-1">{scenario.description}</div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] text-muted uppercase">Drivers</div>
                    <div className="text-xs text-muted">{scenario.keyDrivers.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted uppercase">Indicators</div>
                    <div className="text-xs text-muted">{scenario.indicators.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted uppercase">Implications</div>
                    <div className="text-xs text-muted">{scenario.implications.join(', ')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Cross-Impact Matrix */}
        <div className="panel overflow-hidden flex flex-col lg:col-span-2">
          <div className="panel-header bg-panel">
            <Grid className="w-4 h-4 text-orange" />
            7. Cross-Impact Matrix
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-2 border border-line bg-bg text-muted text-xs font-normal">
                    Dampak Baris terhadap Kolom ➔
                  </th>
                  {sat.crossImpactMatrix.factors.map((factor, idx) => (
                    <th key={idx} className="p-2 border border-line bg-bg font-medium text-ink text-center">
                      {factor}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sat.crossImpactMatrix.factors.map((rowFactor, rowIdx) => (
                  <tr key={rowIdx}>
                    <th className="p-2 border border-line bg-bg font-medium text-ink">
                      {rowFactor}
                    </th>
                    {sat.crossImpactMatrix.factors.map((colFactor, colIdx) => {
                      if (rowFactor === colFactor) {
                        return <td key={colIdx} className="p-2 border border-line bg-line"></td>;
                      }
                      
                      const cellData = sat.crossImpactMatrix.matrix.find(
                        m => m.rowFactor === rowFactor && m.colFactor === colFactor
                      );
                      
                      const impact = cellData?.impact || 'No Effect';
                      
                      return (
                        <td key={colIdx} className="p-2 border border-line text-center">
                          <span className={clsx(
                            "text-xs font-medium",
                            impact === 'Strengthens' ? "text-green" :
                            impact === 'Weakens' ? "text-red" :
                            "text-muted"
                          )}>
                            {impact === 'Strengthens' ? '↑ Memperkuat' : 
                             impact === 'Weakens' ? '↓ Memperlemah' : '-'}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
