import React from 'react';
import { OsintVerificationMethod } from '../services/gemini';
import { Search, MapPin, Clock, Image as ImageIcon, Users, Satellite, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

interface OsintVerificationPanelProps {
  verifications: OsintVerificationMethod[];
}

const getMethodIcon = (methodName: string) => {
  const name = methodName.toLowerCase();
  if (name.includes('geo')) return <MapPin className="w-4 h-4 text-blue" />;
  if (name.includes('chrono')) return <Clock className="w-4 h-4 text-orange" />;
  if (name.includes('image') || name.includes('reverse')) return <ImageIcon className="w-4 h-4 text-blue" />;
  if (name.includes('social')) return <Users className="w-4 h-4 text-orange" />;
  if (name.includes('satellite') || name.includes('geo')) return <Satellite className="w-4 h-4 text-green" />;
  if (name.includes('tool')) return <ShieldCheck className="w-4 h-4 text-yellow" />;
  return <Search className="w-4 h-4 text-muted" />;
};

export function OsintVerificationPanel({ verifications }: OsintVerificationPanelProps) {
  if (!verifications || verifications.length === 0) return null;

  return (
    <div className="panel col-span-1 lg:col-span-3">
      <div className="panel-header">
        <ShieldCheck className="w-4 h-4" />
        OSINT Verification Methodology
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {verifications.map((method, idx) => (
          <div key={idx} className="bg-panel border border-line p-4 rounded flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {getMethodIcon(method.methodName)}
                <h4 className="font-bold text-sm text-ink">{method.methodName}</h4>
              </div>
              <span className={clsx(
                "text-[10px] font-mono px-2 py-1 rounded uppercase tracking-wider",
                method.status === 'Verified' ? "bg-green/10 text-green border border-green/20" :
                method.status === 'In Progress' ? "bg-yellow/10 text-yellow border border-yellow/20" :
                method.status === 'Unverified' ? "bg-red/10 text-red border border-red/20" :
                "bg-line text-muted border border-line"
              )}>
                {method.status}
              </span>
            </div>
            
            <p className="text-xs text-muted italic border-l-2 border-line pl-2">
              {method.description}
            </p>
            
            <div className="text-sm text-ink flex-1 mt-1">
              <span className="text-blue font-mono text-[10px] uppercase tracking-wider block mb-1">Application</span>
              {method.application}
            </div>
            
            <div className="mt-2 pt-3 border-t border-line">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Confidence Level</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-line rounded-full overflow-hidden">
                    <div 
                      className={clsx("h-full",
                        method.confidence >= 80 ? "bg-green" :
                        method.confidence >= 50 ? "bg-yellow" : "bg-red"
                      )}
                      style={{ width: `${method.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono text-ink">{method.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
