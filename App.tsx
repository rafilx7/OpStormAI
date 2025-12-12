import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import ProblemFeed from './components/ProblemFeed';
import PriorityRanking from './components/PriorityRanking';
import LoginScreen from './components/LoginScreen';
import UserList from './components/UserList';
import { Problem, User } from './types';
import { categorizeProblem } from './services/geminiService';
import { db } from './services/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  updateDoc, 
  doc, 
  writeBatch 
} from 'firebase/firestore';

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef'];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]); // Em produção real, isso viria de uma collection 'users'
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // 1. Efeito para carregar dados do Firestore em Tempo Real
  useEffect(() => {
    // Escutar a coleção 'problems' ordenada
    const q = query(collection(db, "problems"), orderBy("rankIndex", "asc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedProblems: Problem[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Problem));
      setProblems(loadedProblems);
    });

    return () => unsubscribe();
  }, []);

  // Simulação de usuários online (apenas visual para este exemplo)
  useEffect(() => {
    if (currentUser) {
      const initialUsers = [currentUser];
      for (let i = 1; i <= 9; i++) {
        initialUsers.push({
          id: `bot-${i}`,
          name: `Membro ${i}`,
          isOnline: true,
          avatarColor: COLORS[i % COLORS.length]
        });
      }
      setUsers(initialUsers);
    }
  }, [currentUser]);

  const handleJoin = (name: string) => {
    setCurrentUser({
      id: 'me', // Em app real, usar Auth ID
      name,
      isOnline: true,
      avatarColor: COLORS[0]
    });
  };

  // 2. Adicionar Problema ao Firestore
  const addProblem = useCallback(async (text: string, author: string) => {
    try {
      // Determinar o próximo rankIndex (final da lista)
      const currentMaxRank = problems.length > 0 
        ? Math.max(...problems.map(p => p.rankIndex || 0)) 
        : 0;

      // Adicionar doc com flag de processamento
      const docRef = await addDoc(collection(db, "problems"), {
        text,
        author,
        timestamp: Date.now(),
        isAiProcessing: true,
        rankIndex: currentMaxRank + 1
      });

      // Chamar IA para categorizar
      categorizeProblem(text).then(async (classification) => {
        await updateDoc(doc(db, "problems", docRef.id), {
          ...classification,
          isAiProcessing: false
        });
      }).catch(async (e) => {
        console.error(e);
        await updateDoc(doc(db, "problems", docRef.id), {
          isAiProcessing: false,
          category: 'Geral',
          priority: 'Média'
        });
      });

    } catch (e) {
      console.error("Erro ao adicionar:", e);
      alert("Erro ao enviar. Verifique conexão.");
    }
  }, [problems]);

  // 3. Reordenar (Drag & Drop) com persistência no Firestore
  const handleReorder = async (reorderedProblems: Problem[]) => {
    // Atualização Otimista (feedback visual imediato)
    setProblems(reorderedProblems);

    try {
      const batch = writeBatch(db);
      
      reorderedProblems.forEach((prob) => {
        const ref = doc(db, "problems", prob.id);
        batch.update(ref, { rankIndex: prob.rankIndex });
      });

      await batch.commit();
    } catch (e) {
      console.error("Erro ao reordenar:", e);
      // Reverteria em caso de erro real, mas o snapshot vai corrigir
    }
  };

  // Loop de simulação (opcional, apenas adiciona ao Firestore)
  useEffect(() => {
    let interval: any;
    if (isSimulating && currentUser) {
      interval = setInterval(() => {
        const mockProblems = [
            "Sistema lento na expedição.", "Falta de toner na impressora B.", 
            "Cliente X reclamando da entrega.", "Ar condicionado pingando no servidor."
        ];
        const randomText = mockProblems[Math.floor(Math.random() * mockProblems.length)];
        addProblem(randomText, "Simulação");
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, currentUser, addProblem]);

  if (!currentUser) {
    return <LoginScreen onJoin={handleJoin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 flex flex-col">
      <Header count={problems.length} onlineCount={users.length} />

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden max-w-[1600px] mx-auto w-full">
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col h-[calc(100vh-73px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            
            {/* Left Column: Input and Feed */}
            <div className="flex flex-col h-full min-h-0">
              <InputArea 
                onAdd={(text) => addProblem(text, currentUser.name)} 
                isSimulating={isSimulating}
                toggleSimulation={() => setIsSimulating(!isSimulating)}
              />
              <div className="flex-1 bg-slate-900/50 rounded-2xl border border-slate-800 p-4 shadow-xl overflow-hidden mt-4">
                <ProblemFeed problems={problems} />
              </div>
            </div>

            {/* Right Column: Priority Ranking (Manual) */}
            <div className="h-full min-h-0">
               <PriorityRanking problems={problems} onReorder={handleReorder} />
            </div>

          </div>
        </main>

        {/* Sidebar: Online Users */}
        <UserList users={users} currentUser={currentUser} />
        
      </div>
    </div>
  );
};

export default App;