import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Pipeline } from './pages/Pipeline';
import { Activities } from './pages/Activities';
import { LeadsWebsites } from './pages/LeadsWebsites';
import { Admin } from './pages/Admin';
import { Users } from './pages/Users';
import { CalendarPage } from './pages/Calendar';
import { Reports } from './pages/Reports';
import { Settings as SettingsPage } from './pages/Settings';
import { Plus, Bell, Search, ChevronRight, ChevronDown, Settings, LogOut, User } from 'lucide-react';
import { DealWizard } from './components/DealWizard';
import { DealDetailPanel } from './components/DealDetailPanel';
import { SearchModal } from './components/SearchModal';
import { Deal, Activity } from './types';
import { MOCK_ACTIVITIES } from './constants';

// Helper component for dynamic header content
const HeaderContent = () => {
  const location = useLocation();
  
  const getBreadcrumb = (path: string) => {
    switch(path) {
      case '/': return ['Plataforma', 'Painel'];
      case '/pipeline': return ['Vendas', 'Negócios'];
      case '/activities': return ['Vendas', 'Atividades'];
      case '/calendar': return ['Plataforma', 'Calendário'];
      case '/websites': return ['Interno', 'Snippets'];
      case '/reports': return ['Interno', 'Relatórios'];
      case '/admin': return ['Sistema', 'Configurações'];
      case '/users': return ['Sistema', 'Utilizadores'];
      case '/settings': return ['Utilizador', 'Definições'];
      default: return ['Managlead', 'App'];
    }
  };

  const [category, page] = getBreadcrumb(location.pathname);

  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <span className="hover:text-slate-800 cursor-pointer">{category}</span>
      <ChevronRight size={14} />
      <span className="font-semibold text-slate-800">{page}</span>
    </div>
  );
};

const App = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  
  // Profile Menu State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close profile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDealCreate = (data: any) => {
    console.log("Creating deal:", data);
  };

  return (
    <HashRouter>
      <div className="flex h-screen bg-[#f3f4f6] text-slate-900 font-sans">
        <Sidebar />
        
        <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
          {/* Top Header */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
            {/* Left: Breadcrumbs/Sidebar Toggle */}
            <div className="flex items-center gap-4">
              <HeaderContent />
            </div>

            {/* Right: Search, Lang, Profile */}
            <div className="flex items-center gap-4">
              {/* Search Bar Trigger */}
              <div 
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center relative cursor-pointer group"
              >
                <Search size={16} className="absolute left-3 text-slate-400 group-hover:text-slate-500" />
                <div className="pl-9 pr-12 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 w-64 group-hover:bg-slate-100 group-hover:border-slate-300 transition-all select-none">
                   Procurar...
                </div>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-white group-hover:border-slate-300">⌘ K</span>
              </div>

              {/* Language */}
              <button className="hidden md:flex items-center gap-1 text-sm text-slate-600 border border-slate-200 rounded-lg px-2 py-1.5 hover:bg-slate-50">
                PT <ChevronDown size={12} />
              </button>

              {/* Notification */}
              <button className="text-slate-500 hover:text-slate-700 relative p-1.5">
                <Bell size={18} />
                <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
              </button>
              
              <div className="h-6 w-px bg-slate-200 mx-1"></div>

              {/* User Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-2 cursor-pointer p-1 rounded-lg transition-colors ${isProfileOpen ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                >
                   <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 border border-slate-200">
                     JM
                   </div>
                   <div className="hidden md:block text-sm font-medium text-slate-700">
                      João Marques
                   </div>
                   <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-12 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn flex flex-col">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                       <p className="text-sm font-bold text-slate-900">João Marques</p>
                       <p className="text-xs text-slate-500 font-medium">joao@managlead.com</p>
                    </div>
                    
                    <div className="p-1">
                      <Link 
                        to="/settings" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <Settings size={16} />
                        Configurações
                      </Link>
                      
                      <Link
                         to="/settings"
                         onClick={() => setIsProfileOpen(false)}
                         className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <User size={16} />
                        O meu perfil
                      </Link>
                    </div>

                    <div className="h-px bg-slate-100 mx-1"></div>

                    <div className="p-1">
                      <button 
                         onClick={() => { setIsProfileOpen(false); alert("Logout"); }}
                         className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto relative p-0 scroll-smooth">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pipeline" element={<Pipeline onDealClick={setSelectedDeal} />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/websites" element={<LeadsWebsites />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/users" element={<SettingsPage initialTab="users" />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Floating Action Button */}
        <button 
          onClick={() => setIsWizardOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all z-40 flex items-center gap-2 group"
        >
          <Plus size={28} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">Novo Negócio</span>
        </button>

        {/* Modals & Panels */}
        <DealWizard 
          isOpen={isWizardOpen} 
          onClose={() => setIsWizardOpen(false)}
          onSubmit={handleDealCreate}
        />

        <DealDetailPanel 
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
          activities={activities}
        />

        <SearchModal 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

      </div>
    </HashRouter>
  );
};

export default App;