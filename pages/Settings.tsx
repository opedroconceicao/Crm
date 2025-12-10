import React, { useState } from 'react';
import { Monitor, Shield, Calendar, Users as UsersIcon, CreditCard, CheckCircle2, Star, Check } from 'lucide-react';
import { Users } from './Users';

type TabType = 'profile' | 'users' | 'password' | '2fa' | 'appearance' | 'subscription';

interface SettingsProps {
  initialTab?: TabType;
}

export const Settings: React.FC<SettingsProps> = ({ initialTab = 'profile' }) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Definições</h1>
        <p className="text-slate-500">Gerir as definições do seu perfil e conta</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Perfil
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Utilizadores
            </button>
             <button
              onClick={() => setActiveTab('subscription')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                activeTab === 'subscription'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Assinatura
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'password'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Palavra-passe
            </button>
            <button
              onClick={() => setActiveTab('2fa')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === '2fa'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              2FA
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'appearance'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Aparência
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full space-y-8">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-10 animate-fadeIn max-w-4xl">
              
              {/* Profile Info */}
              <section>
                <div className="mb-6">
                   <h3 className="text-lg font-medium text-slate-900">Informações do perfil</h3>
                   <p className="text-sm text-slate-500">Atualize o seu nome e endereço de e-mail</p>
                </div>
                
                <div className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                    <input 
                      type="text" 
                      defaultValue="João Marques"
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Endereço de e-mail</label>
                    <input 
                      type="email" 
                      defaultValue="joao@managlead.com"
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    />
                  </div>
                  <div className="pt-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                      Guardar
                    </button>
                  </div>
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* Calendar Feed */}
              <section>
                <div className="mb-4">
                   <h3 className="text-lg font-medium text-slate-900">Feed do Calendário</h3>
                   <p className="text-sm text-slate-500 max-w-2xl">
                     Gere uma URL pública para sincronizar as suas atividades com aplicações de calendário externas (Google Calendar, Apple Calendar, Outlook, etc.)
                   </p>
                </div>
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                   <Calendar size={16} />
                   Gerar URL do Calendário
                </button>
              </section>

              <hr className="border-slate-100" />

              {/* Active Sessions */}
              <section>
                <div className="flex items-start gap-4 mb-6">
                   <div className="mt-1">
                     <Monitor size={20} className="text-slate-400" />
                   </div>
                   <div>
                      <h3 className="text-lg font-medium text-slate-900">Sessões Ativas</h3>
                      <p className="text-sm text-slate-500">Gerencie suas sessões ativas em todos os dispositivos</p>
                   </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                   {/* Auto Expiry Config */}
                   <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">Expiração Automática</h4>
                          <p className="text-xs text-slate-500 max-w-md mt-1">
                            Sessões inativas serão encerradas automaticamente após o período configurado
                          </p>
                        </div>
                        <button className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 font-medium">
                           Guardar
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                         <input type="number" defaultValue="30" className="w-16 p-2 border border-slate-300 rounded-lg text-center text-sm" />
                         <span className="text-sm text-slate-600">dias de inatividade</span>
                      </div>
                   </div>

                   <hr className="border-slate-100" />

                   {/* Current Session */}
                   <div className="flex items-start gap-4 p-4 border border-blue-100 bg-blue-50/30 rounded-lg">
                      <div className="mt-1 text-blue-600">
                        <Monitor size={24} />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-slate-900">Chrome 142.0.0.0 on OS X</span>
                            <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Sessão Atual</span>
                         </div>
                         <p className="text-xs text-slate-500">Desktop</p>
                         <div className="mt-2 text-xs text-slate-500 space-y-1">
                            <p>📍 109.51.235.106</p>
                            <p>🕒 Última atividade: Agora</p>
                            <p>🛡️ Chrome 142.0.0.0</p>
                         </div>
                      </div>
                   </div>
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* Danger Zone */}
              <section>
                 <h3 className="text-lg font-medium text-slate-900 mb-4">Eliminar conta</h3>
                 <p className="text-sm text-slate-500 mb-4">Eliminar a sua conta e todos os seus recursos</p>
                 
                 <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                    <h4 className="text-sm font-bold text-red-700 mb-2">Aviso</h4>
                    <p className="text-sm text-red-600 mb-4">
                       Proceda com cuidado, esta ação não pode ser desfeita.
                    </p>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                       Eliminar conta
                    </button>
                 </div>
              </section>

            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
             <Users isEmbedded={true} />
          )}

          {/* SUBSCRIPTION TAB */}
          {activeTab === 'subscription' && (
             <div className="space-y-10 animate-fadeIn">
                <div className="mb-6">
                   <h3 className="text-lg font-bold text-slate-900">Gestão de Assinatura</h3>
                   <p className="text-sm text-slate-500">Ativait</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Current Plan Card */}
                    <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-8 relative overflow-hidden shadow-sm flex flex-col justify-between min-h-[340px]">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-sm font-bold text-slate-900">Assinatura Atual</span>
                                </div>
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">Teste</span>
                            </div>
                            
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-1">Professional</h2>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-slate-900">€89</span>
                                        <span className="text-slate-500">/mês</span>
                                    </div>
                                </div>
                                <div className="text-slate-300">
                                    <CreditCard size={48} strokeWidth={1} />
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Período de teste termina em</span>
                                    <span className="font-medium text-slate-900">Dec 23, 2025</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Próxima Data de Faturação</span>
                                    <span className="font-medium text-slate-900">Dec 23, 2025</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Período Atual</span>
                                    <span className="font-medium text-slate-900">Jan 09, 2026</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                                <Monitor size={14} className="rotate-180" /> {/* Using Monitor as placeholder for upgrade icon */}
                                Fazer Upgrade
                            </button>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                                <Monitor size={14} className="rotate-180" /> 
                                Fazer Downgrade
                            </button>
                            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors ml-auto">
                                Cancelar Assinatura
                            </button>
                        </div>
                    </div>

                    {/* Stats & Features Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Estatísticas de Uso</h3>
                        
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <UsersIcon size={16} />
                                    Utilizadores
                                </div>
                                <span className="text-sm font-bold text-slate-900">1 / 25</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                <div className="bg-green-500 h-2 rounded-full w-[4%]"></div>
                            </div>
                            <span className="text-xs text-slate-400">24 vagas disponíveis</span>
                        </div>

                        <hr className="border-slate-100 mb-6" />

                        <h3 className="text-sm font-bold text-slate-900 mb-4">Funcionalidades do Plano</h3>
                        <ul className="space-y-3 flex-1">
                            {[
                                'Gerenciamento de utilizadores', 
                                'Grupos de permissões', 
                                'Quadros Kanban',
                                'Registo de atividades',
                                'Modelos de e-mail',
                                'Sistema de notificações',
                                'Pesquisa avançada com Spotlight',
                                'Autenticação de dois fatores',
                                'Exportação de dados'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                    <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Available Plans */}
                <div className="pt-8">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Planos Disponíveis</h3>
                        <p className="text-slate-500">Escolha um plano adequado às suas necessidades</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Starter */}
                        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col hover:border-slate-300 transition-colors">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-bold text-slate-900">€39</span>
                                <span className="text-slate-500">por mês</span>
                            </div>
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded w-fit mb-6">Standard trial: 14 dias</span>
                            
                            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">
                                Ideal for growing teams. More collaboration resources.
                            </p>

                            <ul className="space-y-3 mb-8 flex-1">
                                {[
                                    'Gerenciamento de utilizadores',
                                    'Grupos de permissões',
                                    'Quadros Kanban',
                                    'Registo de atividades',
                                    'Modelos de e-mail',
                                    'Sistema de notificações',
                                    'Pesquisa básica'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                             <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                                <UsersIcon size={16} />
                                <span>10 utilizadores</span>
                            </div>

                            <button className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors">
                                Fazer Downgrade
                            </button>
                        </div>

                        {/* Professional */}
                        <div className="bg-white border-2 border-green-500 rounded-xl p-8 shadow-md flex flex-col relative transform md:-translate-y-2">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
                                <span className="bg-indigo-900 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Star size={10} fill="currentColor" /> Recomendado
                                </span>
                                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Check size={10} /> Plano Atual
                                </span>
                             </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-2 mt-2">Professional</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-bold text-slate-900">€89</span>
                                <span className="text-slate-500">por mês</span>
                            </div>
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded w-fit mb-6">Standard trial: 14 dias</span>
                            
                            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">
                                Advanced resources for productive teams. Security and total control.
                            </p>

                            <ul className="space-y-3 mb-8 flex-1">
                                {[
                                    'Gerenciamento de utilizadores',
                                    'Grupos de permissões',
                                    'Quadros Kanban',
                                    'Registo de atividades',
                                    'Modelos de e-mail',
                                    'Sistema de notificações',
                                    'Pesquisa avançada com Spotlight',
                                    'Autenticação de dois fatores',
                                    'Exportação de dados'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                             <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                                <UsersIcon size={16} />
                                <span>25 utilizadores</span>
                            </div>

                            <button className="w-full py-3 bg-green-100 text-green-800 rounded-lg font-bold text-sm hover:bg-green-200 transition-colors cursor-default">
                                Plano Atual
                            </button>
                        </div>

                         {/* Enterprise */}
                         <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col hover:border-slate-300 transition-colors">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-bold text-slate-900">€199</span>
                                <span className="text-slate-500">por mês</span>
                            </div>
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded w-fit mb-6">Standard trial: 14 dias</span>
                            
                            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">
                                Complete enterprise solution. Dedicated support and personalized integrations.
                            </p>

                            <ul className="space-y-3 mb-8 flex-1">
                                {[
                                    'Gerenciamento de utilizadores',
                                    'Grupos de permissões',
                                    'Quadros Kanban',
                                    'Registo de atividades',
                                    'Modelos de e-mail',
                                    'Sistema de notificações',
                                    'Pesquisa avançada com Spotlight',
                                    'Autenticação de dois fatores',
                                    'Exportação de dados',
                                    'Suporte prioritário',
                                    'Integrações personalizadas',
                                    'Registos de auditoria completos'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                             <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                                <UsersIcon size={16} />
                                <span>70 utilizadores</span>
                            </div>

                            <button className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors">
                                Fazer Upgrade
                            </button>
                        </div>
                    </div>
                </div>
             </div>
          )}

          {/* PASSWORD TAB */}
          {activeTab === 'password' && (
            <div className="space-y-8 animate-fadeIn max-w-xl">
               <div className="mb-6">
                   <h3 className="text-lg font-medium text-slate-900">Atualizar palavra-passe</h3>
                   <p className="text-sm text-slate-500">
                     Certifique-se de que a sua conta utiliza uma palavra-passe longa e aleatória para se manter segura
                   </p>
               </div>

               <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Palavra-passe atual</label>
                    <input 
                      type="password" 
                      placeholder="Palavra-passe atual"
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nova palavra-passe</label>
                    <input 
                      type="password" 
                      placeholder="Nova palavra-passe"
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar palavra-passe</label>
                    <input 
                      type="password" 
                      placeholder="Confirmar palavra-passe"
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    />
                  </div>

                  <div className="pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm w-full md:w-auto">
                      Guardar palavra-passe
                    </button>
                  </div>
               </div>
            </div>
          )}

          {/* 2FA TAB */}
          {activeTab === '2fa' && (
             <div className="space-y-8 animate-fadeIn max-w-2xl">
               <div className="mb-6">
                   <h3 className="text-lg font-medium text-slate-900">Autenticação de Dois Fatores</h3>
                   <p className="text-sm text-slate-500">
                     Adicione uma camada extra de segurança à sua conta
                   </p>
               </div>

               <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                  <div>
                     <h4 className="text-lg font-medium text-slate-900 mb-2">A Autenticação de Dois Fatores está Inativa</h4>
                     <p className="text-sm text-slate-500 leading-relaxed">
                        Quando a autenticação de dois fatores está ativa, será solicitado um token seguro e aleatório durante a autenticação.
                     </p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
                     Ativar 2FA
                  </button>
               </div>
             </div>
          )}

           {/* APPEARANCE TAB */}
           {activeTab === 'appearance' && (
             <div className="space-y-8 animate-fadeIn max-w-2xl">
               <div className="mb-6">
                   <h3 className="text-lg font-medium text-slate-900">Aparência</h3>
                   <p className="text-sm text-slate-500">
                     Personalize a aparência da aplicação.
                   </p>
               </div>
               
               <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                  Opções de tema em breve.
               </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};
