import React from 'react';
import { MOCK_WEBSITES } from '../constants';
import { Globe, Code, Copy, ExternalLink, ArrowLeft, Download, ChevronDown, CheckCircle } from 'lucide-react';

export const LeadsWebsites = () => {
  // Using the first mock website as the "Selected" detail view to match the image
  const activeSite = MOCK_WEBSITES[0];

  return (
    <div className="p-6 md:p-8 animate-fadeIn max-w-7xl mx-auto space-y-6">
      
      {/* Back Button */}
      <div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <ArrowLeft size={16} />
          Voltar
        </button>
      </div>

      {/* Main Detail Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
           <div className="flex items-center gap-3">
             <Code className="text-blue-500" size={28} />
             <h1 className="text-2xl font-bold text-slate-900">Configuração do Snippet</h1>
           </div>
           <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
             <Copy size={16} />
             Copiar Snippet
           </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
           <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Estado</span>
              <div className="flex items-center gap-2 font-medium text-slate-800">
                <CheckCircle size={18} className="text-green-500" />
                Ativo
              </div>
           </div>
           <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Leads Captadas</span>
              <div className="text-xl font-bold text-slate-800">
                {activeSite.leadCount}
              </div>
           </div>
           <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Criado em</span>
              <div className="text-sm font-medium text-slate-800">
                09/12/2025 19:36
                <div className="text-xs text-slate-400 font-normal mt-0.5">Por João Marques</div>
              </div>
           </div>
           <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Última atualização</span>
              <div className="text-sm font-medium text-slate-800">
                09/12/2025 19:36
              </div>
           </div>
        </div>
      </div>

      {/* Submissions Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
         <div className="mb-6 border-b border-slate-100 pb-6">
            <h2 className="text-xl font-bold text-slate-900">Submissões de Leads</h2>
            <p className="text-slate-500 text-sm mt-1">Todas as submissões capturadas através deste snippet.</p>
         </div>

         {/* Filters Toolbar */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="w-full md:w-64 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
               <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                 <Download size={16} />
                 Exportar
               </button>
               <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                 Colunas <ChevronDown size={14} />
               </button>
            </div>
         </div>

         {/* Table */}
         <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Domínio</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">URL</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Dados</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Submetido Em</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {/* Empty State for Demo */}
                 <tr>
                   <td colSpan={4} className="px-6 py-12 text-center text-slate-500 text-sm">
                      Ainda não há dados para mostrar.
                   </td>
                 </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};