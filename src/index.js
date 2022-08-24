import 'regenerator-runtime/runtime';

import "./style.css";

import * as Icon from './js/icon';
import * as API from './js/API/weather';
import * as GEO from './js/API/geolocation';
import * as DOM from './js/domUtilities';

let weatherData, isLoading = false;

const form = document.querySelector("form");
const currentPositionBtn = document.querySelector(".current-position");
const changeTheme = document.querySelector(".change-theme");
const dailyBtn = document.querySelector("#daily");
const hourlyBtn = document.querySelector("#hourly");
const toggleTemp = document.querySelector("#toggle");
const loaders = [...document.querySelectorAll(".loader-container")];
const cloudLoader = document.querySelector("#cloud-loader");

Icon.loadStaticIcon();

weatherFromCurrentPosition();

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
  if(isLoading) return;

  isLoading = true;

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

  isLoading = false;
}

async function weatherFromCurrentPosition() {
  if(isLoading) return;

  try {
    const coord = await GEO.getCurrentPosition();
    await weather(coord);
  } catch(error) {
    const defaultCoord = { lat: 41.8943818, lon: 12.5005232};
    await weather(defaultCoord);
    console.log(error);
  }
}

function changeForecast(id) {
  dailyBtn.classList.toggle("active", !(id === "hourly"));
  hourlyBtn.classList.toggle("active", id === "hourly");

  dailyBtn.parentElement.classList.toggle("right", hourlyBtn.classList.contains("active"));

  DOM.setForecast(weatherData[id]);
}

function changeColorScheme(forceDarkTheme) {
  const isDarkTheme = forceDarkTheme ?? document.body.classList.contains("light-theme");

  document.body.classList.toggle("light-theme", !isDarkTheme);
  document.body.classList.toggle("dark-theme", isDarkTheme);

  changeTheme.classList.toggle("active", isDarkTheme);

  cloudLoader.setAttribute("colors", `primary:${isDarkTheme ? "#fff" : "#000"}`);
}