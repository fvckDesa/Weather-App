import 'regenerator-runtime/runtime';

import { API_KEY, fetchData } from "./index";
import { fromUnixTime } from "date-fns";

async function getWeather(lat, lon) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${API_KEY}`;
  const weatherData = await fetchData(weatherURL);
  return formatWeatherData(weatherData);
}

function formatWeatherData({ daily, hourly }) {
  return { 
    daily: daily.map(forecast => extractData(forecast)),
    hourly: hourly.map(forecast => extractData(forecast))
  }
}

function extractData({
  dt,
  temp,
  feels_like,
  humidity,
  clouds,
  wind_speed,
  weather,
  rain,
  snow,
  pop,
}) {
  temp = parseInt(temp.day ?? temp);
  feels_like = parseInt(feels_like.day ?? feels_like);
  rain = rain?.["1h"] ?? rain ?? 0;
  snow = snow?.["1h"] ?? snow ?? 0;
  pop = parseInt(pop * 100);

  const { main: status, description, icon } = weather[0];
  const dateTime = fromUnixTime(dt);

  return {
    temp,
    feels_like,
    rain,
    snow,
    pop,
    status,
    description,
    icon,
    dateTime,
    humidity,
    clouds,
    wind_speed,
  };
}

export { getWeather };
