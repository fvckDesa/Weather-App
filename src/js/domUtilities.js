import { getFeelsIcon, getWeatherIcon } from "./icon";
import { formatSpeedValue, metersSecondToMillesHour, millesHourToMetersSecond } from "./units/speed";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  formatTemp,
  isCelsius,
} from "./units/temperature";

const DAY_FROM_API = 8;

function setForecast(forecastArr) {
  const forecastContainer = qs(".forecast-container");
  forecastContainer.replaceChildren([]);

  for (const forecast of forecastArr) {
    const forecastEl = qs("[forecast]")
      .content.cloneNode(true)
      .querySelector(".forecast-item");

    const { date, time, icon, temp } = forecast;

    let textTitle;
    if (forecastArr.length > DAY_FROM_API) {
      textTitle = forecast === forecastArr[0] ? "Now" : time;
    } else {
      textTitle = forecast === forecastArr[0] ? "Today" : date.forecast;
    }

    qs("#title", forecastEl).innerText = textTitle;
    qs("#icon", forecastEl).src = getWeatherIcon(icon);
    qs("#temp", forecastEl).innerText = formatTemp(temp);

    forecastEl.addEventListener("click", () => {
      setWeather(forecast);
    });

    forecastContainer.append(forecastEl);
  }
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
  date,
  time,
  humidity,
  clouds,
  wind_speed,
}) {
  const feelsIcon = getFeelsIcon(feels_like);

  qs("#date").innerText = date.cityInfo;
  qs("#time").innerText = time;

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
