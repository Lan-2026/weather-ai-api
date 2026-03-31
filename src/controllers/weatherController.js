const { getWeatherByCity } = require("../services/weatherService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const getWeather = asyncHandler(async (req, res) => {
  const { city } = req.query;
  console.log("[weatherController] GET /weather called with city:", city);

  if (typeof city !== "string" || city.trim() === "") {
    console.warn("[weatherController] Invalid city query parameter");
    throw new AppError("City is required", 400);
  }
  const trimmedCity = city.trim();
  const weather = await getWeatherByCity(trimmedCity);
  res.json(weather);
});

module.exports = {
  getWeather,
};
