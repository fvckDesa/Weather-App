import { getFeelsIcon, getWeatherIcon } from "./icon";

function setForecast(forecastArr) {
  const forecastContainer = qs(".forecast-container");
  forecastContainer.replaceChildren([]);

  for (const forecast of forecastArr) {
    const forecastEl = qs("[forecast]")
      .content.cloneNode(true)
      .querySelector(".forecast-item");

    const { dateTime, icon, temp } = forecast;

    qs("#title", forecastEl).innerText = forecast === forecastArr[0] ? "Today" : getForecastDay(dateTime);
    qs("#icon", forecastEl).src = getWeatherIcon(icon);
    qs("#temp", forecastEl).innerText = `${temp} °C`;

    forecastEl.addEventListener("click", () => {
        setWeather(forecast);
    });

    forecastContainer.append(forecastEl);
  }
}

function getForecastDay(date) {
    const numDay = date.getDay();
    switch(numDay) {
        case 0: return "Sun";
        case 1: return "Mon";
        case 2: return "Tue";
        case 3: return "Wed";
        case 4: return "Thu";
        case 5: return "Fri";
        case 6: return "Sat";
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
  dateTime,
  humidity,
  clouds,
  wind_speed,
}) {
  const feelsIcon = getFeelsIcon(feels_like);

  qs("#date").innerText = dateTime.toDateString();
  qs("#time").innerText = dateTime.toTimeString().slice(0, 8);

  qs("#weather-status").innerText = status;
  qs("#description").innerText = description;
  qs(".weather-icon").src = getWeatherIcon(icon);
  qs(".temp > .value").innerText = `${temp} °C`;
  qs("#feels-like .value").innerText = feels_like;
  qs("#feels-like img").src = feelsIcon;

  qs("#humidity .value").innerText = humidity;
  qs("#clouds .value").innerText = clouds;
  qs("#probablyPrecipitation .value").innerText = pop;
  qs("#rain .value").innerText = rain;
  qs("#snow .value").innerText = snow;
  qs("#wind .value").innerText = wind_speed;
}

function qs(child, parent = document) {
  return parent.querySelector(child);
}

export { setForecast, setCityInfo, setWeather };
