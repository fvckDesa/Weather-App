import { API_KEY, fetchData } from "./index";

async function getWeather(lat, lon) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric`;
  return fetchData(weatherURL);
}

export { getWeather };
