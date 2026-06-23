import express from "express";
import cors from "cors";
import getResponseFromAi from "./ai.js";

const app = express();
app.use(cors()); // lets the Vite app (different port) call this
app.use(express.json()); // so req.body is parsed JSON
app.post("/api/serverlessChat", async (req, res) => {
	const { query, messages } = req.body;
	try {
		const response = await getResponseFromAi(query, messages);
		res.json({ response });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.listen(3000, () => console.log("API on http://localhost:3000"));
