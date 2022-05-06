import "./style.css";

import * as Icon from './js/icon';
import * as API from './js/API/weather';
import * as GEO from './js/API/geolocation';
import * as DOM from './js/domUtilities';

Icon.loadStaticIcon();

let weatherData;

const form = document.querySelector("form");
const currentPositionBtn = document.querySelector(".current-position");
const dailyBtn = document.querySelector("#daily");
const hourlyBtn = document.querySelector("#hourly");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector("input");
  const city = input.value;
  input.value = "";

  weather({ city });
});

currentPositionBtn.addEventListener("click", async () => {
  try {
    const coord = await GEO.getCurrentPosition();
    weather(coord);
  } catch(error) {
    console.log("Error: ", error);
  }
});

[dailyBtn, hourlyBtn].forEach(btn => btn.addEventListener("click", changeForecast));

async function weather(geolocationInfo) {
  try {
    const cityInfo = await GEO.getCityInfo(geolocationInfo);
    DOM.setCityInfo(cityInfo);

    const { lat, lon } = cityInfo;
    const weatherInfo = await API.getWeather(lat, lon);
    DOM.setWeather(weatherInfo.hourly[0]);

    DOM.setForecast(weatherInfo.hourly);

    weatherData = weatherInfo;
  } catch (error) {
    console.log("Error: ", error);
  }
}

function changeForecast(e) {
  const forecastContainer = document.querySelector(".forecast-container");
  if(!forecastContainer.hasChildNodes()) return;

  [dailyBtn, hourlyBtn].forEach(btn => btn.classList.toggle("active"));

  DOM.setForecast(weatherData[e.target.id]);
}