const docs = [
  "Melbourne weather is unpredictable with sudden rain.",
  "Best time to visit Melbourne is March to May.",
  "Outdoor activities are popular in Melbourne parks and coastal areas.",
  "Sydney has many famous landmarks and harbour views.",
  "Pack layers when travelling in Melbourne because temperatures can change quickly.",
];

const STOP_WORDS = new Set([
  "the",
  "is",
  "a",
  "an",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "it",
  "this",
  "that",
  "are",
  "be",
  "as",
  "at",
  "by",
  "from",
  "what",
  "when",
  "where",
  "how",
  "should",
  "i",
  "me",
  "my",
  "you",
  "your",
]);

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalizeText(text)
    .split(" ")
    .filter(Boolean)
    .filter((word) => !STOP_WORDS.has(word));
}

function calculateKeywordScore(questionTokens, docTokens) {
  let score = 0;

  for (const token of questionTokens) {
    if (docTokens.includes(token)) {
      score += 1;
    }
  }

  return score;
}

function retrieveRelevantDocs(question, options = {}) {
  const { topK = 3, minScore = 1 } = options;

  const questionTokens = tokenize(question);

  const scoredDocs = docs.map((doc) => {
    const docTokens = tokenize(doc);
    const score = calculateKeywordScore(questionTokens, docTokens);

    return {
      content: doc,
      score,
    };
  });

  return scoredDocs
    .filter((doc) => doc.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

function buildPrompt(question, retrievedDocs) {
  const context = retrievedDocs
    .map((doc, index) => `[Source ${index + 1}] ${doc.content}`)
    .join("\n");

  return `
You are a helpful assistant. Answer ONLY based on the provided context.

Context:
${context}

Question:
${question}

If the answer is not in the context, say "I don't know based on the provided information."
`;
}

module.exports = {
  normalizeText,
  tokenize,
  calculateKeywordScore,
  retrieveRelevantDocs,
  buildPrompt,
};
