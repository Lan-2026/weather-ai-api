const OpenAI = require("openai");
const config = require("../config");

const client = new OpenAI({
  apiKey: config.ai.groqApiKey,
  baseURL: config.ai.baseURL,
});

const chatWithAi = async (message) => {
  const response = await client.chat.completions.create({
    model: config.ai.model,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return response.choices[0].message.content;
};

const explainWeather = async (city, weather) => {
  const prompt = `
The user wants to know about the weather in ${city}.

Weather data:
- city: ${weather.city}
- country: ${weather.country}
- temperature: ${weather.temperature}°C
- wind speed: ${weather.windSpeed} km/h

Please explain this weather in a short, friendly, natural way.
`;

  const response = await client.chat.completions.create({
    model: config.ai.model,
    messages: [
      {
        role: "system",
        content: "You are a helpful weather assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = {
  chatWithAi,
  explainWeather,
};
