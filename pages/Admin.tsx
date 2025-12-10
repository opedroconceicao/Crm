import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 animate-fadeIn">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Administração</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 space-y-1">
           <button className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-700">
             Organização
           </button>
           <button 
             onClick={() => navigate('/users')}
             className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
           >
             Utilizadores
           </button>
           {['Pipelines', 'Billing', 'Importação'].map((item) => (
             <button 
               key={item} 
               className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
             >
               {item}
             </button>
           ))}
        </div>

        <div className="flex-1 bg-white border border-slate-200 rounded-xl p-8 min-h-[400px]">
           <h2 className="text-lg font-bold text-slate-800 mb-4">Detalhes da Organização</h2>
           <form className="space-y-4 max-w-lg">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Empresa</label>
               <input type="text" className="w-full p-2 border border-slate-300 rounded-lg" defaultValue="Minha Empresa Lda" />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Domínio</label>
               <input type="text" className="w-full p-2 border border-slate-300 rounded-lg" defaultValue="minhaempresa.pt" />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
               <select className="w-full p-2 border border-slate-300 rounded-lg">
                 <option>Europe/Lisbon (GMT+0)</option>
               </select>
             </div>
             <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Salvar Alterações</button>
           </form>
        </div>
      </div>
    </div>
  );
};