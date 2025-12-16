import { GoogleGenAI } from "@google/genai";

// Initialize the API client. 
// Note: In a real production app, ensure API keys are secured via backend proxies.
const getClient = () => {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
        console.warn("API Key is missing. AI features will not work.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const generateTitle = async (content: string): Promise<string> => {
    const ai = getClient();
    if (!ai) return "AI Unavailable (Check API Key)";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Read the following story snippet and generate a short, catchy, creative title for it. Do not use quotes.
            
            Story: ${content.substring(0, 500)}...`,
        });
        return response.text?.trim() || "Untitled Story";
    } catch (error) {
        console.error("AI Title Error:", error);
        return "Untitled Story";
    }
};

export const checkGrammar = async (content: string): Promise<string> => {
    const ai = getClient();
    if (!ai) return content;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a professional editor. Correct the grammar and spelling of the following text. Maintain the original tone and style. Return ONLY the corrected text.
            
            Text: ${content}`,
        });
        return response.text?.trim() || content;
    } catch (error) {
        console.error("AI Grammar Error:", error);
        return content;
    }
};

export const enhanceStory = async (content: string): Promise<string> => {
    const ai = getClient();
    if (!ai) return content;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a creative writing assistant. Enhance the following story segment to be more descriptive, engaging, and emotional. Keep the core plot the same. Return ONLY the enhanced text.
            
            Text: ${content}`,
        });
        return response.text?.trim() || content;
    } catch (error) {
        console.error("AI Enhance Error:", error);
        return content;
    }
};