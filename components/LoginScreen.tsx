import React, { useState } from 'react';
import { BrainCircuit, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onJoin: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onJoin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onJoin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-2xl animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-500/30">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight text-center">OpStorm AI</h1>
          <p className="text-slate-400 mt-2 text-center">Brainstorming Operacional & Priorização</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Como você quer ser chamado?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-600"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            Entrar no Time
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
        
        <p className="mt-6 text-center text-xs text-slate-500">
          Ambiente seguro para levantamento de problemas operacionais.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;