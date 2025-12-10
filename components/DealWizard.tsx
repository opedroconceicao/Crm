import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, Check, Briefcase, User, Layers, CalendarCheck, Search, Plus } from 'lucide-react';
import { DealStage, DealSource, Contact, Company } from '../types';
import { MOCK_CONTACTS, MOCK_COMPANIES } from '../constants';

interface DealWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const COUNTRY_CODES = [
  { code: 'PT', dial: '+351', flag: '🇵🇹' },
  { code: 'BR', dial: '+55', flag: '🇧🇷' },
  { code: 'ES', dial: '+34', flag: '🇪🇸' },
  { code: 'FR', dial: '+33', flag: '🇫🇷' },
  { code: 'UK', dial: '+44', flag: '🇬🇧' },
  { code: 'US', dial: '+1', flag: '🇺🇸' },
  { code: 'AO', dial: '+244', flag: '🇦🇴' },
  { code: 'MZ', dial: '+258', flag: '🇲🇿' },
  { code: 'CH', dial: '+41', flag: '🇨🇭' },
  { code: 'DE', dial: '+49', flag: '🇩🇪' },
];

// --- Sub-componente de Input com Pesquisa ---
interface SearchableInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onSelect: (item: any) => void;
  data: any[];
  displayKey: string;
  placeholder: string;
  icon?: React.ReactNode;
  required?: boolean;
}

