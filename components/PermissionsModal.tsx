import React from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, Users, Edit3, Plus } from 'lucide-react';

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_ROLES = [
  { id: '1', name: 'Admin', description: 'Acesso total a todas as funcionalidades e configurações.', users: 2, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: '2', name: 'Manager', description: 'Gestão de equipas, relatórios e pipelines. Sem acesso a faturação.', users: 1, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: '3', name: 'User', description: 'Acesso básico a leads, negócios e atividades atribuídas.', users: 5, color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

export const PermissionsModal: React.FC<PermissionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-fadeIn relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Shield size={20} />
            </div>
            <div>
                <h2 className="text-lg font-bold text-slate-800">Grupos de Permissões</h2>
                <p className="text-xs text-slate-500">Defina o que cada função pode fazer no sistema</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
            <div className="mb-4 flex justify-end">
                <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                    <Plus size={16} />
                    Criar Novo Grupo
                </button>
            </div>

            <div className="space-y-3">
                {MOCK_ROLES.map((role) => (
                    <div key={role.id} className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition-colors group">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-slate-800">{role.name}</h3>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${role.color}`}>
                                        {role.name}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 mb-3">{role.description}</p>
                                <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                                    <Users size={14} />
                                    {role.users} utilizadores ativos
                                </div>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                <Edit3 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-end">
             <button 
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors"
            >
              Fechar
            </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
