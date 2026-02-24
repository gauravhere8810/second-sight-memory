
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function summarizeTranscript(transcript: string): Promise<string> {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a specialized AR memory assistant. Summarize the following conversation into a brief, high-impact 'Memory Context' (max 3 sentences). Focus on the core topics and emotional tone.",
                },
                {
                    role: "user",
                    content: transcript,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        return response.choices[0]?.message?.content || "No summary generated.";
    } catch (error) {
        console.error("Groq Summary Error:", error);
        throw error;
    }
}
