import getResponseFromAi from "../ai.js";

export default async function requestHandler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { query, messages } = req.body;
	try {
		const response = await getResponseFromAi(query, messages);
		res.status(200).json({ response });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}