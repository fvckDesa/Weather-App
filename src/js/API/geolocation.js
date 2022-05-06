import { API_KEY, fetchData } from './index';

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      const { latitude, longitude } = position.coords;
      resolve({ lat: latitude, lon: longitude });
    }

    function error(err) {
      let message = "";
      switch (err.code) {
        case 1:
          message =
            "To use this feature, the site must be authorized to access the location";
          break;
        case 2:
        case 3:
        default:
          message = "Location not detected, try again";
          break;
      }

      reject(new Error(message));
    }
  });
}

async function getCityInfo({ city, lat, lon }) {
  const limit = 1;
  let url;
  if(city){
    url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`;
  } else {
    url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_KEY}`;
  }

  const cityInfo = (await fetchData(url))[0];
  if(cityInfo.length === 0 && city == undefined) {
    return { name: "Unknown city", lat, lon };
  }
  if(city && cityInfo.length === 0) {
    throw new Error("city not found");
  }

  delete cityInfo.local_names;

  return cityInfo;
}


export {
  getCurrentPosition,
  getCityInfo
}