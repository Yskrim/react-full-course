import process from "process";

const SYSTEM_PROMPT = `You are a personal assistant that receives chat messages and responds live. Broad topics should be written in markdown. Your job is to give short responses unless specified otherwise. You may ask clarifying questions. Answer concisely.`;

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function getResponseFromAi(query, history = []) {
	const historyMessages = history
		.filter((m) => m.message && !m.isLoading)
		.map((m) => ({
			role: m.sender === "user" ? "user" : "assistant",
			content: m.message,
		}));

	const response = await groq.chat.completions.create({
		model: "llama-3.3-70b-versatile",
		messages: [
			{ role: "system", content: SYSTEM_PROMPT },
			...historyMessages,
			{ role: "user", content: query },
		],
	});

	return response.choices[0].message.content;
}

// import { GoogleGenAI } from "@google/genai";
// const ai = new GoogleGenAI({
// 	apiKey: process.env.GEMINI_API_KEY,
// });

// export default async function getResponseFromAi(msg) {
// 	const response = await ai.models.generateContent({
// 		model: "gemma-4-26B-A4B",
// 		system: SYSTEM_PROMPT,
// 		contents: msg,
// 	});

// 	response.text;
// }

// async function main() {
// 	const response = await ai.models.generateContentStream({
// 	  model: "gemini-3.5-flash",
// 	  contents: "Explain how AI works",
// 	});

// 	for await (const chunk of response) {
// 	  console.log(chunk.text);
// 	}
//   }

//   await main();

// export default async function getResponseFromAi(data) {
// 	const response = await fetch(
// 		"https://router.huggingface.co/v1/chat/completions",
// 		{
// 			headers: {
// 				Authorization: `Bearer ${process.env.HF_TOKEN}`,
// 				"Content-Type": "application/json",
// 			},
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const text = await response.json();
// 	return text;
// }

