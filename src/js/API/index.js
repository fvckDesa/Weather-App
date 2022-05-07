import 'regenerator-runtime/runtime';

const API_KEY = "9996ab11b1425495b723f81b2970a76f";

async function fetchData(url) {
  const res = await fetch(url, { mode: "cors" });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export {
    API_KEY,
    fetchData
}