import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  CheckSquare, 
  Calendar, 
  Globe, 
  BarChart3, 
  Settings,
  ChevronsUpDown,
  Check,
  Plus
} from 'lucide-react';
import { QuotaWidget } from './QuotaWidget';
import { MOCK_ORGANIZATIONS } from '../constants';

export const Sidebar = () => {
  const [isOrgMenuOpen, setIsOrgMenuOpen] = useState(false);
  const [activeOrg, setActiveOrg] = useState(MOCK_ORGANIZATIONS[0]);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOrgMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg mx-2 ${
      isActive 
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`;

  const sectionHeaderClass = "px-6 mt-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider";

  return (
    <aside className="w-64 bg-[#1e293b] flex flex-col h-full fixed left-0 top-0 z-20 border-r border-slate-800 shadow-xl">
      {/* Organization Switcher */}
      <div className="h-16 flex items-center px-4 border-b border-slate-800/50 shrink-0 relative">
        <button 
          onClick={() => setIsOrgMenuOpen(!isOrgMenuOpen)}
          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
             {/* Logo/Avatar */}
             <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
                <span className="text-white font-bold text-sm">{activeOrg.logoInitial}</span>
             </div>
             <div className="text-left">
               <span className="block text-sm font-bold text-white tracking-tight leading-none mb-0.5">{activeOrg.name}</span>
               <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wide">{activeOrg.plan}</span>
             </div>
          </div>
          <ChevronsUpDown size={14} className="text-slate-500 group-hover:text-slate-300" />
        </button>

        {/* Dropdown Menu */}
        {isOrgMenuOpen && (
          <div ref={menuRef} className="absolute top-16 left-2 right-2 bg-[#293548] border border-slate-700 rounded-lg shadow-2xl z-50 overflow-hidden animate-fadeIn">
            <div className="p-1">
              <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                As suas organizações
              </div>
              {MOCK_ORGANIZATIONS.map(org => (
                <button
                  key={org.id}
                  onClick={() => {
                    setActiveOrg(org);
                    setIsOrgMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                    activeOrg.id === org.id ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                     <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                        activeOrg.id === org.id ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'
                     }`}>
                        {org.logoInitial}
                     </div>
                     <span>{org.name}</span>
                  </div>
                  {activeOrg.id === org.id && <Check size={14} />}
                </button>
              ))}
              
              <div className="h-px bg-slate-700 my-1"></div>
              
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-md transition-colors">
                <Plus size={14} />
                <span>Nova Organização</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        
        <div className={sectionHeaderClass}>Plataforma</div>
        <NavLink to="/" className={navClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
        <NavLink to="/pipeline" className={navClass}>
          <KanbanSquare size={18} />
          Negócios
        </NavLink>
        <NavLink to="/activities" className={navClass}>
          <CheckSquare size={18} />
          Atividades
        </NavLink>
        <NavLink to="/calendar" className={navClass}>
          <Calendar size={18} />
          Calendário
        </NavLink>

        <div className={sectionHeaderClass}>Interno</div>
        
        <NavLink to="/websites" className={navClass}>
          <Globe size={18} />
          Snippets & Sites
        </NavLink>
        
        <NavLink to="/reports" className={navClass}>
          <BarChart3 size={18} />
          Relatórios
        </NavLink>

        <div className={sectionHeaderClass}>Sistema</div>

        <NavLink to="/settings" className={navClass}>
          <Settings size={18} />
          Configurações
        </NavLink>
      </div>

      {/* Footer / Quota Widget */}
      <div className="p-4 border-t border-slate-800 bg-[#16202e]">
        <QuotaWidget />
      </div>
    </aside>
  );
};