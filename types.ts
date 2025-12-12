export interface Problem {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  category?: string; // Mantido para referência, mas não crucial para o display
  priority?: 'Baixa' | 'Média' | 'Alta'; // Mantido para referência inicial
  isAiProcessing: boolean;
  rankIndex: number; // Para ordenação manual
}

export interface User {
  id: string;
  name: string;
  isOnline: boolean;
  avatarColor: string;
}

export interface AnalysisResult {
  summary: string;
  topCategories: { name: string; count: number }[];
  actionItems: string[];
  rootCauses: string[];
}
