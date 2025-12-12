import React from 'react';
import { AnalysisResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Lightbulb, Target, AlertTriangle, ListChecks, Wand2 } from 'lucide-react';

interface AnalysisBoardProps {
  result: AnalysisResult | null;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  hasData: boolean;
}

const AnalysisBoard: React.FC<AnalysisBoardProps> = ({ result, onAnalyze, isAnalyzing, hasData }) => {
  const COLORS = ['#818cf8', '#34d399', '#f472b6', '#fbbf24', '#60a5fa'];

  if (!result && !isAnalyzing) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
          <Wand2 className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Insights da Operação</h3>
        <p className="text-slate-400 max-w-xs mb-6 text-sm">
          Colete dados suficientes para gerar um relatório completo com causas raízes e planos de ação.
        </p>
        <button
          onClick={onAnalyze}
          disabled={!hasData}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20"
        >
          Gerar Relatório de IA
        </button>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="relative w-20 h-20 mb-6">
           <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500/30 rounded-full animate-ping"></div>
           <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
        <h3 className="text-lg font-medium text-white animate-pulse">O Gemini está analisando os dados...</h3>
        <p className="text-slate-500 text-sm mt-2">Identificando padrões e causas raízes</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex justify-between items-center mb-2">
         <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            Relatório de Inteligência
         </h2>
         <button onClick={onAnalyze} className="text-xs text-indigo-400 hover:text-indigo-300 underline">
            Atualizar Análise
         </button>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-slate-800 p-5 rounded-xl border border-indigo-500/30">
        <h3 className="text-indigo-200 font-semibold mb-2 text-sm uppercase tracking-wider">Resumo Executivo</h3>
        <p className="text-slate-200 text-sm leading-relaxed">{result?.summary}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Categories Chart */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <h3 className="text-slate-400 text-xs font-bold uppercase mb-4">Volume por Categoria</h3>
           <div className="h-40 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={result?.topCategories}>
                 <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={false} tickLine={false} />
                 <YAxis hide />
                 <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', fontSize: '12px'}}
                 />
                 <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {result?.topCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Root Causes */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-3 flex items-center gap-2">
             <AlertTriangle className="w-3 h-3 text-red-400" />
             Causas Raízes
          </h3>
          <ul className="space-y-2">
            {result?.rootCauses.map((cause, idx) => (
              <li key={idx} className="flex gap-2 text-xs text-slate-300">
                <span className="text-red-400 font-bold">•</span>
                {cause}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
        <h3 className="text-slate-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
           <Target className="w-4 h-4 text-emerald-400" />
           Plano de Ação Recomendado
        </h3>
        <div className="space-y-3">
           {result?.actionItems.map((item, idx) => (
             <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-slate-700/30 border border-slate-700/50">
               <div className="mt-0.5 bg-emerald-500/20 p-1 rounded">
                 <ListChecks className="w-3 h-3 text-emerald-400" />
               </div>
               <span className="text-sm text-slate-200">{item}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisBoard;