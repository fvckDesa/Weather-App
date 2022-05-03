import "./style.css";

import SearchIcon from './assets/SVG/search-icon.svg';
import humidity from './assets/SVG/humidity.svg';

document.querySelector(".weather-detail-container > .info-item > img").src = humidity;

import * as API from './js';

const searchBtn = document.querySelector(".search");

const searchIcon = new Image();
searchIcon.src = SearchIcon;

searchBtn.append(searchIcon);

const form = document.querySelector("form");

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