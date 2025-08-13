// import utilities for mood data, weather, city and date formatting
import { getMood } from './utils/getMood.js';
import { getRandomItem } from './utils/getRandomItem.js';
import { getCity } from './utils/location.js';
import { getWeather } from './utils/getWeather.js';
import { getCacheKey } from './utils/getCacheKey.js';
import 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';

// Инициализация страницы результата: 
// парсим настроение 
// загружаем город и погоду
// кэшируем и рендерим карточку
(async function init() {
  // Парсим настроение из URL и сохраняем
  const params = new URLSearchParams(window.location.search);
  const mood = params.get('mood');

  // Возвращаем назад, если с data-атрибутом что-то не так
  if (!mood) {
    window.location.href = 'index.html';
    return;
  }

  // Отображение города: показываем кэшированный город или лоадер во время загрузки города
  const locationElement = document.querySelector('.current-location');
  const cachedCity = localStorage.getItem('city');
  if (!locationElement) return;

  const denied = localStorage.getItem('geoDenied') === 'true';

  if (cachedCity) {
    locationElement.textContent = cachedCity;
  } else if (denied) {
    locationElement.textContent = '';
  } else {
    // Loader
    locationElement.innerHTML = `
      <div class="sk-flow">
        <div class="sk-flow-dot"></div>
        <div class="sk-flow-dot"></div>
        <div class="sk-flow-dot"></div>
      </div>
    `;

    // Триггерим вызов определения города после небольшой задержки
    setTimeout(() => {
      getCity().catch(() => {});
    }, 1000);
  }

  // Получаем кэшированный ключ для карточки
  const cacheKey = getCacheKey(mood);

  // Пытаемся прочитать кэшированную карточку из sessionStorage
  const savedKey = sessionStorage.getItem(cacheKey);

  if (savedKey) {
    const { cardData, weatherData } = JSON.parse(savedKey);
    renderCard(cardData, weatherData, denied, cacheKey);
    return;
  } 

  // Удаляем старый ключ для карточки
  sessionStorage.removeItem(cacheKey + '_opened');

  // Подготавливаем данные для карточки на основе настроения
  const cardData = prepareCardData(mood);
  if (!cardData) {
    window.location.href = 'index.html';
    return;
  }

  // Запрашиваем текущую погоду
  const weatherData = await fetchWeatherData();

  // Сохраняем данные в sessionStorage
  sessionStorage.setItem(cacheKey, JSON.stringify({
    cardData,
    weatherData
  }));

  // Рендерим карточку
  renderCard(cardData, weatherData, denied, cacheKey);

  // Подготавливаем объект с данными для отображения в карточке, где moodId – идентификатор выбранного настроения 
  function prepareCardData(moodId) {
    const moodObject = getMood(moodId);
    if(!moodObject) {
      console.warn(`Mood "${moodId}" not found.`);
      return null;
    }
    return { 
      message: getRandomItem(moodObject.messages),
      track: getRandomItem(moodObject.tracks)
    };
  }

  // Запрашиваем текущую погоду и возвращаем объект с погодными данными
  async function fetchWeatherData() {
    if (!denied) {
      try {
        const { 
          temperatureCelsius, 
          weatherDescription, 
          weatherCode, 
          observationTime 
        } = await getWeather();

        // Отображаем в консоли
        console.log(`${temperatureCelsius} \u2103`, weatherDescription, weatherCode, observationTime);

        return { 
          temperatureCelsius, 
          weatherDescription, 
          weatherCode, 
          observationTime 
        };
        // При ошибке выводим ошибку в консоль и возвращаем путсые данные
      } catch (error) {
        console.error('Failed to load weather data:', error);
        return {
          temperatureCelsius: null,
          weatherDescription: 'Unavailable',
          weatherCode: null,
          observationTime: null
        };
      }
    } else {
      return {
        temperatureCelsius: null,
        weatherDescription: 'Unavailable',
        weatherCode: null,
        observationTime: null
      };
    }
  }
})();

// Рендерим карточку в DOM
function renderCard(cardData, weatherData, denied, cacheKey) {
  const today = dayjs().format('dddd, MMM D');
  const { 
    temperatureCelsius = 'N/A',
    weatherDescription = 'Unavailable'
  } = weatherData;
  const { message, track } = cardData;

  // HTML с блоком погоды или без него на основе разрешения пользователем доступа к геолокации
  if (!denied) {
    // Создаем HTML
    // Пользователь разрешил геолокацию — показыаем погоду в карточке
    const html = `
      <div class="card-content">
        <div class="current-date-card">
          ${today}
        </div>

        <div class="result-weather">
          It's ${temperatureCelsius} \u2103 now. ${weatherDescription}.
        </div>

        <div class="result-cover">
          <img class="cover"
            src="${track.cover}"
          >
        </div>

        <div class="result-title">
          ${track.title}
        </div>

        <div class="result-artist">
          ${track.artist}
        </div>

        <div class="result-message">
          ${message}
        </div>

        <div>
          <a href="${track.link}" target="_blank" rel="noopener noreferrer">
            <button class="spotify-button">
              <img 
                class="spotify-icon" 
                src="images/spotify.png">
            </button>
          </a>
        </div>
      </div>
    `;

    // Вставляем HTML в контейнер
    const cardElement = document.querySelector('.result-card');
    cardElement.innerHTML = html;

    const openCardButton = document.querySelector('.open-card-button');

    // Читаем открытое состояние карточки
    const opened = sessionStorage.getItem(cacheKey + '_opened') === 'true';

    // Если карточка уже открыта
    if (opened) {
      cardElement.classList.add('visible');
      openCardButton.style.display = 'none';
    }

    // Показывает карточку на странице и убирает кнопку открытия
    function openCard() {
      cardElement.classList.remove('visible');
      requestAnimationFrame(() => {
        cardElement.classList.add('visible');
      });
      openCardButton.style.display = 'none';
      sessionStorage.setItem(cacheKey + '_opened', true);
    }

    // Открываем карточку при клике на кнопку
    openCardButton.addEventListener('click', openCard);

    // Открываем карточку по кнопкe "Enter"
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        openCard();
      }
    });

  } else {
    // Пользователь отклонил геолокацию — не показываем погоду в карточке
    const html = `
      <div class="card-content">
        <div class="current-date-card no-weather-date">
          ${today}
        </div>

        <div class="result-cover">
          <img class="cover"
            src="${track.cover}"
          >
        </div>

        <div class="result-title">
          ${track.title}
        </div>

        <div class="result-artist">
          ${track.artist}
        </div>

        <div class="result-message">
          ${message}
        </div>

        <div>
          <a href="${track.link}" target="_blank" rel="noopener">
            <button class="spotify-button">
              <img 
                class="spotify-icon" 
                src="images/spotify.png">
            </button>
          </a>
        </div>
      </div>
    `;

    const cardElement = document.querySelector('.result-card');
    cardElement.innerHTML = html;

    const openCardButton = document.querySelector('.open-card-button');

    const opened = sessionStorage.getItem(cacheKey + '_opened') === 'true';

    if (opened) {
      cardElement.classList.add('visible');
      openCardButton.style.display = 'none';
    }

    function openCard() {
      cardElement.classList.remove('visible');
      requestAnimationFrame(() => {
        cardElement.classList.add('visible');
      });
      openCardButton.style.display = 'none';
      sessionStorage.setItem(cacheKey + '_opened', true);
    }
    
    openCardButton.addEventListener('click', openCard);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        openCard();
      }
    });
  }
}