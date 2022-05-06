import "./style.css";

import * as Icon from './js/icon';
import * as API from './js/API/weather';
import * as GEO from './js/API/geolocation';
import * as DOM from './js/domUtilities';

Icon.loadStaticIcon();

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.querySelector("input");
  const city = input.value;
  input.value = "";

  try {
    const cityInfo = await GEO.getCityInfo({ city });
    DOM.setCityInfo(cityInfo);

    const { lat, lon } = cityInfo;
    const weather = await API.getWeather(lat, lon);
    DOM.setWeather(weather.hourly[0]);

    DOM.setForecast(weather.daily);
  } catch (error) {
    console.log("Error: ", error);
  }
});