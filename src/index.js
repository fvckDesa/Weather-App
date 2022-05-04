import "./style.css";

import * as Icon from './js/icon';
import * as API from './js/weather';
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
    const data = await API.getWeather(city);
    console.log(data);
  } catch (error) {
    console.log("Error: ", error);
  }
});