import {getCoordinates} from "./location.js";
import {getWeatherDescription} from "./weatherDescription.js";

export async function getWeather() {
  // get coordinates
  const { latitude, longitude } = await getCoordinates();

  // prepare URL
  const baseUrl = "https://api.open-meteo.com/v1/forecast";
  const params = `?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`;
  const url = baseUrl + params;

  // HTTP-request itself
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status);
  }

  // save response
  const data = await response.json();

  const rawTemp = data.current_weather.temperature;
  const temperatureCelsius = Math.round(rawTemp);

  // convert numerical weather code to human-readable description via getWeatherDescription
  const weatherCode = data.current_weather.weathercode;
  const weatherDescription = getWeatherDescription(weatherCode);

  return { temperatureCelsius, weatherDescription };
}