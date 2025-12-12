import React from 'react';
import { BrainCircuit, Users, Activity } from 'lucide-react';

interface HeaderProps {
  count: number;
  onlineCount: number;
}

const Header: React.FC<HeaderProps> = ({ count, onlineCount }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">OpStorm AI</h1>
            <p className="text-xs text-slate-400">Brainstorming Operacional Inteligente</p>
          </div>
        </div>
        
        <div className="flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-slate-200">{count} Problemas</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700">
            <Users className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-200">{onlineCount} Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;