import React, { useRef, useEffect } from 'react';
import { Problem } from '../types';
import { AlertCircle, Clock, CheckCircle2, Loader2 } from 'lucide-react';

interface ProblemFeedProps {
  problems: Problem[];
}

const ProblemFeed: React.FC<ProblemFeedProps> = ({ problems }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new items arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Scroll to top since we reverse map
    }
  }, [problems.length]);

  const getPriorityColor = (priority?: string) => {
    switch(priority) {
      case 'Alta': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Média': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Baixa': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-indigo-400" />
        Feed em Tempo Real
      </h2>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 space-y-3 pb-4 min-h-[400px] max-h-[600px]"
      >
        {problems.length === 0 ? (
          <div className="text-center py-20 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
            <p>Nenhum problema relatado ainda.</p>
            <p className="text-sm">Comece a digitar ou ative a simulação.</p>
          </div>
        ) : (
          [...problems].reverse().map((problem) => (
            <div 
              key={problem.id}
              className="bg-slate-800 p-4 rounded-xl border border-slate-700 animate-fade-in group hover:border-slate-600 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-700 text-xs font-bold text-slate-300`}>
                    {problem.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-200 block">{problem.author}</span>
                    <span className="text-xs text-slate-500">
                      {new Date(problem.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
                
                {problem.isAiProcessing ? (
                  <div className="flex items-center gap-1.5 text-xs text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-full animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    IA Analisando...
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {problem.category && (
                      <span className="text-xs font-medium px-2 py-1 rounded-md bg-slate-700 text-slate-300 border border-slate-600">
                        {problem.category}
                      </span>
                    )}
                    {problem.priority && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getPriorityColor(problem.priority)}`}>
                        {problem.priority}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed pl-10">
                {problem.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProblemFeed;