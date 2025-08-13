import {getCoordinates} from "./location.js";
import {getWeatherDescription} from "./weatherDescription.js";

// Получает текущие погодные данные с API https://open-meteo.com/
export async function getWeather() {
  // Запрашиваем координаты пользователя
  const { latitude, longitude } = await getCoordinates();

  // Подготавливаем URL для запроса
  const baseUrl = "https://api.open-meteo.com/v1/forecast";
  const params = `?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`;
  const url = baseUrl + params;

  // Отправляем HTTP-запрос с широтой и долготой
  const response = await fetch(url);

  // Проверяем успешность ответа
  if (!response.ok) {
    throw new Error(response.status);
  }

  // Сохраняем ответ
  const data = await response.json();

  // Извлекаем из ответа:
  // температуру (округляем до целого)
  // код погоды
  // текстовое описание кода через getWeatherDescription()
  // время наблюдения
  const rawTemp = data.current_weather.temperature;
  const temperatureCelsius = Math.round(rawTemp);
  const weatherCode = data.current_weather.weathercode;
  const weatherDescription = getWeatherDescription(weatherCode);
  const observationTime = data.current_weather.time;

  // Возвращаем объект с полученными данными
  return { 
    temperatureCelsius, 
    weatherDescription, 
    weatherCode, 
    observationTime 
  };
}