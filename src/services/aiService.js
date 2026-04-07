import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const getAIResponse = async (formData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an AI career mentor.
Generate a COMPLETE structured learning plan in JSON format.

User Details:
Name: ${formData.name}
Interest: ${formData.interest}
Level: ${formData.level}
Goal: ${formData.goal}

Return ONLY valid JSON (no explanation).

Format:
{
  "courses": [
    {
      "title": "",
      "platform": "",
      "duration": "",
      "description": ""
    }
  ],
  "roadmap": [
    {
      "step": 1,
      "title": "",
      "description": "",
      "tasks": ["", ""]
    }
  ],
  "weeklyPlan": [
    {
      "week": "Week 1",
      "focus": ""
    }
  ],
  "skills": [
    {
      "name": "",
      "status": "good | moderate | weak"
    }
  ],
  "careers": [
    {
      "role": "",
      "salary": "",
      "companies": ""
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // convert AI → JSON
    // Sometimes Gemini wraps JSON in markdown blocks like ```json ... ```
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse AI JSON:", e);
      // Fallback or re-throw
      throw new Error("AI returned invalid JSON structure");
    }

    return parsed;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const getChatResponse = async (userMessage) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an AI learning mentor and senior educator.

You ONLY answer questions related to:
* learning roadmaps
* programming skills
* course recommendations
* career guidance
* student progress

STRICT RULES:
* If the question is outside learning/career, politely refuse.
* Give structured, concise answers.
* Guide like a teacher, not a chatbot.

Student question:
${userMessage}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Chat Error:", error);
    throw new Error("Failed to get chat response.");
  }
};
