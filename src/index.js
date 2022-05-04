import "./style.css";

import * as Icon from './js/icon';
import * as API from './js/API/weather';
import * as GEO from './js/API/geolocation';
import * as DOM from './js/domUtilities';

Icon.loadStaticIcon();

const searchBtn = document.querySelector(".search");
const form = document.querySelector("form");
const forecastContainer = document.querySelector(".forecast-container");

const forecast = DOM.createForecast();
forecastContainer.append(...forecast);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.querySelector("input");
  const city = input.value;
  input.value = "";

  try {
    const cityInfo = await GEO.getCityPosition(city);
    delete cityInfo.local_names;
    DOM.setCityInfo(cityInfo);

    const { lat, lon } = cityInfo;
    const weather = await API.getWeather(lat, lon);
    DOM.setWeather(weather.current);
  } catch (error) {
    console.log("Error: ", error);
  }
});