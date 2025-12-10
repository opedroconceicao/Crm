import React from 'react';
import { MOCK_ACTIVITIES } from '../constants';
import { CheckSquare, Calendar, Phone, Mail, Clock } from 'lucide-react';

export const Activities = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={16} />;
      case 'meeting': return <Calendar size={16} />;
      case 'email': return <Mail size={16} />;
      default: return <CheckSquare size={16} />;
    }
  };

  return (
    <div className="p-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Atividades</h1>
        <div className="flex gap-2">
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Todas as Tipologias</option>
            <option>Chamadas</option>
            <option>Reuniões</option>
          </select>
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>A Fazer</option>
            <option>Concluídas</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Tipo</th>
              <th className="px-6 py-4 font-semibold">Descrição</th>
              <th className="px-6 py-4 font-semibold">Data e Hora</th>
              <th className="px-6 py-4 font-semibold">Associado a</th>
              <th className="px-6 py-4 font-semibold text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_ACTIVITIES.map(activity => (
              <tr key={activity.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <button className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${activity.completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 hover:border-indigo-500'}`}>
                    {activity.completed && <CheckSquare size={12} />}
                  </button>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2 text-slate-600 capitalize text-sm">
                     {getIcon(activity.type)}
                     {activity.type === 'call' ? 'Chamada' : activity.type === 'meeting' ? 'Reunião' : 'Email'}
                   </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  {activity.description}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 flex items-center gap-2">
                  <Clock size={14} />
                  {new Date(activity.date).toLocaleDateString()} {new Date(activity.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </td>
                <td className="px-6 py-4 text-sm text-indigo-600 hover:underline cursor-pointer">
                  Ver Negócio
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-medium text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {MOCK_ACTIVITIES.length === 0 && (
           <div className="p-8 text-center text-slate-500">Nenhuma atividade encontrada.</div>
        )}
      </div>
    </div>
  );
};