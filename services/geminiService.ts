import { GoogleGenAI, Type } from "@google/genai";

// Fixed: Use process.env.API_KEY directly as per @google/genai guidelines.
// This also resolves the TypeScript error regarding import.meta.env.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CATEGORIZER_INSTRUCTION = `
Você é um assistente especialista em operações empresariais. 
Seu trabalho é analisar um problema relatado por um funcionário e classificá-lo.
Responda APENAS com um objeto JSON.
Categorias possíveis: Logística, TI, RH, Vendas, Financeiro, Processos, Segurança, Manutenção, Outros.
Prioridade baseada na urgência implícita no texto: Baixa, Média, Alta.
`;

export const categorizeProblem = async (text: string): Promise<{ category: string, priority: 'Baixa' | 'Média' | 'Alta' }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Problema relatado: "${text}"`,
      config: {
        systemInstruction: CATEGORIZER_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ["Baixa", "Média", "Alta"] }
          },
          required: ["category", "priority"]
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    return {
      category: json.category || "Outros",
      priority: json.priority || "Média"
    };
  } catch (error) {
    console.error("Erro ao categorizar:", error);
    return { category: "Desconhecido", priority: "Média" };
  }
};