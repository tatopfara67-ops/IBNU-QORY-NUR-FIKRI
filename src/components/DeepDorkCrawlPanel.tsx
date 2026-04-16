import React, { useState } from 'react';
import { DeepDorkCrawl, DorkItem } from '../services/gemini';
import { 
  Search, 
  Globe, 
  ShieldAlert, 
  Copy, 
  Check, 
  Database, 
  Archive, 
  FileSpreadsheet,
  ListTree,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import clsx from 'clsx';

interface DeepDorkCrawlPanelProps {
  data: DeepDorkCrawl;
}

export function DeepDorkCrawlPanel({ data }: DeepDorkCrawlPanelProps) {
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);
  const [waybackUrl, setWaybackUrl] = useState('');
  const [waybackLoading, setWaybackLoading] = useState(false);
  const [waybackResult, setWaybackResult] = useState<any>(null);
  const [waybackError, setWaybackError] = useState('');

  if (!data) return null;

  const handleCopy = (query: string) => {
    navigator.clipboard.writeText(query);
    setCopiedQuery(query);
    setTimeout(() => setCopiedQuery(null), 2000);
  };

  const checkWayback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waybackUrl) return;

    setWaybackLoading(true);
    setWaybackError('');
    setWaybackResult(null);

    try {
      const targetUrl = encodeURIComponent(waybackUrl);
      const response = await fetch(`https://archive.org/wayback/available?url=${targetUrl}`);
      
      if (!response.ok) {
        throw new Error('Gagal menghubungi server Wayback Machine');
      }

      const responseData = await response.json();
      setWaybackResult(responseData);
    } catch (err: any) {
      setWaybackError(err.message || 'Terjadi kesalahan saat memeriksa URL');
    } finally {
      setWaybackLoading(false);
    }
  };

  const renderDorkSection = (title: string, icon: React.ReactNode, dorks: DorkItem[], colorClass: string) => (
    <div className="bg-panel border border-line rounded-lg overflow-hidden">
      <div className={clsx("px-4 py-3 border-b border-line flex items-center gap-2 font-bold text-sm", colorClass)}>
        {icon}
        {title}
      </div>
      <div className="divide-y divide-[#E5E0D8]">
        {dorks.map((dork, idx) => (
          <div key={idx} className="p-4 hover:bg-bg transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <code className="block w-full bg-line border border-line p-3 rounded text-sm text-green font-mono break-all mb-2">
                  {dork.query}
                </code>
                <p className="text-xs text-muted">{dork.purpose}</p>
              </div>
              <button 
                onClick={() => handleCopy(dork.query)}
                className="shrink-0 p-2 bg-bg hover:bg-line rounded border border-line text-ink transition-colors"
                title="Copy Dork"
              >
                {copiedQuery === dork.query ? <Check className="w-4 h-4 text-green" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="col-span-1 lg:col-span-3 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-ink">Deep Dork Crawl (OSINT)</h2>
        <div className="h-px bg-line flex-1 ml-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Dorks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="text-sm text-ink bg-blue/10 border border-blue/20 p-4 rounded-lg">
            <p className="mb-2">
              <strong>Deep Dork Crawl</strong> adalah kombinasi Google Dorking tingkat lanjut dan pengumpulan sistematis. 
              Gunakan *query* di bawah ini pada Google, Bing, atau Yahoo untuk menemukan dokumen tersembunyi, laporan rahasia, atau arsip lama.
            </p>
            <p className="text-xs text-blue">
              💡 <strong>Tips 2026:</strong> Tambahkan <code className="bg-ink/10 px-1 py-0.5 rounded">&tbs=cdr:1,cd_min:1/1/2025</code> di URL Google untuk filter tanggal yang lebih stabil.
            </p>
          </div>

          {renderDorkSection(
            "Dasar untuk Berita Indonesia", 
            <Search className="w-4 h-4" />, 
            data.dorks.indonesian,
            "text-blue"
          )}

          {renderDorkSection(
            "Internasional (Reuters, BBC, NYT, dll)", 
            <Globe className="w-4 h-4" />, 
            data.dorks.international,
            "text-blue"
          )}

          {renderDorkSection(
            "Advanced Combo (Deep Dork Level Pro)", 
            <ShieldAlert className="w-4 h-4" />, 
            data.dorks.advanced,
            "text-red"
          )}
        </div>

        {/* Right Column: Crawl Strategy & Archiving */}
        <div className="space-y-6">
          
          {/* Crawl Strategy */}
          <div className="bg-panel border border-line rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-line flex items-center gap-2 font-bold text-sm text-green">
              <ListTree className="w-4 h-4" />
              Teknik Crawl Sistematis
            </div>
            <div className="p-4">
              <ol className="relative border-l border-green/30 ml-3 space-y-4">
                {data.crawlStrategy.map((step, idx) => (
                  <li key={idx} className="pl-6 relative">
                    <span className="absolute -left-2.5 top-0.5 flex items-center justify-center w-5 h-5 bg-panel rounded-full ring-4 ring-panel border border-green/50 text-[10px] font-bold text-green">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-ink leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Archiving Tools & Wayback Checker */}
          <div className="bg-panel border border-line rounded-lg overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-line flex items-center gap-2 font-bold text-sm text-yellow">
              <Archive className="w-4 h-4" />
              Archiving Tools & Wayback Checker
            </div>
            
            <div className="p-4 border-b border-line">
              <div className="flex flex-wrap gap-2 mb-4">
                {data.archivingTools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-yellow/10 border border-yellow/20 text-yellow text-xs rounded-full font-medium">
                    {tool}
                  </span>
                ))}
              </div>
              
              <p className="text-xs text-muted mb-3">
                Cek apakah sebuah URL (artikel, dokumen) sudah pernah diarsipkan oleh Wayback Machine.
              </p>
              
              <form onSubmit={checkWayback} className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/berita"
                  value={waybackUrl}
                  onChange={(e) => setWaybackUrl(e.target.value)}
                  className="flex-1 bg-line border border-line rounded px-3 py-2 text-sm text-ink focus:outline-none focus:border-orange/50"
                  required
                />
                <button
                  type="submit"
                  disabled={waybackLoading || !waybackUrl}
                  className="px-4 py-2 bg-yellow/10 hover:bg-yellow/20 text-yellow border border-yellow/30 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {waybackLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Cek
                </button>
              </form>
            </div>

            {/* Wayback Result */}
            {(waybackResult || waybackError) && (
              <div className="p-4 bg-ink/5">
                {waybackError ? (
                  <div className="flex items-start gap-2 text-red text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{waybackError}</p>
                  </div>
                ) : waybackResult?.archived_snapshots?.closest?.available ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green text-sm font-medium">
                      <Check className="w-4 h-4" />
                      Arsip Ditemukan!
                    </div>
                    <div className="text-xs text-muted">
                      Timestamp: {waybackResult.archived_snapshots.closest.timestamp}
                    </div>
                    <a 
                      href={waybackResult.archived_snapshots.closest.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue hover:text-blue/80 transition-colors"
                    >
                      Buka Arsip di Wayback Machine
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-yellow text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>URL ini belum diarsipkan di Wayback Machine.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Spreadsheet Structure */}
          <div className="bg-panel border border-line rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-line flex items-center gap-2 font-bold text-sm text-blue">
              <FileSpreadsheet className="w-4 h-4" />
              Struktur Spreadsheet
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {data.spreadsheetColumns.map((col, idx) => (
                  <React.Fragment key={idx}>
                    <span className="text-xs font-mono text-ink bg-blue/10 px-2 py-1 rounded border border-blue/20">
                      {col}
                    </span>
                    {idx < data.spreadsheetColumns.length - 1 && (
                      <span className="text-muted mt-1">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
