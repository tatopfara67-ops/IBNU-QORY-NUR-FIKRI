import React, { useState, useRef, useEffect } from 'react';
import { analyzeGlobalThreats, ThreatAnalysis } from './services/gemini';
import { Loader2, Search, ShieldAlert, Globe, Activity, TrendingUp, AlertTriangle, Crosshair, Target, Swords, GitMerge, RefreshCw, Clock, Network, Radio, Megaphone, Eye, Share2, Radar, GitBranch, Database, Map, FileText, Download, Moon, Sun } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, BarChart, Bar, Cell, AreaChart, Area } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { InfluenceGraph } from './components/InfluenceGraph';
import { GlobalHeatmap } from './components/GlobalHeatmap';
import { TimelineIntelligencePanel } from './components/TimelineIntelligencePanel';
import { SignalExtractionPanel } from './components/SignalExtractionPanel';
import { EventDetectionPanel } from './components/EventDetectionPanel';
import { EscalationPanel } from './components/EscalationPanel';
import { ActorStrategyPanel } from './components/ActorStrategyPanel';
import { SourceDiversityPanel } from './components/SourceDiversityPanel';
import { NetworkGraphPanel } from './components/NetworkGraphPanel';
import { NarrativeRealityPanel } from './components/NarrativeRealityPanel';
import { IntelligenceAnalyticsPanel } from './components/IntelligenceAnalyticsPanel';
import { ThreatScorePanel } from './components/ThreatScorePanel';
import { ThreatModelingPanel } from './components/ThreatModelingPanel';
import { AlliancePanel } from './components/AlliancePanel';
import { GeoAnalyticsPanel } from './components/GeoAnalyticsPanel';
import { InfluenceConfidencePanel } from './components/InfluenceConfidencePanel';
import { ScenarioRiskPanel } from './components/ScenarioRiskPanel';
import { ClusterDetectionPanel } from './components/ClusterDetectionPanel';
import { StrategicPredictionsPanel } from './components/StrategicPredictionsPanel';
import { OsintVerificationPanel } from './components/OsintVerificationPanel';
import { IntelligenceLogicPanel } from './components/IntelligenceLogicPanel';
import { ACHPanel } from './components/ACHPanel';
import { SATPanel } from './components/SATPanel';
import { DeepDorkCrawlPanel } from './components/DeepDorkCrawlPanel';

import { LandingFeatures } from './components/LandingFeatures';
import { HeroSection } from './components/HeroSection';

