import 'regenerator-runtime/runtime';

import "./style.css";

import * as Icon from './js/icon';
import * as API from './js/API/weather';
import * as GEO from './js/API/geolocation';
import * as DOM from './js/domUtilities';

Icon.loadStaticIcon();

weatherFromCurrentPosition();

let weatherData;

const form = document.querySelector("form");
const currentPositionBtn = document.querySelector(".current-position");
const dailyBtn = document.querySelector("#daily");
const hourlyBtn = document.querySelector("#hourly");
const toggleTemp = document.querySelector("#toggle");
const loaders = [...document.querySelectorAll(".loader-container")];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector("input");
  const city = input.value;
  input.value = "";

  weather({ city });
});

currentPositionBtn.addEventListener("click", weatherFromCurrentPosition);

[dailyBtn, hourlyBtn].forEach(btn => btn.addEventListener("click", changeForecast));

toggleTemp.addEventListener("input", DOM.changeUnits);

async function weather(geolocationInfo) {
  loaders.forEach(loader => loader.classList.remove("hidden"));
  loaders.forEach(loader => loader.classList.add("charge"));

  if(!hourlyBtn.classList.contains("active")) {
    [dailyBtn, hourlyBtn].forEach(btn => btn.classList.toggle("active"));
  }

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

  loaders.forEach(loader => loader.classList.remove("charge"));
  setTimeout(() => loaders.forEach(loader => loader.classList.add("hidden")), 1000);
}

async function weatherFromCurrentPosition() {
  try {
    const coord = await GEO.getCurrentPosition();
    await weather(coord);
  } catch(error) {
    const defaultCoord = { lat: 41.8943818, lon: 12.5005232};
    await weather(defaultCoord);
    console.log(error);
  }

  const firstPage = document.querySelector(".start-load-page");
  setTimeout(() => firstPage.classList.add("hidden"), 0);
}

function changeForecast(e) {
  const forecastContainer = document.querySelector(".forecast-container");
  if(!forecastContainer.hasChildNodes()) return;

  [dailyBtn, hourlyBtn].forEach(btn => btn.classList.toggle("active"));
  DOM.setForecast(weatherData[e.target.id]);
}