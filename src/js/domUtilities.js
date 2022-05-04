import { getFeelsIcon, getWeatherIcon } from "./icon";

function createForecast() {
    const listEl = [];
    for(let i = 0; i < 15; i++) {
        const el = document.querySelector("[forecast]").content.cloneNode(true);
        listEl.push(el);
    }
    return listEl;
}

function setCityInfo({ name: city, lat, lon, country }) {
    qs("#city").innerText = city;
    qs("#country").innerText = country;
    qs("#latitude .value").innerText = lat.toFixed(4);
    qs("#longitude .value").innerText = lon.toFixed(4);
}

function setWeather({ dt, temp, feels_like, humidity, clouds, wind_speed, weather }) {
    const { main: status, description, icon } = weather[0];
    const dateTime = new Date(+dt);
    const feelsIcon = getFeelsIcon(feels_like);

    qs("#date").innerText = dateTime.toDateString();
    qs("#time").innerText = dateTime.toTimeString().slice(0, 8);

    qs("#weather-status").innerText = status;
    qs("#description").innerText = description;
    qs(".weather-icon").src = getWeatherIcon(icon);
    qs(".temp > .value").innerText = `${parseInt(temp)} °C`;
    qs("#feels-like .value").innerText = feels_like;
    qs("#feels-like img").src = feelsIcon;

    qs("#humidity .value").innerText = humidity;
    qs("#clouds .value").innerText = clouds;
    qs("#wind .value").innerText = wind_speed;
}

function qs(child, parent = document) {
    return parent.querySelector(child);
}

export {
    createForecast,
    setCityInfo,
    setWeather
}