import React, { useState } from 'react';
import { Problem } from '../types';
import { GripVertical, AlertOctagon, ArrowUp, ArrowDown } from 'lucide-react';

interface PriorityRankingProps {
  problems: Problem[];
  onReorder: (newOrder: Problem[]) => void;
}

const PriorityRanking: React.FC<PriorityRankingProps> = ({ problems, onReorder }) => {
  // Local state only needed if we want immediate feedback before parent update,
  // but for simplicity we rely on parent props. We need sorting logic here.
  
  // Sort problems by rankIndex for display
  const sortedProblems = [...problems].sort((a, b) => a.rankIndex - b.rankIndex);

  // HTML5 Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    const sourceIndexStr = e.dataTransfer.getData('text/plain');
    const sourceIndex = parseInt(sourceIndexStr, 10);

    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    // Create new array based on current sorted view
    const newOrder = [...sortedProblems];
    const [movedItem] = newOrder.splice(sourceIndex, 1);
    newOrder.splice(targetIndex, 0, movedItem);

    // Update rankIndex for all items based on new positions
    const reindexedProblems = newOrder.map((prob, idx) => ({
      ...prob,
      rankIndex: idx
    }));

    onReorder(reindexedProblems);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
         <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-indigo-400" />
            Ranking de Prioridade
         </h2>
         <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
           Arraste para priorizar
         </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sortedProblems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50 space-y-2">
            <GripVertical className="w-8 h-8" />
            <p className="text-sm">Os problemas aparecerão aqui para priorização.</p>
          </div>
        ) : (
          sortedProblems.map((problem, index) => (
            <div 
              key={problem.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="group bg-slate-800 hover:bg-slate-750 p-3 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all cursor-move flex items-center gap-3 relative select-none"
            >
              <div className="flex flex-col items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 text-indigo-400 font-bold text-sm">
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-sm leading-snug">{problem.text}</p>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] text-slate-500">por {problem.author}</span>
                </div>
              </div>

              <div className="text-slate-600 group-hover:text-slate-400 transition-colors">
                <GripVertical className="w-5 h-5" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PriorityRanking;