import { isToday, isSameHour, format } from "date-fns"; 
import { getFeelsIcon, getWeatherIcon } from "./icon";
import { formatSpeedValue, metersSecondToMillesHour, millesHourToMetersSecond } from "./units/speed";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  formatTemp,
  isCelsius,
} from "./units/temperature";

let pageCount = 0;
let pages = [];

const forecasts = [...document.querySelectorAll(".forecast-item")];
const dotContainer = qs(".dots");
const arrowLeft = qs("#arrow-left");
const arrowRight = qs("#arrow-right");

arrowLeft.addEventListener("click", () => setForecastPage(pages[pageCount - 1]));
arrowRight.addEventListener("click", () => setForecastPage(pages[pageCount + 1]));

function setForecast(forecastArr) {
  pageCount = 0;
  pages = forecastArr.reduce((pages, forecast, i) => {
    if(i % 8 === 0) pages.push([]);
    pages[pages.length - 1].push(forecast);
    return pages;
  }, []);
  // eslint-disable-next-line no-unused-vars
  dotContainer.replaceChildren(...pages.map((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    
    dot.addEventListener("click", () => setForecastPage(pages[i]));
    return dot;
  }));

  setForecastPage(pages[pageCount]);
}

function setForecastPage(forecastArr) {
  const isDaily = forecastArr.every(forecast => format(forecast.dateTime, "h aaa") === format(forecastArr[0].dateTime, "h aaa"));
  forecastArr.forEach((forecast, i) => {
    const forecastEl = forecasts[i];
    const { dateTime, icon, temp } = forecast;
    let textTitle;

    if (isDaily) {
      textTitle = isToday(dateTime) ? "Today" : format(dateTime, "eee");
    } else {
      textTitle = isSameHour(dateTime, new Date()) ? "Now" : format(dateTime, "h aaa");
    }

    qs("#title", forecastEl).innerText = textTitle;
    qs("#icon", forecastEl).src = getWeatherIcon(icon);
    qs("#temp", forecastEl).innerText = formatTemp(temp);

    forecastEl.addEventListener("click", () => {
      setWeather(forecast);
    });

    pageCount = pages.indexOf(forecastArr);

    arrowLeft.disabled = pageCount === 0;
    arrowRight.disabled = pageCount === pages.length - 1;

    qs(".active", dotContainer)?.classList.remove("active");
    dotContainer.children[pageCount].classList.add("active");
  });
}

function setCityInfo({ name: city, lat, lon, country }) {
  qs("#city").innerText = city;
  qs("#country").innerText = country;
  qs("#latitude .value").innerText = lat.toFixed(4);
  qs("#longitude .value").innerText = lon.toFixed(4);
}

function setWeather({
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
}) {
  const feelsIcon = getFeelsIcon(feels_like);

  qs("#week-day").innerText = format(dateTime, "eeee");
  qs("#date").innerText = format(dateTime, "PPP");
  qs("#time").innerText = format(dateTime, "h aaa");

  qs("#weather-status").innerText = status;
  qs("#description").innerText = description;
  qs(".weather-icon").src = getWeatherIcon(icon);
  qs(".temp > .value").innerText = formatTemp(temp);
  qs("#feels-like .value").innerText = formatTemp(feels_like);
  qs("#feels-like img").src = feelsIcon;

  qs("#humidity .value").innerText = humidity;
  qs("#clouds .value").innerText = clouds;
  qs("#probablyPrecipitation .value").innerText = pop;
  qs("#rain .value").innerText = rain;
  qs("#snow .value").innerText = snow;
  qs("#wind .value").innerText = formatSpeedValue(wind_speed);
}

function changeUnits() {
  const tempEls = [...document.querySelectorAll("#temp")];
  for (const el of tempEls) {
    let temp;
    if(isCelsius()) {
      temp = `${fahrenheitToCelsius(el.textContent)} °C`;
    } else {
      temp = `${celsiusToFahrenheit(el.textContent)} °F`
    }
    el.innerText = temp;
  }

  const windSpeedValue = document.querySelector("#wind .value");
  const windSpeedUnit = document.querySelector("#wind .unit");

  let speedValue, speedUnit;
  if(isCelsius()) {
    speedValue = millesHourToMetersSecond(windSpeedValue.textContent);
    speedUnit = "m/s";
  } else{
    speedValue = metersSecondToMillesHour(windSpeedValue.textContent);
    speedUnit = "mph";
  }
  
  windSpeedValue.innerText = speedValue;
  windSpeedUnit.innerText = speedUnit;
}

function qs(child, parent = document) {
  return parent.querySelector(child);
}

export { setForecast, setCityInfo, setWeather, changeUnits };
