import React, { useState } from 'react';
import { DealStage, Deal, DealSource } from '../types';
import { MOCK_DEALS, STAGE_COLORS, SOURCE_ICONS } from '../constants';
import { Plus, Search, Filter, User } from 'lucide-react';

interface PipelineProps {
  onDealClick: (deal: Deal) => void;
}

export const Pipeline: React.FC<PipelineProps> = ({ onDealClick }) => {
  const [deals] = useState<Deal[]>(MOCK_DEALS);
  const [filter, setFilter] = useState('');

  const filteredDeals = deals.filter(d => 
    d.title.toLowerCase().includes(filter.toLowerCase()) ||
    d.leadName.toLowerCase().includes(filter.toLowerCase()) || 
    d.companyName.toLowerCase().includes(filter.toLowerCase())
  );

  const getDealsByStage = (stage: DealStage) => filteredDeals.filter(d => d.stage === stage);

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header & Controls */}
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900">Pipeline de Vendas</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Pesquisar negócios..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter size={16} />
            Filtros
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex h-full gap-4 min-w-[1200px]">
          {Object.values(DealStage).map(stage => (
            <div key={stage} className="flex-1 flex flex-col min-w-[280px] bg-slate-100 rounded-xl max-h-full">
              {/* Column Header */}
              <div className="p-3 border-b border-slate-200/50 flex justify-between items-center sticky top-0 bg-slate-100 rounded-t-xl z-10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">{stage}</span>
                  <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">
                    {getDealsByStage(stage).length}
                  </span>
                </div>
              </div>

              {/* Cards Container */}
              <div className="p-2 flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                {getDealsByStage(stage).map(deal => (
                  <div 
                    key={deal.id}
                    onClick={() => onDealClick(deal)}
                    className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group relative"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${STAGE_COLORS[stage]}`}>
                        {stage}
                      </span>
                      <div className="flex gap-1">
                         <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500" title={deal.source}>
                           {SOURCE_ICONS[deal.source]}
                         </span>
                      </div>
                    </div>
                    
                    {/* Deal Title */}
                    <h4 className="font-bold text-slate-900 text-sm mb-1 leading-tight">{deal.title}</h4>
                    
                    {/* Person/Company Subtitle */}
                    <div className="flex items-center gap-1.5 mb-3">
                       <User size={12} className="text-slate-400" />
                       <p className="text-xs text-slate-500 truncate">
                         {deal.leadName} {deal.companyName && `• ${deal.companyName}`}
                       </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-slate-50 pt-3">
                       <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">€{deal.value.toLocaleString()}</span>
                       <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm">
                         {deal.owner.substring(0,2).toUpperCase()}
                       </div>
                    </div>
                    
                    {/* Hover Effect Bar */}
                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-indigo-500 rounded-r opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
                
                {getDealsByStage(stage).length === 0 && (
                   <div className="text-center py-8 opacity-40">
                      <div className="w-12 h-12 border-2 border-dashed border-slate-400 rounded-lg mx-auto mb-2"></div>
                      <p className="text-xs font-medium text-slate-500">Sem negócios</p>
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};