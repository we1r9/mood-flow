const COORDS_KEY = 'cachedCoordinates';

// Возвращает Promise c объектом { latitude, longitude }
// Если в localStorage есть координаты — берем их
// Если нет — запрашиваем у браузера
// При успехе — кэшируем в localStorage
// При ошибке — отклоняем Promise
export function getCoordinates() {
  // Пробуем достать координаты из localStorage
  const cached = localStorage.getItem(COORDS_KEY);
  if (cached) {
    try {
      // Если данные корректны — возвращаем их в виде промиса
      return Promise.resolve(JSON.parse(cached));
    } catch {
      // Если не удалось — удаляем результат
      localStorage.removeItem(COORDS_KEY);
    } 
  }

  // Если данных нет в localStorage — запрашиваем у браузера
   return new Promise((resolve, reject) => {
    // Проверяем поддержку геолокации
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    // Запрашиваем текущую геопозицию пользователя
    navigator.geolocation.getCurrentPosition(

      // Успех: сохраняем координаты в localStorage и возвращаем их
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        localStorage.setItem(COORDS_KEY, JSON.stringify(coords));
        resolve(coords);
      },

      // Ошибка: отклоняем Promise с объектом ошибки
      (error) => {
        reject(error);
      }
    );
  });
}

// Находим элемент для отображения
const locationElement = document.querySelector('.current-location');

// Определяет город по координатам через Nominatim и обновляет DOM
export async function getCity() {
  try {
    // Сбрасываем флаг отказа перед новой попыткой
    localStorage.setItem('geoDenied', 'false');

    // Получаем координаты
    const { latitude, longitude } = await getCoordinates();

    // Reverse-geocoding: готовим запрос к API Nominatim https://nominatim.openstreetmap.org/ui/search.html
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat=${latitude}&lon=${longitude}`;

    // Отправляем HTTP-запрос и проверяем статус
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    // Парсим JSON и собираем имя города
    const data = await response.json();
    const city = data.address.city || data.address.town || data.address.village || 'Unknown';

    // Обновляем DOM и кэшируем
    if (locationElement) locationElement.textContent = city;
    localStorage.setItem('city', city);
    console.log('City:', city);

    // Возвращаем строку города
    return city;

  } catch (error) {
    console.error('Reverse-geocoding failed:', error);

    // Если пользователь явно запретил доступ к геолокации в браузере
    if (error && error.code === 1) {
      localStorage.setItem('geoDenied', 'true');
    }

    // Чистим отображение (если элемент есть), чтобы не висели старые данные
    locationElement.textContent = '';

    //  Пробрасываем ошибку дальше
    throw error;
  }
}

// Переключает внутреннее состояние доступа к геолокации:
// при включении — запускает getCity()
// при выключении — ставит флаг отказа и чистит город
export function toggleGeoAccess() {
  // Читаем флаг отказа пользователя
  const denied = localStorage.getItem('geoDenied') === 'true';

  if (denied) {
    // Ранее пользователь отказал — сейчас хочет включить
    // Получаем город через getCity()
    return getCity();
  } else {
    // Пользователь не отказывал — выключаем показ города в UI
    localStorage.setItem('geoDenied', 'true');
    localStorage.removeItem('city');
    locationElement.textContent = '';

    // Возвращаем Promise, который ничего не делает, но позволяет продолжать работу с .then()
    return Promise.resolve(null);
  }
}

// Показываем подсказку, чтобы пользователь понимал, что нужно включить доступ к геолокации самому
export function showEnableGeoHint() {

  // Создаем HTML
  const toast = document.createElement('div');
  toast.className = 'geo-toast';
  toast.innerHTML = 'To display your city and local weather, please enable location access in your browser settings';

  // Добавляем элемент в конец html
  document.body.appendChild(toast);

  // Делаем элемент видимым
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  // Убираем через 3 секунды
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true});
  }, 3500);
}

// Попытка запроса к геопозиции с учетом разрешений
export async function tryRequestGeo() {
  // Проверяем поддержку Permissions API
  if (!navigator.permissions) {
    // Если не поддерживает — пробуем получить город
    return getCity().catch(error => {
      // Ошибка — проверяем, что это отказ в доступе и показываем подсказку
      if (error && error.code === 1) showEnableGeoHint();
      // Пробрасываем ошибку дальше для последующей обработки
      throw error;
    });
  }

  // Если Permissions API доступен, запрашиваем статус разрешения на геопозицию
  const status = await navigator.permissions.query({ name: 'geolocation' });

  if (status.state === 'denied') {
    showEnableGeoHint();
    // Геопозицию получить не удалось
    return null;
  }

  // Пробуем получить город, если статус не denied
  return getCity().catch(error => {
    // Показываем подсказку, если юзер отказался
    if (error && error.code === 1) showEnableGeoHint();
    // Пробрасываем ошибку
    throw error;
  });
}