export default function App() {
  const [topic, setTopic] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [analysis, setAnalysis] = useState<ThreatAnalysis | null>(null);
  const [error, setError] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    
    // Helper to remove color-mix which crashes html2canvas
    const removeColorMix = (cssText: string) => {
      let result = '';
      let i = 0;
      while (i < cssText.length) {
        const match = cssText.indexOf('color-mix(', i);
        if (match === -1) {
          result += cssText.slice(i);
          break;
        }
        result += cssText.slice(i, match);
        result += 'rgba(128, 128, 128, 0.1)'; // Fallback color
        
        let depth = 0;
        let j = match + 9; // length of 'color-mix'
        while (j < cssText.length) {
          if (cssText[j] === '(') depth++;
          else if (cssText[j] === ')') {
            depth--;
            if (depth === 0) {
              j++;
              break;
            }
          }
          j++;
        }
        i = j;
      }
      return result.replace(/\\bin oklab\\b/g, '').replace(/\\bin oklch\\b/g, '').replace(/\\bin lab\\b/g, '').replace(/\\bin lch\\b/g, '');
    };

    const originalStyles: { el: Element, parent: Node, nextSibling: Node | null }[] = [];
    const tempStyles: HTMLStyleElement[] = [];

    try {
      setIsGeneratingPdf(true);
      
      const element = reportRef.current;
      
      // Temporary fix for html2canvas oklab/color-mix parsing error with Tailwind v4
      const styleElements = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));

      for (const el of styleElements) {
        if (el.tagName === 'STYLE') {
          const styleEl = el as HTMLStyleElement;
          if (styleEl.innerHTML.includes('color-mix(') || styleEl.innerHTML.includes('oklab') || styleEl.innerHTML.includes('lab') || styleEl.innerHTML.includes('lch')) {
            const newStyle = document.createElement('style');
            newStyle.innerHTML = removeColorMix(styleEl.innerHTML);
            document.head.appendChild(newStyle);
            
            const parent = styleEl.parentNode;
            if (parent) {
              originalStyles.push({ el: styleEl, parent, nextSibling: styleEl.nextSibling });
              parent.removeChild(styleEl);
            }
            tempStyles.push(newStyle);
          }
        } else if (el.tagName === 'LINK') {
          const linkEl = el as HTMLLinkElement;
          try {
            if (new URL(linkEl.href, window.location.href).origin === window.location.origin) {
              const response = await fetch(linkEl.href);
              const cssText = await response.text();
              if (cssText.includes('color-mix(') || cssText.includes('oklab') || cssText.includes('lab') || cssText.includes('lch')) {
                const newStyle = document.createElement('style');
                newStyle.innerHTML = removeColorMix(cssText);
                document.head.appendChild(newStyle);
                
                const parent = linkEl.parentNode;
                if (parent) {
                  originalStyles.push({ el: linkEl, parent, nextSibling: linkEl.nextSibling });
                  parent.removeChild(linkEl);
                }
                tempStyles.push(newStyle);
              }
            }
          } catch (e) {
            console.warn('Could not fetch stylesheet for PDF generation', e);
          }
        }
      }

      // Temporarily adjust styles for better PDF rendering
      const originalBg = element.style.backgroundColor;
      element.style.backgroundColor = document.documentElement.classList.contains('dark') ? '#0F1115' : '#F8F6F3';
      element.style.padding = '24px';
      
      const safeTopic = topic.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'Report';
      
      const opt = {
        margin:       10,
        filename:     `SIAS_${safeTopic}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, windowWidth: element.scrollWidth },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();

      // Restore original styles
      element.style.backgroundColor = originalBg;
      element.style.padding = '';
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      // Restore stylesheets
      originalStyles.forEach(({ el, parent, nextSibling }) => {
        parent.insertBefore(el, nextSibling);
      });
      tempStyles.forEach(el => el.remove());
      
      setIsGeneratingPdf(false);
    }
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsScanning(true);
    setError('');
    setAnalysis(null);

    try {
      const result = await analyzeGlobalThreats(topic);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred during the scan.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {!analysis && <HeroSection />}
      
      <div className="p-4 md:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <h1 className="text-3xl font-sans font-light tracking-tight flex items-center gap-3 text-ink">
              <ShieldAlert className="w-8 h-8 text-orange" />
              SIAS <span className="text-muted font-serif italic text-xl">Strategic Intelligence Platform</span>
            </h1>
            <p className="text-muted text-sm mt-1 font-sans tracking-wide">
              Predictive Analysis & Dialectical Threat Engine
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-2 items-center">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-panel border border-line hover:bg-bg text-ink p-2.5 rounded-full transition-colors shadow-sm shrink-0"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <form onSubmit={handleScan} className="flex flex-1 gap-2">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Target Region/Topic (e.g., Eropa Embargo China)"
                  className="w-full bg-panel border border-line rounded-full py-2 pl-9 pr-4 text-sm font-sans focus:outline-none focus:border-orange transition-colors shadow-sm"
                  disabled={isScanning}
                />
              </div>
              <button
                type="submit"
                disabled={isScanning || !topic.trim()}
                className="bg-orange hover:bg-red text-ink px-6 py-2 rounded-full font-sans text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
              >
                {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crosshair className="w-4 h-4" />}
                <span className="hidden sm:inline">{isScanning ? 'SCANNING...' : 'INITIATE SCAN'}</span>
                <span className="sm:hidden">{isScanning ? 'SCAN' : 'SCAN'}</span>
              </button>
              {analysis && (
                <>
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf || isScanning}
                    title="Download Report as PDF"
                    className="bg-panel border border-line hover:bg-bg text-ink px-4 py-2 rounded-full font-sans text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
                  >
                    {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    <span className="hidden sm:inline">PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleScan}
                    disabled={isScanning || !topic.trim()}
                    title="Refresh Data"
                    className="bg-panel border border-line hover:bg-bg text-ink px-4 py-2 rounded-full font-sans text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
                  >
                    <RefreshCw className={clsx("w-4 h-4", isScanning && "animate-spin")} />
                    <span className="hidden sm:inline">REFRESH</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </header>

        {error && (
          <div className="bg-orange/10 border border-orange text-orange p-4 font-sans text-sm rounded-lg">
            [ERROR] {error}
          </div>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {analysis && (
            <div ref={reportRef} className="bg-bg -m-4 p-4 md:-m-8 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
            {/* Left Column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Confidence Score */}
              {analysis.confidenceScore && (
                <div className="panel">
                  <div className="panel-header">
                    <ShieldAlert className="w-4 h-4" />
                    Confidence Score (Anti-Halusinasi)
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    <div>
                      <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">Prediction</div>
                      <div className="text-sm text-ink font-bold">{analysis.confidenceScore.prediction}</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Confidence</span>
                          <span className={clsx("text-sm font-mono font-bold",
                            analysis.confidenceScore.confidence >= 80 ? "text-green" :
                            analysis.confidenceScore.confidence >= 50 ? "text-yellow" : "text-red"
                          )}>{analysis.confidenceScore.confidence}%</span>
                        </div>
                        <div className="w-full h-2 bg-line rounded-full overflow-hidden">
                          <div 
                            className={clsx("h-full",
                              analysis.confidenceScore.confidence >= 80 ? "bg-green" :
                              analysis.confidenceScore.confidence >= 50 ? "bg-yellow" : "bg-red"
                            )} 
                            style={{ width: `${analysis.confidenceScore.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Evidence</div>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-xs text-ink">
                          <FileText className="w-3 h-3 text-blue" />
                          <span className="font-mono font-bold text-ink">{analysis.confidenceScore.evidence.newsSources}</span> news sources
                        </li>
                        <li className="flex items-center gap-2 text-xs text-ink">
                          <Megaphone className="w-3 h-3 text-yellow" />
                          <span className="font-mono font-bold text-ink">{analysis.confidenceScore.evidence.leaderStatements}</span> leader statements
                        </li>
                        <li className="flex items-center gap-2 text-xs text-ink">
                          <GitBranch className="w-3 h-3 text-green" />
                          <span className="font-mono font-bold text-ink">{analysis.confidenceScore.evidence.policyDrafts}</span> policy drafts
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline Intelligence Panel */}
              {analysis.eventTimeline && (
                <TimelineIntelligencePanel timeline={analysis.eventTimeline} />
              )}

              {/* Signal Extraction Layer */}
              {analysis.signalExtraction && (
                <SignalExtractionPanel data={analysis.signalExtraction} />
              )}

              {/* Scan Summary */}
              <div className="panel">
                <div className="panel-header">
                  <Activity className="w-4 h-4" />
                  Executive Summary
                </div>
                <div className="p-4 text-sm leading-relaxed text-ink">
                  {analysis.scanSummary}
                </div>
              </div>

              {/* Dialectical Analysis */}
              <div className="panel">
                <div className="panel-header">
                  <TrendingUp className="w-4 h-4" />
                  Dialectical Prediction Engine
                </div>
                <div className="p-4 flex flex-col gap-4">
                  <div className="border-l-2 border-blue pl-3">
                    <div className="text-[10px] font-mono text-blue uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Target className="w-3 h-3" />
                      Thesis (Current State)
                    </div>
                    <div className="text-sm text-ink">{analysis.dialecticalAnalysis.thesis}</div>
                  </div>
                  <div className="border-l-2 border-red pl-3">
                    <div className="text-[10px] font-mono text-red uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Swords className="w-3 h-3" />
                      Antithesis (Opposition)
                    </div>
                    <div className="text-sm text-ink">{analysis.dialecticalAnalysis.antithesis}</div>
                  </div>
                  <div className="border-l-2 border-green pl-3 bg-green/5 p-2 -ml-2 rounded-r">
                    <div className="text-[10px] font-mono text-green uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <GitMerge className="w-3 h-3" />
                      Synthesis (Predicted Threat)
                    </div>
                    <div className="text-sm text-ink font-medium">{analysis.dialecticalAnalysis.synthesis}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Threat Modeling & Prioritization */}
              {analysis.threatMatrix && (
                <ThreatModelingPanel threats={analysis.threatMatrix} />
              )}

              {/* Event Detection Engine */}
              {analysis.eventDetection && (
                <EventDetectionPanel events={analysis.eventDetection} />
              )}

              {/* Escalation Model */}
              {analysis.escalationModel && (
                <EscalationPanel model={analysis.escalationModel} />
              )}

              {/* Actor Strategy Model */}
              {analysis.actorStrategies && (
                <ActorStrategyPanel strategies={analysis.actorStrategies} />
              )}

              {/* Source Diversity Score */}
              {analysis.sourceDiversity && (
                <SourceDiversityPanel diversity={analysis.sourceDiversity} />
              )}

              {/* Network Influence Graph */}
              {analysis.networkGraph && (
                <NetworkGraphPanel graph={analysis.networkGraph} />
              )}

              {/* Narrative vs Reality Index */}
              {analysis.narrativeRealityIndex && (
                <NarrativeRealityPanel index={analysis.narrativeRealityIndex} />
              )}

              {/* Intelligence Analytics */}
              {analysis.timeSeriesData && (
                <IntelligenceAnalyticsPanel 
                  timeSeries={analysis.timeSeriesData}
                  weakSignals={analysis.weakSignals}
                  confidence={analysis.confidenceModel}
                  momentum={analysis.temporalMomentum}
                />
              )}

              {/* Multi-Factor Threat Score */}
              {analysis.multiFactorThreatScore && (
                <ThreatScorePanel score={analysis.multiFactorThreatScore} />
              )}

              {/* Actor Alignment */}
              {analysis.actorAlignments && (
                <AlliancePanel alignments={analysis.actorAlignments} />
              )}

              {/* Geopolitical Analytics */}
              {analysis.narrativeRealityIndex && (
                <GeoAnalyticsPanel 
                  narrativeReality={analysis.narrativeRealityIndex}
                  similarities={analysis.narrativeSimilarities}
                  escalation={analysis.escalationIndex}
                />
              )}

              {/* Influence & Confidence */}
              {analysis.confidenceEstimation && (
                <InfluenceConfidencePanel 
                  influenceWeights={analysis.actorInfluenceWeights}
                  confidence={analysis.confidenceEstimation}
                />
              )}

              {/* Scenario & Risk */}
              {analysis.scenarioProbabilities && (
                <ScenarioRiskPanel 
                  scenarioProbabilities={analysis.scenarioProbabilities}
                  riskMatrix={analysis.riskMatrix}
                />
              )}

              {/* Cluster Detection */}
              {analysis.clusters && (
                <ClusterDetectionPanel clusters={analysis.clusters} />
              )}
            </div>

            {/* Bottom Section - Full Width */}
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Leader Intents */}
              {analysis.leaderIntents && (
                <div className="panel overflow-hidden flex flex-col">
                  <div className="panel-header">
                    <Globe className="w-4 h-4" />
                    Leader Intent Matrix
                  </div>
                  <div className="p-4 h-48 border-b border-line">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analysis.leaderIntents} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-line)" vertical={false} />
                        <XAxis dataKey="leaderName" stroke="var(--theme-muted)" tick={{ fill: 'var(--theme-muted)', fontSize: 10 }} />
                        <YAxis domain={[0, 10]} stroke="var(--theme-muted)" tick={{ fill: 'var(--theme-muted)', fontSize: 10 }} />
                        <Tooltip
                          cursor={{ fill: '#F0EBE1' }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-panel border border-line p-3 shadow-xl max-w-xs">
                                  <p className="font-sans text-sm text-red mb-1">{data.leaderName}</p>
                                  <p className="text-xs text-muted mb-1">{data.country}</p>
                                  <p className="text-xs font-sans">THREAT LEVEL: {data.threatLevel}/10</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="threatLevel" radius={[2, 2, 0, 0]}>
                          {analysis.leaderIntents.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.threatLevel > 7 ? 'var(--theme-red)' : entry.threatLevel > 4 ? 'var(--theme-yellow)' : 'var(--theme-green)'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="overflow-x-auto flex-1">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-[1.5fr_1fr_2fr_1fr] col-header">
                        <div>Leader</div>
                        <div>Country</div>
                        <div>Inferred Intent</div>
                        <div>Threat Lvl</div>
                      </div>
                      {analysis.leaderIntents.map((intent, idx) => (
                        <div key={idx} className="grid grid-cols-[1.5fr_1fr_2fr_1fr] data-row items-center gap-4">
                          <div className="font-medium text-sm">{intent.leaderName}</div>
                          <div className="text-xs text-muted">{intent.country}</div>
                          <div className="text-xs truncate" title={intent.inferredIntent}>{intent.inferredIntent}</div>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-line h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={clsx("h-full", intent.threatLevel > 7 ? "bg-red" : intent.threatLevel > 4 ? "bg-yellow" : "bg-green")}
                                style={{ width: `${(intent.threatLevel / 10) * 100}%` }}
                              />
                            </div>
                            <span className="data-value">{intent.threatLevel}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Regional Issues */}
              {analysis.regionalIssues && (
                <div className="panel overflow-hidden flex flex-col">
                  <div className="panel-header">
                    <Activity className="w-4 h-4" />
                    Regional Issue Mapping
                  </div>
                  <div className="overflow-x-auto flex-1">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr] col-header">
                        <div>Region/Country</div>
                        <div>Primary Issue</div>
                        <div>Stance</div>
                        <div>Intensity</div>
                      </div>
                      {analysis.regionalIssues.map((issue, idx) => (
                        <div key={idx} className="grid grid-cols-[1.5fr_2fr_1fr_1fr] data-row items-center gap-4">
                          <div className="font-medium text-sm">{issue.regionOrCountry}</div>
                          <div className="text-xs truncate" title={issue.issue}>{issue.issue}</div>
                          <div className="text-xs">
                            <span 
                              title={
                                (issue.stance?.toLowerCase().includes('support') || issue.stance?.toLowerCase().includes('dukung') || issue.stance?.toLowerCase().includes('pro')) ? "Mendukung kebijakan atau tindakan ini (Support)" :
                                (issue.stance?.toLowerCase().includes('oppose') || issue.stance?.toLowerCase().includes('tolak') || issue.stance?.toLowerCase().includes('kontra') || issue.stance?.toLowerCase().includes('lawan')) ? "Menolak kebijakan atau tindakan ini (Oppose)" :
                                "Tidak memihak atau belum menentukan sikap (Neutral)"
                              }
                              className={clsx(
                                "px-2 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider cursor-help",
                                (issue.stance?.toLowerCase().includes('support') || issue.stance?.toLowerCase().includes('dukung') || issue.stance?.toLowerCase().includes('pro')) ? "bg-green/20 text-green" :
                                (issue.stance?.toLowerCase().includes('oppose') || issue.stance?.toLowerCase().includes('tolak') || issue.stance?.toLowerCase().includes('kontra') || issue.stance?.toLowerCase().includes('lawan')) ? "bg-red/20 text-red" :
                                "bg-muted/20 text-muted"
                              )}
                            >
                              {issue.stance || 'N/A'}
                            </span>
                          </div>
                          <div className="data-value text-right">{issue.intensityScore}/10</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Temporal Trend Analysis */}
            {analysis.temporalTrends && (
              <div className="lg:col-span-3 panel overflow-hidden flex flex-col">
                <div className="panel-header">
                  <Clock className="w-4 h-4" />
                  Temporal Trend Analysis
                </div>
                <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 border-b border-line">
                  <div className="lg:col-span-2 h-64">
                    <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Issue Escalation Graph</div>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analysis.temporalTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorEscalation" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--theme-red)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--theme-red)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-line)" vertical={false} />
                        <XAxis dataKey="week" stroke="var(--theme-muted)" tick={{ fill: 'var(--theme-muted)', fontSize: 10 }} />
                        <YAxis domain={[0, 10]} stroke="var(--theme-muted)" tick={{ fill: 'var(--theme-muted)', fontSize: 10 }} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-panel border border-line p-3 shadow-xl max-w-xs">
                                  <p className="font-sans text-sm text-red mb-1">{data.week}</p>
                                  <p className="text-xs text-muted mb-2">{data.keyEvent}</p>
                                  <div className="flex flex-col gap-1 text-xs font-sans">
                                    <span>ESCALATION: {data.escalationScore}/10</span>
                                    <span>COUNTRIES: {data.countryMentions}</span>
                                    <span>STATEMENTS: {data.leaderStatements}</span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area type="monotone" dataKey="escalationScore" stroke="var(--theme-red)" fillOpacity={1} fill="url(#colorEscalation)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-4 justify-center">
                    <div className="bg-panel border border-line p-4 rounded text-center">
                      <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Momentum Index</div>
                      <div className="text-4xl font-mono font-bold text-red">{analysis.momentumIndex}<span className="text-xl text-muted">/100</span></div>
                    </div>
                    <div className="bg-panel border border-line p-4 rounded">
                      <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Narrative Shift Detection</div>
                      <div className="text-sm text-ink italic">"{analysis.narrativeShift}"</div>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <div className="min-w-[600px]">
                    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_3fr] col-header">
                      <div>Week</div>
                      <div>Country Mentions</div>
                      <div>Leader Statements</div>
                      <div>Escalation Score</div>
                      <div>Key Event</div>
                    </div>
                    {analysis.temporalTrends.map((trend, idx) => (
                      <div key={idx} className="grid grid-cols-[1fr_1fr_1fr_1fr_3fr] data-row items-center gap-4">
                        <div className="font-medium text-sm">{trend.week}</div>
                        <div className="data-value">{trend.countryMentions}</div>
                        <div className="data-value">{trend.leaderStatements}</div>
                        <div className="data-value text-red">{trend.escalationScore}</div>
                        <div className="text-xs text-muted truncate" title={trend.keyEvent}>{trend.keyEvent}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Narrative Cluster Engine */}
            <div className="lg:col-span-3 panel overflow-hidden flex flex-col">
              <div className="panel-header">
                <Network className="w-4 h-4" />
                Narrative Cluster Engine (Information Warfare)
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysis.narrativeClusters?.map((cluster, idx) => (
                  <div key={idx} className="bg-panel border border-line p-4 rounded flex flex-col gap-4">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-mono text-sm text-red font-bold leading-tight">{cluster.narrative}</h3>
                      <span className={clsx("text-[10px] px-2 py-1 rounded-full font-mono uppercase tracking-wider whitespace-nowrap",
                        cluster.propagationSpeed?.toLowerCase() === 'viral' ? 'bg-red/20 text-red' :
                        cluster.propagationSpeed?.toLowerCase() === 'fast' ? 'bg-yellow/20 text-yellow' :
                        'bg-blue/20 text-blue'
                      )}>
                        {cluster.propagationSpeed || 'N/A'}
                      </span>
                    </div>

                    {/* Propagation Map Visual */}
                    <div className="flex flex-col gap-3 mt-2 relative">
                      {/* Origin */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue/20 flex items-center justify-center border border-blue/50 z-10 shrink-0">
                          <Radio className="w-4 h-4 text-blue" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-mono text-muted uppercase">Origin</div>
                          <div className="text-sm text-ink">{cluster.origin}</div>
                        </div>
                      </div>

                      {/* Connecting Line */}
                      <div className="absolute left-4 top-8 bottom-6 w-px bg-line z-0"></div>

                      {/* Amplified */}
                      <div className="flex items-start gap-3 ml-8 relative z-10">
                        <div className="w-6 h-6 rounded-full bg-red/20 flex items-center justify-center border border-red/50 mt-1 shrink-0">
                          <Megaphone className="w-3 h-3 text-red" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-mono text-red uppercase">Amplified By</div>
                          <div className="text-sm text-ink">{cluster.amplifiedBy?.join(', ') || 'None'}</div>
                        </div>
                      </div>

                      {/* Opposed */}
                      <div className="flex items-start gap-3 ml-8 relative z-10">
                        <div className="w-6 h-6 rounded-full bg-green/20 flex items-center justify-center border border-green/50 mt-1 shrink-0">
                          <ShieldAlert className="w-3 h-3 text-green" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-mono text-green uppercase">Opposed By</div>
                          <div className="text-sm text-ink">{cluster.opposedBy?.join(', ') || 'None'}</div>
                        </div>
                      </div>

                      {/* Neutral */}
                      <div className="flex items-start gap-3 ml-8 relative z-10">
                        <div className="w-6 h-6 rounded-full bg-muted/20 flex items-center justify-center border border-muted/50 mt-1 shrink-0">
                          <Eye className="w-3 h-3 text-muted" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-mono text-muted uppercase">Neutral Coverage</div>
                          <div className="text-sm text-ink">{cluster.neutralCoverage?.join(', ') || 'None'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actor Network Graph */}
            <div className="lg:col-span-3 panel overflow-hidden flex flex-col">
              <div className="panel-header">
                <Share2 className="w-4 h-4" />
                Power Influence Graph (Actor Network)
              </div>
              <div className="p-4">
                {analysis.influenceNetwork ? (
                  <InfluenceGraph data={analysis.influenceNetwork} />
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-muted font-mono text-sm border border-line rounded bg-panel">
                    Influence network data not available.
                  </div>
                )}
              </div>
            </div>
            {/* Early Warning Signals Engine */}
            <div className="lg:col-span-3 panel overflow-hidden flex flex-col">
              <div className="panel-header">
                <Radar className="w-4 h-4" />
                Early Warning Signals Engine (Weak Signal Detection)
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysis.earlyWarningSignals?.map((signal, idx) => (
                  <div key={idx} className="bg-panel border border-line p-4 rounded flex flex-col gap-4 relative overflow-hidden">
                    {/* Alert Indicator if score is high */}
                    {signal.weakSignalScore > 5 && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-red animate-pulse"></div>
                    )}
                    
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Signal Type</span>
                        <h3 className="font-mono text-sm text-ink font-bold leading-tight">{signal.signalType}</h3>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Confidence</span>
                        <span className={clsx("text-lg font-mono font-bold", 
                          signal.confidence >= 70 ? "text-red" : 
                          signal.confidence >= 40 ? "text-yellow" : "text-green"
                        )}>
                          {signal.confidence}%
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-ink line-clamp-3">
                      {signal.description}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Globe className="w-3 h-3 text-muted" />
                      <span className="text-xs text-muted font-mono">{signal.region}</span>
                    </div>

                    {/* Score Breakdown */}
                    <div className="mt-auto pt-4 border-t border-line flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted">Media Freq × Credibility</span>
                        <span className="font-mono text-ink">{((signal.mediaFrequency || 0) * (signal.credibilityWeight || 0)).toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted">Policy Mention Weight</span>
                        <span className="font-mono text-ink">{signal.policyMentionWeight}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted">Military Indicator Weight</span>
                        <span className="font-mono text-ink">{signal.militaryIndicatorWeight}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-line/50">
                        <span className="text-ink font-bold">Weak Signal Score</span>
                        <span className={clsx("font-mono font-bold",
                          (signal.weakSignalScore || 0) > 5 ? "text-red" : "text-yellow"
                        )}>{(signal.weakSignalScore || 0).toFixed(1)}</span>
                      </div>
                    </div>
                    
                    {signal.weakSignalScore > 5 && (
                      <div className="mt-2 bg-red/10 border border-red/30 rounded p-2 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red shrink-0 mt-0.5" />
                        <div className="text-xs text-red">
                          <strong>Potential escalation detected</strong><br/>
                          Region: {signal.region}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Scenario Simulation Engine */}
            <div className="lg:col-span-3 panel overflow-hidden flex flex-col">
              <div className="panel-header">
                <GitBranch className="w-4 h-4" />
                Geopolitical Scenario Simulator (Scenario Trees & Impact)
              </div>
              <div className="p-4 flex flex-col gap-6">
                {analysis.scenarioSimulation ? (
                  <>
                    <div className="flex items-center gap-3 bg-panel border border-line p-4 rounded">
                      <div className="w-10 h-10 rounded bg-red/20 flex items-center justify-center border border-red/50 shrink-0">
                        <Target className="w-5 h-5 text-red" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted uppercase tracking-wider">Trigger Event</div>
                        <div className="text-base font-bold text-ink">{analysis.scenarioSimulation.triggerEvent}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
                      {/* Connecting lines for desktop */}
                      <div className="hidden lg:block absolute top-0 left-1/2 w-full h-8 border-t border-l border-line -translate-x-1/2 -translate-y-4 rounded-tl"></div>
                      <div className="hidden lg:block absolute top-0 right-1/2 w-full h-8 border-t border-r border-line translate-x-1/2 -translate-y-4 rounded-tr"></div>
                      <div className="hidden lg:block absolute top-0 left-1/2 w-px h-4 bg-line -translate-y-4"></div>

                      {analysis.scenarioSimulation.scenarios?.map((scenario, idx) => (
                        <div key={idx} className="bg-panel border border-line rounded flex flex-col relative mt-4 lg:mt-0">
                          {/* Connector line for mobile */}
                          <div className="lg:hidden absolute -top-4 left-8 w-px h-4 bg-line"></div>
                          
                          <div className="p-4 border-b border-line flex justify-between items-start gap-4">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Scenario {String.fromCharCode(65 + idx)}</span>
                              <h3 className="font-mono text-sm text-ink font-bold leading-tight">{scenario.name}</h3>
                            </div>
                            <div className="flex flex-col items-end shrink-0">
                              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Probability</span>
                              <span className={clsx("text-lg font-mono font-bold", 
                                scenario.probability >= 40 ? "text-red" : 
                                scenario.probability >= 25 ? "text-yellow" : "text-green"
                              )}>
                                {scenario.probability}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4 text-sm text-ink flex-1">
                            {scenario.description}
                          </div>

                          <div className="p-4 bg-panel border-t border-line flex flex-col gap-3">
                            <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">Impact Simulation</div>
                            
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted">Oil Price Impact</span>
                              <span className={clsx("font-mono font-bold", 
                                scenario.impact?.oilPriceImpact?.includes('+') || scenario.impact?.oilPriceImpact?.toLowerCase().includes('high') ? "text-red" :
                                scenario.impact?.oilPriceImpact?.includes('-') || scenario.impact?.oilPriceImpact?.toLowerCase().includes('low') ? "text-green" : "text-yellow"
                              )}>{scenario.impact?.oilPriceImpact || 'N/A'}</span>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted">Supply Chain Impact</span>
                              <span className={clsx("font-mono font-bold",
                                scenario.impact?.supplyChainImpact?.toLowerCase().includes('severe') || scenario.impact?.supplyChainImpact?.toLowerCase().includes('disruption') ? "text-red" :
                                scenario.impact?.supplyChainImpact?.toLowerCase().includes('moderate') ? "text-yellow" : "text-green"
                              )}>{scenario.impact?.supplyChainImpact || 'N/A'}</span>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted">Military Risk Index</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-line rounded-full overflow-hidden">
                                  <div 
                                    className={clsx("h-full", 
                                      (scenario.impact?.militaryRiskIndex || 0) >= 7 ? "bg-red" : 
                                      (scenario.impact?.militaryRiskIndex || 0) >= 4 ? "bg-yellow" : "bg-green"
                                    )} 
                                    style={{ width: `${((scenario.impact?.militaryRiskIndex || 0) / 10) * 100}%` }}
                                  ></div>
                                </div>
                                <span className={clsx("font-mono font-bold w-4 text-right",
                                  (scenario.impact?.militaryRiskIndex || 0) >= 7 ? "text-red" : 
                                  (scenario.impact?.militaryRiskIndex || 0) >= 4 ? "text-yellow" : "text-green"
                                )}>{scenario.impact?.militaryRiskIndex || 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="h-[200px] flex items-center justify-center text-muted font-mono text-sm border border-line rounded bg-panel">
                    Scenario simulation data not available.
                  </div>
                )}
              </div>
            </div>
            {/* OSINT Ingestion Layer */}
            {/* Multi-Source OSINT Ingestion */}
            <div className="lg:col-span-3 panel overflow-hidden flex flex-col">
              <div className="panel-header">
                <Database className="w-4 h-4" />
                Multi-Source OSINT Ingestion (Signal Fusion)
              </div>
              <div className="p-4 flex flex-col gap-6">
                {analysis.osintIngestion ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {analysis.osintIngestion.sources?.map((source, idx) => (
                        <div key={idx} className="bg-panel border border-line p-4 rounded flex flex-col gap-3">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[10px] font-mono px-2 py-1 bg-line text-muted rounded uppercase tracking-wider">
                              {source.sourceType}
                            </span>
                            <div className="flex items-center gap-1">
                              <Activity className={clsx("w-3 h-3", 
                                source.signalStrength >= 70 ? "text-red" : 
                                source.signalStrength >= 40 ? "text-yellow" : "text-green"
                              )} />
                              <span className="text-xs font-mono text-ink">{source.signalStrength}</span>
                            </div>
                          </div>
                          
                          <h4 className="font-bold text-sm text-ink truncate" title={source.sourceName}>
                            {source.sourceName}
                          </h4>
                          
                          <div className="text-xs text-ink line-clamp-3 flex-1">
                            {source.keyFinding}
                          </div>
                          
                          <div className="mt-2 pt-3 border-t border-line flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Reliability</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1 bg-line rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue" 
                                    style={{ width: `${source.reliability}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-mono text-blue">{source.reliability}%</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Credibility</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1 bg-line rounded-full overflow-hidden">
                                  <div 
                                    className={clsx("h-full",
                                      source.credibilityScore >= 8 ? "bg-green" :
                                      source.credibilityScore >= 5 ? "bg-yellow" : "bg-red"
                                    )}
                                    style={{ width: `${(source.credibilityScore / 10) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-mono text-ink">{source.credibilityScore}/10</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-panel border border-line p-4 rounded flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <GitMerge className="w-4 h-4 text-blue" />
                          <h3 className="font-mono text-sm text-ink font-bold uppercase tracking-wider">Multi-Source Signal Fusion</h3>
                        </div>
                        <p className="text-sm text-ink leading-relaxed">
                          {analysis.osintIngestion.fusionSummary}
                        </p>
                      </div>
                      
                      <div className="w-full md:w-auto flex flex-col items-center justify-center p-4 bg-panel border border-line rounded shrink-0 min-w-[150px]">
                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">Overall Confidence</span>
                        <span className={clsx("text-3xl font-mono font-bold",
                          analysis.osintIngestion.overallConfidence >= 80 ? "text-green" :
                          analysis.osintIngestion.overallConfidence >= 50 ? "text-yellow" : "text-red"
                        )}>
                          {analysis.osintIngestion.overallConfidence}%
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-[200px] flex items-center justify-center text-muted font-mono text-sm border border-line rounded bg-panel">
                    OSINT ingestion data not available.
                  </div>
                )}
              </div>
            </div>

            {/* OSINT Verification Methodology Panel */}
            {analysis.osintVerifications && (
              <OsintVerificationPanel verifications={analysis.osintVerifications} />
            )}

            {/* Intelligence Logic Panel */}
            {analysis.intelligenceLogic && (
              <IntelligenceLogicPanel logicLayers={analysis.intelligenceLogic} />
            )}

            {/* Analysis of Competing Hypotheses (ACH) Panel */}
            {analysis.achAnalysis && (
              <ACHPanel ach={analysis.achAnalysis} />
            )}

            {/* Structured Analytic Techniques (SATs) Panel */}
            {analysis.satAnalysis && (
              <SATPanel sat={analysis.satAnalysis} />
            )}

            {/* Deep Dork Crawl Panel */}
            {analysis.deepDorkCrawl && (
              <DeepDorkCrawlPanel data={analysis.deepDorkCrawl} />
            )}

            {/* Global Risk Heatmap */}
            <div className="lg:col-span-3 panel overflow-hidden flex flex-col">
              <div className="panel-header">
                <Map className="w-4 h-4" />
                Global Threat Heatmap
              </div>
              <div className="p-4 flex flex-col gap-6">
                {analysis.globalHeatmap ? (
                  <GlobalHeatmap data={analysis.globalHeatmap} />
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-muted font-mono text-sm border border-line rounded bg-panel">
                    Global heatmap data not available.
                  </div>
                )}
              </div>
            </div>

            {/* Strategic Predictions Panel */}
            {analysis.strategicPredictions && (
              <StrategicPredictionsPanel predictions={analysis.strategicPredictions} />
            )}
          </motion.div>
          </div>
        )}
      </AnimatePresence>

        {/* Empty State / Landing Features */}
        {!analysis && !isScanning && !error && (
          <div className="flex-1 flex flex-col items-center justify-center mt-12">
            <LandingFeatures />
          </div>
        )}
      </div>
    </div>
  );
}
