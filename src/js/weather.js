const API_KEY = "9996ab11b1425495b723f81b2970a76f";

async function getWeather(city) {
  

  try {
    const { lat, lon } = getCoord(city);
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}`;
    const weather = await fetchData(weatherURL);
  } catch(err) {
    throw err;
  }
  
}

async function getCoord(city) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const data = await fetchData(URL);
  return data.coord;

}

async function fetchData(url) {
  const res = await fetch(url, { mode: "cors" });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export { getWeather };