const SearchableInput: React.FC<SearchableInputProps> = ({ 
  label, value, onChange, onSelect, data, displayKey, placeholder, icon, required 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<any[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter data based on input value
    if (value && isOpen) {
      const lower = value.toLowerCase();
      const results = data.filter(item => 
        String(item[displayKey]).toLowerCase().includes(lower)
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  }, [value, isOpen, data, displayKey]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: any) => {
    onChange(item[displayKey]);
    onSelect(item);
    setIsOpen(false);
  };

  const handleCreateNew = () => {
    setIsOpen(false);
    // Logic is handled by parent state just by keeping the value
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-bold text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input 
          type="text" 
          className="w-full p-2.5 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400"
          placeholder={placeholder}
          value={value}
          onChange={e => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
           {icon || <Search size={18} />}
        </div>
      </div>

      {/* Dropdown de Resultados */}
      {isOpen && value.trim().length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-fadeIn">
          {filtered.length > 0 ? (
            <>
               <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                  Registos Encontrados
               </div>
               {filtered.map((item, idx) => (
                 <button
                   key={idx}
                   onClick={() => handleSelect(item)}
                   className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between group"
                 >
                   <span>{item[displayKey]}</span>
                   <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded group-hover:bg-indigo-100 group-hover:text-indigo-600">Existente</span>
                 </button>
               ))}
               <div className="h-px bg-slate-100 my-1"></div>
            </>
          ) : (
            <div className="px-4 py-3 text-sm text-slate-500 italic text-center">
               Nenhum registo encontrado.
            </div>
          )}
          
          {/* Opção Criar Novo */}
          <button
            onClick={handleCreateNew}
            className="w-full text-left px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 flex items-center gap-2 border-t border-slate-100"
          >
            <Plus size={16} />
            Criar novo: <span className="font-bold">"{value}"</span>
          </button>
        </div>
      )}
    </div>
  );
};


export const DealWizard: React.FC<DealWizardProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [phonePrefix, setPhonePrefix] = useState(COUNTRY_CODES[0].dial);
  
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    leadName: '',
    companyName: '',
    email: '',
    phone: '',
    source: DealSource.ORGANIC,
    pipeline: 'Padrão',
    stage: DealStage.NEW,
    activityType: 'call',
    activityNote: '',
  });

  if (!isOpen) return null;

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  
  const handleSubmit = () => {
    // 1. Simular Criação na "Base de Dados" (Arrays MOCK)
    
    // Verificar e Criar Contacto se não existir
    const existingContact = MOCK_CONTACTS.find(c => c.name.toLowerCase() === formData.leadName.toLowerCase());
    if (!existingContact && formData.leadName) {
        MOCK_CONTACTS.push({
            id: `c_${Date.now()}`,
            name: formData.leadName,
            email: formData.email,
            phone: `${phonePrefix} ${formData.phone}`,
            role: 'Novo Lead',
            companyId: '' // Será associado abaixo se existir
        });
        console.log("Novo contacto criado na base de dados:", formData.leadName);
    }

    // Verificar e Criar Empresa se não existir
    const existingCompany = MOCK_COMPANIES.find(c => c.name.toLowerCase() === formData.companyName.toLowerCase());
    if (!existingCompany && formData.companyName) {
        MOCK_COMPANIES.push({
            id: `comp_${Date.now()}`,
            name: formData.companyName,
            industry: 'Outro',
            website: ''
        });
        console.log("Nova empresa criada na base de dados:", formData.companyName);
    }

    // 2. Preparar dados finais do Negócio
    const finalData = {
      ...formData,
      value: Number(formData.value) || 0,
      phone: formData.phone ? `${phonePrefix} ${formData.phone}` : ''
    };
    
    onSubmit(finalData);
    onClose();
    
    // Reset form fully
    setTimeout(() => {
        setStep(1);
        setPhonePrefix(COUNTRY_CODES[0].dial);
        setFormData({
            title: '',
            value: '',
            leadName: '',
            companyName: '',
            email: '',
            phone: '',
            source: DealSource.ORGANIC,
            pipeline: 'Padrão',
            stage: DealStage.NEW,
            activityType: 'call',
            activityNote: '',
        });
    }, 200);
  };

  const handleContactSelect = (contact: Contact) => {
    // Auto-fill fields from existing contact
    setFormData(prev => ({
        ...prev,
        leadName: contact.name,
        email: contact.email || prev.email,
        phone: contact.phone ? contact.phone.replace(phonePrefix, '').trim() : prev.phone, // Try to strip prefix logic roughly
        // If contact has a company, try to fill it too
        companyName: MOCK_COMPANIES.find(c => c.id === contact.companyId)?.name || prev.companyName
    }));
  };

  const handleCompanySelect = (company: Company) => {
    setFormData(prev => ({
        ...prev,
        companyName: company.name
    }));
  };

  const steps = [
    { num: 1, label: 'Negócio', icon: <Briefcase size={14} /> },
    { num: 2, label: 'Contacto', icon: <User size={14} /> },
    { num: 3, label: 'Pipeline', icon: <Layers size={14} /> },
    { num: 4, label: 'Atividade', icon: <CalendarCheck size={14} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">Novo Negócio</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between relative">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-0"></div>
             {steps.map((s) => (
                <div key={s.num} className="relative z-10 flex flex-col items-center gap-1">
                   <div 
                     className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                       step >= s.num 
                         ? 'bg-indigo-600 border-indigo-600 text-white' 
                         : 'bg-white border-slate-300 text-slate-400'
                     }`}
                   >
                     {s.num < step ? <Check size={14} /> : s.icon}
                   </div>
                   <span className={`text-[10px] font-bold uppercase tracking-wide ${step >= s.num ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {s.label}
                   </span>
                </div>
             ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          
          {/* STEP 1: DADOS DO NEGÓCIO */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                 <Briefcase className="text-indigo-500" size={20} />
                 <h3 className="text-md font-semibold text-slate-800">Detalhes do Negócio</h3>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Título do Negócio <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400"
                  placeholder="Ex: Consultoria Q4 - Empresa X"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                   Valor Estimado (€)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">€</span>
                  <input 
                    type="number" 
                    className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="0.00"
                    value={formData.value}
                    onChange={e => setFormData({...formData, value: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ASSOCIAR CLIENTE/CONTACTO */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                 <User className="text-indigo-500" size={20} />
                 <h3 className="text-md font-semibold text-slate-800">Associar Contacto</h3>
              </div>

              {/* Contact Search Input */}
              <SearchableInput 
                label="Nome da Pessoa"
                placeholder="Pesquisar ou criar novo..."
                value={formData.leadName}
                onChange={(val) => setFormData({...formData, leadName: val})}
                onSelect={(item) => handleContactSelect(item)}
                data={MOCK_CONTACTS}
                displayKey="name"
                required
                icon={<User size={18} />}
              />

              {/* Company Search Input */}
              <SearchableInput 
                label="Nome da Empresa"
                placeholder="Pesquisar ou criar nova..."
                value={formData.companyName}
                onChange={(val) => setFormData({...formData, companyName: val})}
                onSelect={(item) => handleCompanySelect(item)}
                data={MOCK_COMPANIES}
                displayKey="name"
                icon={<Briefcase size={18} />}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Telefone</label>
                  <div className="flex">
                    <select
                      className="p-2 border border-r-0 border-slate-300 rounded-l-lg bg-slate-50 text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none min-w-[110px]"
                      value={phonePrefix}
                      onChange={e => setPhonePrefix(e.target.value)}
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.dial}>{c.flag} {c.dial}</option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      className="w-full p-2 border border-slate-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="912..."
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="email@exemplo.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PIPELINE & ORIGEM */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
               <div className="flex items-center gap-2 mb-2">
                 <Layers className="text-indigo-500" size={20} />
                 <h3 className="text-md font-semibold text-slate-800">Pipeline e Origem</h3>
               </div>
               
               <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Pipeline</label>
                <select className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" disabled>
                  <option>Pipeline de Vendas (Padrão)</option>
                </select>
               </div>

               <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Origem do Negócio</label>
                <select 
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={formData.source}
                  onChange={e => setFormData({...formData, source: e.target.value as DealSource})}
                >
                  {Object.values(DealSource).map(src => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
               </div>

               <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Etapa Inicial</label>
                <div className="space-y-2">
                  {Object.values(DealStage).map(stage => (
                    <label key={stage} className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${formData.stage === stage ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}`}>
                      <input 
                        type="radio" 
                        name="stage" 
                        value={stage}
                        checked={formData.stage === stage}
                        onChange={() => setFormData({...formData, stage})}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-slate-700">{stage}</span>
                    </label>
                  ))}
                </div>
               </div>
            </div>
          )}

          {/* STEP 4: ATIVIDADE INICIAL */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
               <div className="flex items-center gap-2 mb-2">
                 <CalendarCheck className="text-indigo-500" size={20} />
                 <h3 className="text-md font-semibold text-slate-800">Atividade Inicial</h3>
               </div>
               <p className="text-sm text-slate-500 mb-4">Agende já o próximo passo para não perder o timing.</p>
               
               <div className="flex gap-2 mb-4">
                 {['call', 'meeting', 'task'].map(type => (
                   <button 
                    key={type}
                    onClick={() => setFormData({...formData, activityType: type})}
                    className={`flex-1 py-3 px-3 text-sm font-medium rounded-lg border transition-colors ${formData.activityType === type ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                   >
                     {type === 'call' ? 'Ligar' : type === 'meeting' ? 'Reunião' : 'Tarefa'}
                   </button>
                 ))}
               </div>

               <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Observação / Descrição</label>
                <textarea 
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none h-24 resize-none"
                  placeholder="Ex: Ligar para confirmar interesse e agendar demo..."
                  value={formData.activityNote}
                  onChange={e => setFormData({...formData, activityNote: e.target.value})}
                />
               </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex justify-between bg-slate-50">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${step === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            Voltar
          </button>
          
          {step < 4 ? (
             <button 
             onClick={nextStep}
             disabled={step === 1 && !formData.title || step === 2 && !formData.leadName}
             className="px-6 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
           >
             Próximo <ArrowRight size={16} />
           </button>
          ) : (
            <button 
             onClick={handleSubmit}
             className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 flex items-center gap-2"
           >
             <Check size={16} /> Criar Negócio
           </button>
          )}
        </div>
      </div>
    </div>
  );
};