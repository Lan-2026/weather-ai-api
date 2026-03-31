const { chatWithAi, explainWeather } = require("../services/aiService");
const { getWeatherByCity } = require("../services/weatherService");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const chat = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (typeof message !== "string" || message.trim() === "") {
    throw new AppError("Message is required", 400);
  }

  const reply = await chatWithAi(message.trim());

  res.json({
    reply,
  });
});

const weatherChat = asyncHandler(async (req, res) => {
  const { city } = req.body;

  if (typeof city !== "string" || city.trim() === "") {
    throw new AppError("City is required", 400);
  }

  const trimmedCity = city.trim();

  const weather = await getWeatherByCity(trimmedCity);
  const reply = await explainWeather(trimmedCity, weather);

  res.json({
    weather,
    reply,
  });
});

module.exports = {
  chat,
  weatherChat,
};
