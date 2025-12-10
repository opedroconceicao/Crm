import React from 'react';
import { MOCK_ACTIVITIES } from '../constants';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export const CalendarPage = () => {
  // Simple calendar logic for current week (Mock visual)
  const today = new Date();
  const weekDays = [];
  
  // Generate current week days
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    weekDays.push(d);
  }

  return (
    <div className="p-8 h-full flex flex-col animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Calendário</h1>
           <p className="text-slate-500">Planeie a sua semana.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
           <button className="p-2 hover:bg-slate-100 rounded-md text-slate-600"><ChevronLeft size={20} /></button>
           <span className="text-sm font-semibold text-slate-700 min-w-[150px] text-center">
             {weekDays[0].toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })}
           </span>
           <button className="p-2 hover:bg-slate-100 rounded-md text-slate-600"><ChevronRight size={20} /></button>
        </div>
        <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50">Dia</button>
            <button className="px-3 py-1.5 text-sm bg-indigo-50 border border-indigo-200 rounded-md text-indigo-700 font-medium">Semana</button>
            <button className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50">Mês</button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-7 border-b border-slate-200">
            {weekDays.map((date, i) => (
                <div key={i} className={`p-4 text-center border-r border-slate-100 last:border-r-0 ${
                    date.getDate() === today.getDate() ? 'bg-indigo-50/50' : ''
                }`}>
                    <p className="text-xs font-semibold text-slate-400 uppercase">{date.toLocaleDateString('pt-PT', { weekday: 'short' })}</p>
                    <div className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full mt-1 ${
                        date.getDate() === today.getDate() ? 'bg-indigo-600 text-white font-bold' : 'text-slate-700'
                    }`}>
                        {date.getDate()}
                    </div>
                </div>
            ))}
        </div>

        {/* Body Grid */}
        <div className="flex-1 grid grid-cols-7 overflow-y-auto">
             {weekDays.map((date, i) => {
                 // Mock filtering logic for demo: randomly show activities on days
                 // In real app, match date strings correctly
                 const hasActivity = MOCK_ACTIVITIES.some(a => new Date(a.date).getDate() === date.getDate());
                 
                 return (
                    <div key={i} className={`border-r border-slate-100 last:border-r-0 p-2 min-h-[400px] ${
                        date.getDate() === today.getDate() ? 'bg-indigo-50/10' : ''
                    }`}>
                        {/* Fake activities placement for visual demo based on mock data distribution */}
                        {hasActivity ? (
                             MOCK_ACTIVITIES.filter(a => new Date(a.date).getDate() === date.getDate()).map(act => (
                                <div key={act.id} className="mb-2 p-2 bg-indigo-50 border-l-2 border-indigo-500 rounded text-xs cursor-pointer hover:bg-indigo-100 transition-colors">
                                    <p className="font-semibold text-indigo-900 truncate">{act.description}</p>
                                    <div className="flex items-center gap-1 text-indigo-700/70 mt-1">
                                        <Clock size={10} />
                                        <span>{new Date(act.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    </div>
                                </div>
                             ))
                        ) : (
                            <div className="h-full" />
                        )}
                        
                        {/* Placeholder for empty state visual */}
                        {!hasActivity && i === 3 && (
                             <div className="mb-2 p-2 bg-emerald-50 border-l-2 border-emerald-500 rounded text-xs opacity-70">
                                <p className="font-semibold text-emerald-900">Almoço de equipa</p>
                                <div className="flex items-center gap-1 text-emerald-700/70 mt-1">
                                    <Clock size={10} />
                                    <span>13:00</span>
                                </div>
                            </div>
                        )}
                    </div>
                 );
             })}
        </div>
      </div>
    </div>
  );
};