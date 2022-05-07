const DIFFERENCE_FREEZING_BOILING_C = 100;
const DIFFERENCE_FREEZING_BOILING_F = 180;
const DIFFERENCE_RATIO = DIFFERENCE_FREEZING_BOILING_F / DIFFERENCE_FREEZING_BOILING_C;
const DIFFERENCE_FREEZING_C_F = 32;
const DIFFERENCE_FREEZING_K_C = 273.15;

function celsiusToFahrenheit(tempC) {
  tempC = parseInt(tempC);
  return Math.round(tempC * DIFFERENCE_RATIO + DIFFERENCE_FREEZING_C_F);
}

function fahrenheitToCelsius(tempF) {
  tempF = parseInt(tempF);
  return Math.round((tempF - DIFFERENCE_FREEZING_C_F) / DIFFERENCE_RATIO);
}

function formatTemp(temp) {
  if(isCelsius()) {
    return `${kelvinToCelsius(temp)} °C`;
  } else {
    return `${kelvinToFahrenheit(temp)} °F`;
  }
}

function kelvinToFahrenheit(temp) {
  return celsiusToFahrenheit(kelvinToCelsius(temp));
}

function kelvinToCelsius(temp) {
  return Math.round(temp - DIFFERENCE_FREEZING_K_C);
}

function isCelsius() {
  const toggle = document.querySelector("#toggle");
  return toggle.checked;
}

export { celsiusToFahrenheit, fahrenheitToCelsius, formatTemp, isCelsius }