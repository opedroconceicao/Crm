import React from 'react';

export const QuotaWidget = () => {
  const current = 432;
  const max = 500;
  const percentage = (current / max) * 100;
  
  // Determine color based on usage
  let colorClass = 'bg-emerald-500';
  if (percentage > 75) colorClass = 'bg-yellow-500';
  if (percentage > 90) colorClass = 'bg-red-500';

  return (
    <div className="bg-[#0f172a]/50 rounded-xl p-4 border border-slate-700/50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plano Pro</span>
        <span className="text-[10px] font-bold text-slate-200">{current} / {max}</span>
      </div>
      
      <div className="w-full bg-slate-700 rounded-full h-1.5 mb-3">
        <div 
          className={`h-1.5 rounded-full ${colorClass} transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {percentage > 80 ? (
        <button className="w-full py-1.5 text-[10px] font-bold bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors uppercase tracking-wide">
          Upgrade
        </button>
      ) : (
        <div className="text-[10px] text-slate-500 flex items-center gap-1">
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
           Renova em 12 dias
        </div>
      )}
    </div>
  );
};