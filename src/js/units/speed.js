import { isCelsius } from "./temperature";

//constant speed
const MPH_TO_MS = 0.45;

function metersSecondToMillesHour(metersSecond) {
  metersSecond = parseFloat(metersSecond);
  return (metersSecond / MPH_TO_MS).toFixed(2);
}

function millesHourToMetersSecond(millesHour) {
  millesHour = parseFloat(millesHour);
  return (millesHour * MPH_TO_MS).toFixed(2);
}

function formatSpeedValue(speed) {
    if(isCelsius()) return speed;

    return metersSecondToMillesHour(speed);
}

export { millesHourToMetersSecond, metersSecondToMillesHour, formatSpeedValue };
