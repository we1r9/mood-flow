import 'https://unpkg.com/dayjs@1.11.10/dayjs.min.js';
import { getCity, toggleGeoAccess, showEnableGeoHint } from './utils/location.js';
import { initModalWindow } from './utils/modal-window.js';
import { titles } from '../data/titles.js';
import { getRandomItem } from './utils/getRandomItem.js';
import { getCacheKey } from './utils/getCacheKey.js';

document.addEventListener('DOMContentLoaded', init);

// Инициализация страницы:
// рендерим header и интерфейс выбора настроения
// подключаем обработчик клика на кнопку старта
// показываем модалку с запросом доступа к геолокации
function init() {
  loadPage();
  initMoodSelection();
  initHeader();
  initModalWindow(
    () => getCity(),
    () => {}
  );
}

// Инициализация header'а
function initHeader() {
  const dateElement = document.querySelector('.current-date');
  const locationElement = document.querySelector('.current-location');

  if (!dateElement || !locationElement) return;

  // Устанавливаем текущую дату
  dateElement.textContent = dayjs().format('ddd, MMM D');

  // Получаем кэшированный город
  const cachedCity = localStorage.getItem('city');

  if (cachedCity) {
    locationElement.textContent = cachedCity;
  } else {
    locationElement.textContent = '';
  }

  const geoButton = document.querySelector('.change-geo-access-btn');

  if (!geoButton) return;

  // Обработчик клика по кнопке смены доступа к геолокации
  geoButton.addEventListener('click', async () => {
    // Проверяем текущее состояние разрешений геолкации
    let permissionState;
    if (navigator.permissions) {
      try {
        const status = await navigator.permissions.query( { name: 'geolocation'});
        permissionState = status.state;
      } catch {
        permissionState = 'prompt';
      }
    }

    // Если пользователь явно запретил приложению доступ к геолокации — показываем подсказку
    if (permissionState === 'denied') {
      locationElement.textContent = '';
      showEnableGeoHint();
      return;
    }

    // Проверяем сохранённый флаг отказа от геолокации в localStorage
    const deniedFlag = localStorage.getItem('geoDenied') === 'true';

    // Если пользователь ранее отказал — показываем лоадер
    if (deniedFlag) {
      locationElement.innerHTML = `
        <div class="sk-flow">
          <div class="sk-flow-dot"></div>
          <div class="sk-flow-dot"></div>
          <div class="sk-flow-dot"></div>
        </div>
      `;

      // Запускаем определние города и искусственную задержку для анимации
      const geoPromise = getCity();
      const delayPromise = new Promise(
        resolve => setTimeout(resolve, 1000));

      Promise.all([geoPromise, delayPromise])
        .then(([city]) => {
          // Заменяем лоадер на название города
          locationElement.textContent = city;
        })
        .catch(error => {
          // Если геолокация недоступна — показываем подсказку и очищаем блок города
          showEnableGeoHint();
          locationElement.textContent = '';
          locationElement.classList.remove('hidden');
        });

    } else {
      // Если флаг отказа не установлен — переключаем доступ к геолокации
      toggleGeoAccess().then(() => {
        // Прячем город, очищаем его и снова показываем через 300 мс
        locationElement.classList.add('hidden');
        setTimeout(() => {
          locationElement.textContent = '';
          locationElement.classList.remove('hidden');
        }, 300);
      });
    }
  });
}

// Инициализация выбора настроения на главной странице
function initMoodSelection() {
  const moodButtons = document.querySelectorAll('.mood-card');
  const startButton = document.querySelector('.mood-start');

  // Создаем переменную для хранения выбранного настроения
  let selectedMood = null;

  if (!moodButtons.length || !startButton) return;

  // Прячем кнопку старта до выбора настроения
  startButton.classList.add('hidden');

  // Вешаем обработчик клика для каждой карточки
  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Запоминаем выбранное настроение
      selectedMood = button.dataset.mood;

      startButton.classList.remove('hidden');

      // Снимаем выделение со всех карточек
      moodButtons.forEach(btn => btn.classList.remove('active'));
      
      button.classList.add('active');
    });
  });

  // Обработчик нажатия на кнопку
  startButton.addEventListener('click', () => {
    const mood = selectedMood;

    if (!selectedMood) return;

    // Очищаем кэш для данного настроения
    const cacheKey = getCacheKey(mood);
    sessionStorage.removeItem(cacheKey);

    // Переходим на страницу с результатом, передавая настроение в URL
    window.location.href = `result.html?mood=${selectedMood}`;
  });
}

// Рендерим интерфейс выбора настроения:
// заголовок
// 6 кнопок с настроениями и data-атрибутами
// кнопка создания карточки
function loadPage() {
  const contentElement = document.querySelector('.content');

  // Генерируем рандомный заголовок
  const pageTitle = getRandomItem(titles);

  contentElement.innerHTML = `
    <h1 class="mood-title">
      <span class="typewriter">${pageTitle}</span>
    </h1>

    <div class="mood fade-in">
      <div class="mood-grid">
        <button type="button"
                class="mood-card"
                data-mood="excited">
          <img class="mood-icon" src="images/excited.png">
        </button>
        <button type="button" 
                class="mood-card"
                data-mood="naughty">
          <img class="mood-icon" src="images/naughty.png">
        </button>
        <button type="button" 
                class="mood-card"
                data-mood="mischievous">
          <img class="mood-icon" src="images/mischievous.png">
        </button>
        <button type="button" 
                class="mood-card"
                data-mood="nerdy">
          <img class="mood-icon" src="images/nerdy.png">
        </button>
        <button type="button" 
                class="mood-card"
                data-mood="peaceful">
          <img class="mood-icon" src="images/peaceful.png">
        </button>
        <button type="button" 
                class="mood-card"
                data-mood="despaired">
          <img class="mood-icon" src="images/despaired.png">
        </button>
      </div>

      <!-- stays hidden until a mood is selected -->
      <button class="mood-start hidden">Create card</button>
    </div>
  `;

    // Функция для имитирования печати заголовка
    function titleTypewriter() {
    const typewriterEl = document.querySelector('.typewriter');
    const fullText = typewriterEl.textContent.trim();
    typewriterEl.textContent = '';

    let index = 0;
    function typeNextChar() {
      if (index < fullText.length) {
        typewriterEl.textContent += fullText[index];
        index++;
        setTimeout(typeNextChar, 90);
      } else {
        typewriterEl.classList.add('blinking');
      }
    }
    typeNextChar();
  }
  titleTypewriter();
}