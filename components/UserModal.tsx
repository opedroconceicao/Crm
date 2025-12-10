import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, User, Mail, Shield, Lock, Camera, Upload } from 'lucide-react';

interface UserData {
  id?: string;
  name: string;
  email: string;
  role: string;
  status: 'Ativo' | 'Inativo';
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserData | null;
  onSave: (user: UserData) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    role: 'User',
    status: 'Ativo'
  });
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData(user);
        setSendWelcomeEmail(false); // Default to false if editing existing user
      } else {
        setFormData({
            name: '',
            email: '',
            role: '', // Empty initially to force selection
            status: 'Ativo'
        });
        setSendWelcomeEmail(true);
      }
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl animate-fadeIn my-8 relative">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-xl sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">
            {user ? 'Editar Utilizador' : 'Novo Utilizador'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Section: User Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
               <User className="text-slate-400" size={20} />
               <h3 className="text-lg font-semibold text-slate-900">Informações do Utilizador</h3>
            </div>

            {/* Profile Photo */}
            <div className="mb-8">
               <label className="block text-sm font-bold text-slate-700 mb-3">
                  <span className="flex items-center gap-2"><Camera size={16} /> Foto de Perfil</span>
               </label>
               <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-300">
                     <User size={48} />
                  </div>
                  <div>
                     <button type="button" className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 mb-2">
                        <Camera size={16} />
                        Carregar Foto
                     </button>
                     <p className="text-xs text-slate-500">JPG, PNG, GIF ou WEBP. Máximo 2MB.</p>
                  </div>
               </div>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                     Nome <span className="text-red-500">*</span>
                  </label>
                  <input 
                     type="text" 
                     required
                     className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400"
                     placeholder="Nome"
                     value={formData.name}
                     onChange={e => setFormData({...formData, name: e.target.value})}
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                     E-mail <span className="text-red-500">*</span>
                  </label>
                  <input 
                     type="email" 
                     required
                     className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400"
                     placeholder="E-mail"
                     value={formData.email}
                     onChange={e => setFormData({...formData, email: e.target.value})}
                  />
               </div>
               
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                     Grupo de Permissões <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                     <select 
                        required
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none bg-white text-slate-700"
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value})}
                     >
                        <option value="" disabled>Selecionar um grupo de permissões</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="User">User</option>
                     </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                     Estado <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        {formData.status === 'Ativo' ? (
                           <div className="w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center">
                              <Check size={12} className="text-green-600" />
                           </div>
                        ) : (
                           <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200"></div>
                        )}
                        <span className="text-sm font-medium text-slate-700">{formData.status}</span>
                     </div>
                     
                     <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, status: prev.status === 'Ativo' ? 'Inativo' : 'Ativo' }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                           formData.status === 'Ativo' ? 'bg-green-500' : 'bg-slate-200'
                        }`}
                     >
                        <span
                           className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              formData.status === 'Ativo' ? 'translate-x-6' : 'translate-x-1'
                           }`}
                        />
                     </button>
                  </div>
               </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="text-slate-400 rotate-45 transform">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
               </div>
               <h3 className="text-lg font-semibold text-slate-900">Definições de Notificação</h3>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
               <div className="flex h-5 items-center">
                  <input
                     id="welcome-email"
                     name="welcome-email"
                     type="checkbox"
                     checked={sendWelcomeEmail}
                     onChange={(e) => setSendWelcomeEmail(e.target.checked)}
                     className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
               </div>
               <div className="text-sm">
                  <label htmlFor="welcome-email" className="font-bold text-slate-900">
                     Enviar email de boas-vindas
                  </label>
                  <p className="text-slate-500 mt-1">
                     O utilizador receberá um email com as suas credenciais e um link para definir a sua password
                  </p>
               </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-2"
            >
              <Check size={16} />
              {user ? 'Guardar' : 'Criar Utilizador'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};