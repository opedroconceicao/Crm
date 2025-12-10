import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, Calendar, Check, Brain, Loader2 } from 'lucide-react';
import { Deal } from '../types';
import { generateEmailDraft } from '../services/geminiService';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'call' | 'email' | 'meeting' | null;
  deal: Deal;
  onSave: (activity: any) => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({ isOpen, onClose, type, deal, onSave }) => {
  const [formData, setFormData] = useState({
    description: '',
    date: new Date().toISOString().slice(0, 16),
    duration: 30,
    outcome: 'connected',
    emailSubject: '',
    emailBody: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, date: new Date().toISOString().slice(0, 16) }));
    }
  }, [isOpen]);

  if (!isOpen || !type) return null;

  const titles = {
    call: 'Registar Chamada',
    email: 'Enviar Email',
    meeting: 'Agendar Reunião',
  };

  const handleSave = () => {
    onSave({
      ...formData,
      type,
      dealId: deal.id
    });
    onClose();
  };

  const handleGenerateEmail = async () => {
    if (!formData.description && !formData.emailSubject) {
        alert("Por favor indique um tópico ou assunto para a IA gerar o email.");
        return;
    }
    setIsGenerating(true);
    const topic = formData.description || formData.emailSubject || "Follow up geral";
    const draft = await generateEmailDraft(deal, topic);
    setFormData(prev => ({
        ...prev,
        emailSubject: draft.subject,
        emailBody: draft.body
    }));
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
                type === 'call' ? 'bg-blue-100 text-blue-600' :
                type === 'email' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
            }`}>
                {type === 'call' && <Phone size={20} />}
                {type === 'email' && <Mail size={20} />}
                {type === 'meeting' && <Calendar size={20} />}
            </div>
            <div>
                <h2 className="text-lg font-bold text-slate-800">{titles[type]}</h2>
                <p className="text-xs text-slate-500">Para: {deal.leadName} ({deal.companyName})</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
            
            {/* CALL FORM */}
            {type === 'call' && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Resultado da Chamada</label>
                        <select 
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={formData.outcome}
                            onChange={e => setFormData({...formData, outcome: e.target.value})}
                        >
                            <option value="connected">Conectado / Falou</option>
                            <option value="no_answer">Sem resposta</option>
                            <option value="voicemail">Correio de voz</option>
                            <option value="wrong_number">Número errado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Notas da Chamada</label>
                        <textarea 
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none h-32 resize-none"
                            placeholder="Resumo do que foi falado..."
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                </>
            )}

            {/* EMAIL FORM */}
            {type === 'email' && (
                <>
                    <div className="flex justify-between items-end">
                       <label className="block text-sm font-medium text-slate-600">Assunto</label>
                       <button 
                         onClick={handleGenerateEmail}
                         disabled={isGenerating}
                         className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium mb-1 disabled:opacity-50"
                       >
                         {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Brain size={12} />}
                         Gerar com IA
                       </button>
                    </div>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Assunto do email"
                        value={formData.emailSubject}
                        onChange={e => setFormData({...formData, emailSubject: e.target.value})}
                    />
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Mensagem</label>
                        <textarea 
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none h-48 resize-none font-mono text-sm"
                            placeholder="Escreva seu email aqui..."
                            value={formData.emailBody}
                            onChange={e => setFormData({...formData, emailBody: e.target.value})}
                        />
                    </div>
                </>
            )}

            {/* MEETING FORM */}
            {type === 'meeting' && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Data e Hora</label>
                            <input 
                                type="datetime-local" 
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                value={formData.date}
                                onChange={e => setFormData({...formData, date: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Duração (min)</label>
                            <select 
                                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                value={formData.duration}
                                onChange={e => setFormData({...formData, duration: Number(e.target.value)})}
                            >
                                <option value={15}>15 min</option>
                                <option value={30}>30 min</option>
                                <option value={45}>45 min</option>
                                <option value={60}>1 hora</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Agenda / Descrição</label>
                        <textarea 
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none h-32 resize-none"
                            placeholder="O que será discutido..."
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                </>
            )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
            <button 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg"
            >
                Cancelar
            </button>
            <button 
                onClick={handleSave}
                className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 flex items-center gap-2"
            >
                <Check size={16} />
                {type === 'call' ? 'Registar Chamada' : type === 'email' ? 'Enviar Email' : 'Agendar Reunião'}
            </button>
        </div>

      </div>
    </div>
  );
};