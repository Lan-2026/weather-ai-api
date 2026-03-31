const config = {
  port: Number(process.env.PORT) || 3000,
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",

  cache: {
    ttlMs: Number(process.env.CACHE_TTL_MS) || 300000,
    maxSize: Number(process.env.MAX_CACHE_SIZE) || 3,
  },

  rateLimit: {
    windowSeconds: Number(process.env.RATE_LIMIT_WINDOW_SECONDS) || 60,
    maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
  },
  ai: {
    groqApiKey: process.env.GROQ_API_KEY || "",
    model: process.env.AI_MODEL || "llama-3.3-70b-versatile",
    baseURL: process.env.AI_BASE_URL || "https://api.groq.com/openai/v1",
  },
};

module.exports = config;
