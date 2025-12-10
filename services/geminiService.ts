import { GoogleGenAI } from "@google/genai";
import { Deal } from "../types";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const analyzeDeal = async (deal: Deal, recentActivities: string[]): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Por favor configure a API Key para usar a IA.";

  try {
    const prompt = `
      Atue como um gestor comercial sénior. Analise o seguinte negócio (Lead) e sugira o próximo passo ideal e um rascunho curto de email para reativar ou avançar o negócio.
      
      Dados do Negócio:
      Título: ${deal.title}
      Nome do Contacto: ${deal.leadName}
      Empresa: ${deal.companyName}
      Estágio Atual: ${deal.stage}
      Valor: €${deal.value}
      Origem: ${deal.source}
      Notas: ${deal.notes || "Sem notas"}
      
      Atividades Recentes:
      ${recentActivities.length > 0 ? recentActivities.join("\n") : "Nenhuma atividade recente registada."}
      
      Formato da resposta:
      **Análise**: [Sua análise breve]
      **Próximo Passo**: [Ação recomendada]
      **Sugestão de Email**: [Assunto e Corpo do email]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Não foi possível gerar uma análise no momento.";
  } catch (error) {
    console.error("Erro ao chamar Gemini API:", error);
    return "Erro ao processar a solicitação de IA.";
  }
};

export const generateEmailDraft = async (deal: Deal, topic: string): Promise<{subject: string, body: string}> => {
  const ai = getAiClient();
  if (!ai) return { subject: "Erro", body: "API Key não configurada." };

  try {
    const prompt = `
      Escreva um email profissional e curto para um lead.
      
      Dados do Lead:
      Negócio: ${deal.title}
      Nome: ${deal.leadName}
      Empresa: ${deal.companyName}
      Contexto/Tópico do email: ${topic}
      
      Retorne APENAS um JSON válido no seguinte formato, sem formatação markdown:
      {
        "subject": "Assunto do email",
        "body": "Corpo do email (texto simples)"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || "{}";
    // Clean up potential markdown code blocks if the model adds them
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
        return JSON.parse(cleanJson);
    } catch (e) {
        return { subject: "Assunto do Email", body: text };
    }

  } catch (error) {
    console.error("Erro ao gerar email:", error);
    return { subject: "", body: "Erro ao gerar rascunho." };
  }
};