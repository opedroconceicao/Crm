import React, { useState } from 'react';
import { X, Phone, Mail, Calendar, Brain, Loader2, User, Building2 } from 'lucide-react';
import { Deal, Activity } from '../types';
import { STAGE_COLORS } from '../constants';
import { analyzeDeal } from '../services/geminiService';
import { ActivityModal } from './ActivityModal';

interface DealDetailPanelProps {
  deal: Deal | null;
  onClose: () => void;
  activities: Activity[];
}

export const DealDetailPanel: React.FC<DealDetailPanelProps> = ({ deal, onClose, activities }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  
  // Activity Modal State
  const [activityModalType, setActivityModalType] = useState<'call' | 'email' | 'meeting' | null>(null);

  if (!deal) return null;

  const dealActivities = activities.filter(a => a.dealId === deal.id);

  const handleAiAnalyze = async () => {
    setIsAnalyzing(true);
    const activityDesc = dealActivities.map(a => `${a.date.split('T')[0]}: ${a.type} - ${a.description}`);
    const result = await analyzeDeal(deal, activityDesc);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleSaveActivity = (data: any) => {
    console.log("Activity Saved:", data);
    // In a real app, this would dispatch an action to save the activity
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex justify-end pointer-events-none">
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-auto"
          onClick={onClose}
        />
        <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col pointer-events-auto transform transition-transform duration-300 animate-slideInRight">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1">{deal.title}</h2>
              
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                 <span className="flex items-center gap-1"><User size={12} /> {deal.leadName}</span>
                 {deal.companyName && <span className="flex items-center gap-1">• <Building2 size={12} /> {deal.companyName}</span>}
              </div>

              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STAGE_COLORS[deal.stage]}`}>
                {deal.stage}
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
              <X size={24} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2 px-6 py-4 border-b border-slate-100">
             <button 
                onClick={() => setActivityModalType('call')}
                className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors"
             >
               <Phone size={20} className="mb-1" />
               <span className="text-xs font-medium">Ligar</span>
             </button>
             <button 
                onClick={() => setActivityModalType('email')}
                className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors"
             >
               <Mail size={20} className="mb-1" />
               <span className="text-xs font-medium">Email</span>
             </button>
             <button 
                onClick={() => setActivityModalType('meeting')}
                className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors"
             >
               <Calendar size={20} className="mb-1" />
               <span className="text-xs font-medium">Reunião</span>
             </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* AI Insight Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-indigo-700 font-semibold">
                  <Brain size={18} />
                  <span>AI Insight</span>
                </div>
                {!aiAnalysis && !isAnalyzing && (
                  <button 
                    onClick={handleAiAnalyze}
                    className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Analisar
                  </button>
                )}
              </div>
              
              {isAnalyzing && (
                 <div className="flex items-center gap-2 text-sm text-slate-500 py-2">
                   <Loader2 size={16} className="animate-spin" />
                   A analisar dados do lead...
                 </div>
              )}

              {aiAnalysis && (
                <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                  {aiAnalysis}
                </div>
              )}
               {!aiAnalysis && !isAnalyzing && (
                <p className="text-xs text-slate-500">
                  Clique em analisar para obter sugestões de próximos passos e rascunhos de email usando Gemini.
                </p>
              )}
            </div>

            {/* Details */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Detalhes</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Email</span>
                  <span className="text-slate-800 font-medium">{deal.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Telefone</span>
                  <span className="text-slate-800 font-medium">{deal.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Valor Estimado</span>
                  <span className="text-slate-800 font-medium">€{deal.value}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Origem</span>
                  <span className="text-slate-800 font-medium">{deal.source}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Responsável</span>
                  <span className="text-slate-800 font-medium">{deal.owner}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Atividades</h3>
              <div className="relative border-l-2 border-slate-200 ml-2 space-y-6 pb-4">
                {dealActivities.length > 0 ? dealActivities.map(activity => (
                   <div key={activity.id} className="relative pl-6">
                   <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-300"></div>
                   <p className="text-xs text-slate-400 mb-0.5">{new Date(activity.date).toLocaleDateString()}</p>
                   <p className="text-sm font-medium text-slate-800">{activity.description}</p>
                   <p className="text-xs text-slate-500 capitalize">{activity.type}</p>
                 </div>
                )) : (
                  <p className="pl-6 text-sm text-slate-400 italic">Nenhuma atividade registada.</p>
                )}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-400 text-center">
             Criado em {new Date(deal.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <ActivityModal 
        isOpen={!!activityModalType} 
        onClose={() => setActivityModalType(null)} 
        type={activityModalType}
        deal={deal}
        onSave={handleSaveActivity}
      />
    </>
  );
};