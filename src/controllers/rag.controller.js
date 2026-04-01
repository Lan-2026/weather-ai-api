const ragService = require("../rag/rag.service");
const aiService = require("../services/aiService");

async function queryRag(req, res) {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 1. retrieve
    const docs = ragService.retrieveRelevantDocs(question);

    // 2. build prompt
    const prompt = ragService.buildPrompt(question, docs);

    // 3. call LLM (reuse your existing service)
    const answer = await aiService.chatWithAi(prompt);

    return res.json({
      answer,
      sources: docs.map((doc) => ({
        content: doc.content,
        score: doc.score,
      })),
    });
  } catch (err) {
    console.error("RAG error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  queryRag,
};
