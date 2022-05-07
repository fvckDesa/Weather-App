import * as Icons from '../assets';

function loadStaticIcon() {
    qsImage("#humidity").src = Icons.humidity;
    qsImage("#clouds").src = Icons.cloud;
    qsImage(".search").src = Icons.searchIcon;
    qsImage("#probablyPrecipitation").src = Icons.probablyPrecipitation;
    qsImage("#rain").src = Icons.rain;
    qsImage("#snow").src = Icons.snowFlake;
    qsImage("#wind").src = Icons.wind;
    qsImage(".delete").src = Icons.deleteIcon;
}

function getFeelsIcon(feelsLike) {
    const AMBIENT_TEMP_IN_K = 293.15;
    return feelsLike >= AMBIENT_TEMP_IN_K ? Icons.hotTemp : Icons.coldTemp;
}

function getWeatherIcon(iconID) {
    switch (iconID) {
        case "01d": return Icons.sun;
        case "01n": return Icons.moon;
        case "02d": return Icons.cloudSun;
        case "02n": return Icons.cloudMoon;
        case "03d":
        case "03n": return Icons.cloud;
        case "04d":
        case "04n": return Icons.twoClouds;
        case "09d":
        case "09n": return Icons.heavyRain;
        case "10d": return Icons.rainSun;
        case "10n": return Icons.rainMoon;
        case "11d":
        case "11n": return Icons.storm;
        case "13d":
        case "13n": return Icons.snow;
        case "50d":
        case "50n": return Icons.fog;
    }
}

function qsImage(child, parent = document) {
    return parent.querySelector(`${child} > img`);
}

export {
    loadStaticIcon,
    getFeelsIcon,
    getWeatherIcon
}