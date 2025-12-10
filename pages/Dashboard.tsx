import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { MOCK_DEALS } from '../constants';
import { DealStage } from '../types';

export const Dashboard = () => {
  // Calculate Stats
  const totalLeads = MOCK_DEALS.length;
  const wonDeals = MOCK_DEALS.filter(d => d.stage === DealStage.WON).length;
  const conversionRate = totalLeads > 0 ? Math.round((wonDeals / totalLeads) * 100) : 0;
  
  // Pipeline Data for Chart
  const pipelineData = Object.values(DealStage).map(stage => ({
    name: stage,
    count: MOCK_DEALS.filter(d => d.stage === stage).length
  }));

  // Source Data for Chart
  const sourceCounts: {[key: string]: number} = {};
  MOCK_DEALS.forEach(d => { sourceCounts[d.source] = (sourceCounts[d.source] || 0) + 1 });
  const sourceData = Object.keys(sourceCounts).map(key => ({ name: key, value: sourceCounts[key] }));

  const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
           <p className="text-slate-500">Visão geral da sua performance comercial.</p>
        </div>
        <div className="text-sm text-slate-500">
           Ultima atualização: Agora
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Leads Hoje</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">12</h3>
          <p className="text-xs text-green-600 mt-1 flex items-center">
             ↑ 14% vs ontem
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Taxa de Conversão</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">{conversionRate}%</h3>
          <p className="text-xs text-slate-400 mt-1">
             Média do mercado: 15%
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Valor em Pipeline</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">€43.5k</h3>
          <p className="text-xs text-green-600 mt-1">
             ↑ 5% vs mês passado
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm bg-red-50 border-red-100">
          <p className="text-sm font-medium text-red-600">Atenção Necessária</p>
          <h3 className="text-3xl font-bold text-red-700 mt-2">3</h3>
          <p className="text-xs text-red-500 mt-1">
             Leads sem contacto há 48h
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Funnel Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Funil de Vendas (Atual)</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={pipelineData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="count" barSize={30} radius={[0, 4, 4, 0]}>
                {pipelineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Source Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-96">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Origem das Leads</h3>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {sourceData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Pending Tasks Quick View */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-lg font-bold text-slate-800">Tarefas Pendentes</h3>
           <button className="text-sm text-indigo-600 font-medium hover:underline">Ver todas</button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border-2 border-slate-300 group-hover:border-indigo-500 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                   <p className="text-sm font-medium text-slate-800">Follow-up Proposta Comercial #{i}</p>
                   <p className="text-xs text-slate-500">Vence hoje • Ana Silva</p>
                </div>
              </div>
              <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded">Alta Prioridade</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};