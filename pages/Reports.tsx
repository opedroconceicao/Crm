import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import { MOCK_DEALS } from '../constants';
import { DealStage, DealSource } from '../types';

export const Reports = () => {
  // Aggregate data for Source Performance
  const sourceStats = Object.values(DealSource).map(source => {
      const deals = MOCK_DEALS.filter(d => d.source === source);
      return {
          name: source,
          count: deals.length,
          value: deals.reduce((acc, curr) => acc + curr.value, 0)
      };
  });

  // Aggregate data for Pipeline Velocity (Mock)
  const velocityData = [
      { name: 'Jan', value: 12000 },
      { name: 'Fev', value: 19000 },
      { name: 'Mar', value: 15000 },
      { name: 'Abr', value: 24000 },
      { name: 'Mai', value: 32000 },
  ];

  const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b'];

  return (
    <div className="p-8 animate-fadeIn space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relatórios</h1>
          <p className="text-slate-500">Análise detalhada do seu desempenho comercial.</p>
        </div>
        <div className="flex gap-2">
           <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white">
               <option>Últimos 30 dias</option>
               <option>Este Ano</option>
               <option>Todo o período</option>
           </select>
           <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Exportar PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Ganho</h3>
             <p className="text-3xl font-bold text-slate-900">€64,500</p>
             <p className="text-xs text-green-600 font-medium mt-1">+12% vs mês anterior</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-sm font-semibold text-slate-500 mb-1">Ticket Médio</h3>
             <p className="text-3xl font-bold text-slate-900">€2,150</p>
             <p className="text-xs text-slate-400 font-medium mt-1">Estável</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-sm font-semibold text-slate-500 mb-1">Ciclo de Venda</h3>
             <p className="text-3xl font-bold text-slate-900">14 Dias</p>
             <p className="text-xs text-green-600 font-medium mt-1">-2 dias (mais rápido)</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Deals by Source (Count) */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Negócios por Origem</h3>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={sourceStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
         </div>

         {/* Revenue Trend */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Crescimento de Receita</h3>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={velocityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill:'#fff'}} activeDot={{r: 6}} />
                </LineChart>
            </ResponsiveContainer>
         </div>

         {/* Source Value Distribution */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Valor Gerado por Origem</h3>
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie
                        data={sourceStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {sourceStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
};