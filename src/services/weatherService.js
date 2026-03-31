const axios = require("axios");
// const { redisClient } = require("../config/redisClient");
const config = require("../config");
const logger = require("../utils/logger");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const refreshing = {};
// const CACHE_TTL_S = config.cache.ttlMs / 1000;
// const CACHE_STALE_TTL_S = (config.cache.ttlMs / 1000) * 2;

// const setCache = async (city, weather) => {
//   const value = JSON.stringify({
//     data: weather,
//     staleAt: Date.now() + CACHE_TTL_S * 1000,
//   });
//   await redisClient.set(`weather:${city}`, value, { EX: CACHE_STALE_TTL_S });
//   logger.log("Starting weather lookup", city);
// };

const fetchWithRetry = async (url, options, retries = 2, delay = 1000) => {
  let lastError;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      console.log(`[weatherService] Attempt ${attempt} calling: ${url}`);
      const response = await axios.get(url, {
        ...options,
        timeout: 3000,
      });
      console.log(`[weatherService] Attempt ${attempt} succeeded: ${url}`);
      return response;
    } catch (error) {
      lastError = error;
      logger.error("Weather service error", { error: error.message });

      const isLastAttempt = attempt === retries + 1;

      if (isLastAttempt) {
        logger.error(`[weatherService] All attempts failed for: ${url}`);
        throw lastError;
      }
      console.log(`[weatherService] Waiting ${delay}ms before retrying...`);
      await sleep(delay);
    }
  }
};

const getWeatherByCity = async (city) => {
  // Redis caching commented out — fetches directly every time
  // const raw = await redisClient.get(`weather:${city}`);
  // if (raw) {
  //   const { data, staleAt } = JSON.parse(raw);
  //   const isStale = Date.now() > staleAt;
  //   if (!isStale) {
  //     console.log("[cache] fresh cache hit:", city);
  //     return data;
  //   }
  //   if (!refreshing[city]) {
  //     refreshing[city] = true;
  //     refreshWeather(city).finally(() => { delete refreshing[city]; });
  //   } else {
  //     console.log("[cache] refresh already in progress:", city);
  //   }
  //   return data;
  // }

  const weather = await fetchWeather(city);

  // await setCache(city, weather);

  return weather;
};

const fetchWeather = async (city) => {
  console.log("[weatherService] Starting weather lookup for city:", city);
  const geoResponse = await fetchWithRetry(
    "https://geocoding-api.open-meteo.com/v1/search",
    {
      params: {
        name: city,
        count: 1,
      },
    },
  );

  const location = geoResponse.data.results?.[0];

  if (!location) {
    console.warn(
      "[weatherService] City not found in geocoding response:",
      city,
    );
    throw new Error("City not found");
  }

  const { latitude, longitude, name, country } = location;

  console.log(
    `[weatherService] Geocoding success: ${name}, ${country} (${latitude}, ${longitude})`,
  );

  const weatherResponse = await fetchWithRetry(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude,
        longitude,
        current: "temperature_2m,wind_speed_10m",
      },
    },
  );

  const current = weatherResponse.data.current;
  console.log(
    `[weatherService] Weather success for ${name}: temperature=${current.temperature_2m}, windSpeed=${current.wind_speed_10m}`,
  );

  return {
    city: name,
    country,
    temperature: current.temperature_2m,
    windSpeed: current.wind_speed_10m,
  };
};

// const refreshWeather = async (city) => {
//   try {
//     console.log("[cache] refreshing in background:", city);
//     const weather = await fetchWeather(city);
//     await setCache(city, weather);
//     console.log("[cache] refresh complete:", city);
//   } catch (error) {
//     console.error("[cache] refresh failed:", city, error.message);
//   }
// };

module.exports = {
  getWeatherByCity,
};
