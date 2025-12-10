import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Upload, MoreVertical, ChevronLeft, ChevronRight, User, Shield, Info } from 'lucide-react';
import { UserModal } from '../components/UserModal';
import { PermissionsModal } from '../components/PermissionsModal';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Ativo' | 'Inativo';
  initials: string;
}

const MOCK_USERS_LIST: UserData[] = [
  { id: '1', name: 'Pedro Conceição', email: 'pedro@inovcorp.com', role: 'Admin - Ativait', status: 'Ativo', initials: 'PC' },
  { id: '2', name: 'Ana Silva', email: 'ana@inovcorp.com', role: 'Manager - Vendas', status: 'Ativo', initials: 'AS' },
  { id: '3', name: 'João Santos', email: 'joao@inovcorp.com', role: 'User - Vendas', status: 'Inativo', initials: 'JS' },
];

interface UsersProps {
  isEmbedded?: boolean;
}

export const Users: React.FC<UsersProps> = ({ isEmbedded = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS_LIST);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  // Mock Plan Limits
  const PLAN_LIMIT = 5;
  const CURRENT_USERS = users.filter(u => u.status === 'Ativo').length;
  const USAGE_PERCENT = (CURRENT_USERS / PLAN_LIMIT) * 100;

  const handleAddUser = (userData: any) => {
    if (editingUser) {
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData, initials: userData.name.substring(0,2).toUpperCase() } : u));
    } else {
        const newUser = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9),
            initials: userData.name.substring(0,2).toUpperCase(),
            role: `${userData.role} - Ativait` // Mock role formatting
        };
        setUsers([...users, newUser]);
    }
  };

  const openEdit = (user: UserData) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={isEmbedded ? "animate-fadeIn" : "p-8 animate-fadeIn"}>
      {/* Page Header - Hide if embedded in Settings */}
      {!isEmbedded && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
             <h1 className="text-2xl font-bold text-slate-900">Utilizadores</h1>
          </div>
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setIsPermissionsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors"
             >
                <Shield size={16} />
                Grupos de Permissões
             </button>
             <div className="h-8 w-px bg-slate-200 mx-1 hidden md:block"></div>
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium text-sm transition-colors">
                <Upload size={16} />
                Importar CSV
             </button>
             <button 
               onClick={openNew}
               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm transition-colors"
             >
                <Plus size={16} />
                Novo Utilizador
             </button>
          </div>
        </div>
      )}

      {/* Embedded Header Actions */}
      {isEmbedded && (
          <div className="mb-6 flex justify-between items-center">
             <div>
                <h3 className="text-lg font-medium text-slate-900">Gestão de Utilizadores</h3>
                <p className="text-sm text-slate-500">Adicione e girar os membros da sua equipa.</p>
             </div>
             <div className="flex gap-2">
                 <button 
                    onClick={() => setIsPermissionsOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium text-xs transition-colors"
                 >
                    <Shield size={14} />
                    Gerir Grupos
                 </button>
                 <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium text-xs transition-colors">
                    <Upload size={14} />
                    Importar
                 </button>
                 <button 
                   onClick={openNew}
                   className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-xs shadow-sm transition-colors"
                 >
                    <Plus size={14} />
                    Novo
                 </button>
             </div>
          </div>
      )}

      {/* User Limit Progress Bar */}
      <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
             <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <UsersIcon size={20} />
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5 min-w-[200px]">
                   <span className="text-sm font-bold text-slate-800">Plano Basic</span>
                   <span className="text-xs font-medium text-slate-500">{CURRENT_USERS} / {PLAN_LIMIT} utilizadores</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                   <div 
                     className={`h-2 rounded-full transition-all duration-500 ${USAGE_PERCENT >= 100 ? 'bg-red-500' : USAGE_PERCENT > 80 ? 'bg-orange-500' : 'bg-blue-500'}`} 
                     style={{ width: `${Math.min(USAGE_PERCENT, 100)}%` }}
                   ></div>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
             <div className="flex items-start gap-2 text-xs text-slate-500 max-w-[200px] leading-tight hidden md:flex">
                <Info size={14} className="shrink-0 mt-0.5" />
                <span>O seu plano atual permite até {PLAN_LIMIT} utilizadores ativos.</span>
             </div>
             {USAGE_PERCENT >= 80 && (
                 <button className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg border border-amber-200 hover:bg-amber-200 transition-colors whitespace-nowrap">
                   Fazer Upgrade
                 </button>
             )}
          </div>
      </div>

      {/* Main Content Card */}
      <div className={`bg-white rounded-xl border border-slate-200 shadow-sm`}>
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              <span className="hidden md:inline">Filtros</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Download size={16} />
              <span className="hidden md:inline">Exportar</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100">Nome ↕</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100">E-mail ↕</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100">Grupo ↕</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                        {user.initials}
                      </div>
                      <span className="font-medium text-slate-800 text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        user.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                        onClick={() => openEdit(user)}
                        className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredUsers.length === 0 && (
                 <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                       <div className="mx-auto w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                         <User size={18} className="text-slate-400" />
                       </div>
                       <p className="font-medium text-sm">Nenhum utilizador encontrado</p>
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-b-xl">
           <div className="text-xs text-slate-500">
             A mostrar <span className="font-medium text-slate-800">1</span> a <span className="font-medium text-slate-800">{filteredUsers.length}</span> de <span className="font-medium text-slate-800">{filteredUsers.length}</span>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <div className="flex gap-1">
                   <button className="p-1 rounded border border-slate-200 bg-white text-slate-400 disabled:opacity-50" disabled>
                     <ChevronLeft size={14} />
                   </button>
                   <button className="p-1 rounded border border-slate-200 bg-white text-slate-400 disabled:opacity-50" disabled>
                     <ChevronRight size={14} />
                   </button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={editingUser}
        onSave={handleAddUser}
      />
      
      <PermissionsModal
        isOpen={isPermissionsOpen}
        onClose={() => setIsPermissionsOpen(false)}
      />
    </div>
  );
};

// Helper icon component for use inside Users.tsx if not imported
const UsersIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
