import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface InputAreaProps {
  onAdd: (text: string) => void;
  isSimulating: boolean;
  toggleSimulation: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onAdd, isSimulating, toggleSimulation }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700 mb-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Descreva um problema operacional..."
          className="flex-1 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 transition-all"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Enviar</span>
        </button>
      </form>
      
      <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
        <p>A IA categorizará automaticamente sua entrada.</p>
        <button 
          onClick={toggleSimulation}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
            isSimulating 
              ? 'bg-amber-500/10 border-amber-500/50 text-amber-400' 
              : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          {isSimulating ? 'Simulação de Time: ON' : 'Simular Time (Demo)'}
        </button>
      </div>
    </div>
  );
};

export default InputArea;