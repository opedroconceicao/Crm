import React, { useEffect, useRef, useState } from 'react';
import { Search, Clock, ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  // Auto focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn border border-slate-200">
        
        {/* Header / Input */}
        <div className="flex items-center px-4 py-4 border-b border-slate-100">
          <Search className="text-slate-400 w-6 h-6 mr-3" />
          <input 
            ref={inputRef}
            type="text"
            className="flex-1 text-lg text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent"
            placeholder="Pesquise qualquer coisa..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-500 tracking-wide">
            ESC
          </div>
        </div>

        {/* Body / Content */}
        <div className="h-[300px] overflow-y-auto p-4">
          {query.trim() === '' ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 text-slate-300">
                <Clock size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-slate-600 font-medium text-lg mb-1">Comece a escrever para pesquisar...</h3>
              <p className="text-slate-400 text-sm">Pesquise utilizadores, atividades, quadros e mais</p>
            </div>
          ) : (
            /* Mock Results State */
            <div className="space-y-2">
               <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Resultados</div>
               <div className="p-3 bg-indigo-50 rounded-lg flex items-center gap-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">AS</div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Ana Silva</p>
                    <p className="text-xs text-slate-500">Negócio • Leadflow</p>
                  </div>
               </div>
               <div className="p-3 hover:bg-slate-50 rounded-lg flex items-center gap-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">CF</div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Carlos Ferreira</p>
                    <p className="text-xs text-slate-500">Contacto • O Porto</p>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer / Hints */}
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-start gap-6 text-xs text-slate-500">
           <div className="flex items-center gap-2">
             <div className="flex gap-1">
               <span className="w-5 h-5 flex items-center justify-center bg-white border border-slate-200 rounded shadow-sm text-slate-400"><ArrowUp size={10} /></span>
               <span className="w-5 h-5 flex items-center justify-center bg-white border border-slate-200 rounded shadow-sm text-slate-400"><ArrowDown size={10} /></span>
             </div>
             <span>para navegar</span>
           </div>
           
           <div className="flex items-center gap-2">
             <span className="h-5 px-1.5 flex items-center justify-center bg-white border border-slate-200 rounded shadow-sm text-slate-600 font-bold tracking-wide">
               enter
             </span>
             <span>para selecionar</span>
           </div>
        </div>

      </div>
    </div>
  );
};
