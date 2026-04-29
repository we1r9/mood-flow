import {getCoordinates} from "./location.js";
import {getWeatherDescription} from "./weatherDescription.js";

export async function getWeather() {
  const { latitude, longitude } = await getCoordinates();

  const baseUrl = "https://api.open-meteo.com/v1/forecast";
  const params = `?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`;
  const url = baseUrl + params;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();

  const rawTemp = data.current_weather.temperature;
  const temperatureCelsius = Math.round(rawTemp);
  const weatherCode = data.current_weather.weathercode;
  const weatherDescription = getWeatherDescription(weatherCode);
  const observationTime = data.current_weather.time;

  return { 
    temperatureCelsius, 
    weatherDescription, 
    weatherCode, 
    observationTime 
  };
}
