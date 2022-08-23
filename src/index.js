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
const changeTheme = document.querySelector(".change-theme");
const dailyBtn = document.querySelector("#daily");
const hourlyBtn = document.querySelector("#hourly");
const toggleTemp = document.querySelector("#toggle");
const loaders = [...document.querySelectorAll(".loader-container")];

// color scheme
if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
  changeColorScheme(true);
}

window.matchMedia('(prefers-color-scheme: light)').addEventListener("change", (e) => {
  changeColorScheme(e.matches === "dark");
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", (e) => {
  changeColorScheme(e.matches === "dark");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector("input");
  const city = input.value;
  input.value = "";

  weather({ city });
});

currentPositionBtn.addEventListener("click", weatherFromCurrentPosition);

changeTheme.addEventListener("click", () => changeColorScheme());

[dailyBtn, hourlyBtn].forEach(btn => btn.addEventListener("click", (e) => changeForecast(e.target.id)));

toggleTemp.addEventListener("input", DOM.changeUnits);

async function weather(geolocationInfo) {
  loaders.forEach(loader => loader.classList.remove("hidden"));
  loaders.forEach(loader => loader.classList.add("charge"));

  try {
    const cityInfo = await GEO.getCityInfo(geolocationInfo);
    DOM.setCityInfo(cityInfo);

    const { lat, lon } = cityInfo;
    const weatherInfo = await API.getWeather(lat, lon);
    DOM.setWeather(weatherInfo.hourly[0]);

    weatherData = weatherInfo;

    changeForecast("hourly");
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

function changeForecast(id) {
  dailyBtn.classList.toggle("active", !(id === "hourly"));
  hourlyBtn.classList.toggle("active", id === "hourly");

  dailyBtn.parentElement.classList.toggle("right", hourlyBtn.classList.contains("active"));

  DOM.setForecast(weatherData[id]);
}

function changeColorScheme(forceDarkTheme) {
  const isLightTheme = forceDarkTheme ?? document.body.classList.contains("light-theme");

  document.body.classList.toggle("light-theme", !isLightTheme);
  document.body.classList.toggle("dark-theme", isLightTheme);

  changeTheme.classList.toggle("active", isLightTheme);
}