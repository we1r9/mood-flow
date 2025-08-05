const COORDS_KEY = 'cachedCoordinates';

// returns Promise which resolves ({ latitude, longitude }) or rejects (reject(Error))
export function getCoordinates() {
  // try to get coordinates from localStorage if exists
  const cached = localStorage.getItem(COORDS_KEY);
  if (cached) {
    try {

      // parse and return Promise with coordinates
      return Promise.resolve(JSON.parse(cached));
    } catch {
      localStorage.removeItem(COORDS_KEY);
    } 
  }

  // otherwise make a request to browser to get coordinates
   return new Promise((resolve, reject) => {

    // check geo support
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    // make geo request
    navigator.geolocation.getCurrentPosition(

      // (onSuccess)
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        //save coordinates to localStorage
        localStorage.setItem(COORDS_KEY, JSON.stringify(coords));
        resolve(coords);
      },

      // (onError)
      (error) => {
        reject(error);
      }
    );
  });
}

// find element to display result
const locationElement = document.querySelector('.current-location');

// gets coordinates with getCoordinates, makes fetch request to Nominatim, updates the DOM and saves to localStorage
export async function getCity() {
  try {
    // сбрасываем флаг отказа перед новой попыткой
    localStorage.setItem('geoDenied', 'false');

    // waiting for coordinates
    const { latitude, longitude } = await getCoordinates();

    // prepare url for request to Nominatim (reverse-geocoding)
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat=${latitude}&lon=${longitude}`;

    // HTTP-request itself
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // save short-circuit evaluation result
    const city = data.address.city || data.address.town || data.address.village || 'Unknown';

    // update DOM and save to localStorage
    locationElement.textContent = city;
    localStorage.setItem('city', city);

    console.log('City:', city);

    // сбрасываем город для того, чтобы мы могли использовать его в цепочке .then()
    return city;

  } catch (error) {
    console.error('Reverse-geocoding failed:', error);

    // if user explicitly denied geolocation in browser prompt
    if (error.code === 1) {
      localStorage.setItem('geoDenied', 'true');
    }
    locationElement.textContent = '';

    // преобразовывыаем ошибку
    throw error;
  }
}

// переключение доступа к гео
export function toggleGeoAccess() {
  // парсим состояние гео
  const denied = localStorage.getItem('geoDenied') === 'true';

  if (denied) {
    // если пользователь ранее разрешил доступ к геолокации (или не запрещал), пробуем получить город — функция вернёт промис с названием города
    return getCity();
  } else {
    // если отказал — сохраняем в localStorage
    localStorage.setItem('geoDenied', 'true');
    localStorage.removeItem('city');
    locationElement.textContent = '';

    // возвращаем Promise, который ничего не делает, но позволяет продолжать работу с .then()
    return Promise.resolve(null);
  }
}

// показываем подсказку, чтобы пользователь понимал, что нужно включить доступ к гео самому
function showEnableGeoHint() {

  // создаем элемент
  const toast = document.createElement('div');
  toast.className = 'geo-toast';
  toast.innerText = 'Please enable location access in your browser settings to see the weather or clear browser history';

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '0.9rem',
    padding: '0.75rem 1.25rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    zIndex: 10000,
    opacity: '0',
    transition: 'opacity 0.3s ease'
  });

  // добавляем элемент в конец html
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.style.opacity = '1');

  // убираем через 3 секунды
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.addEventListener('transitionend', () => toast.remove(), { once: true});
  }, 3000);
}

// попытка запроса к гео с учетом разрешений
export async function tryRequestGeo() {

  // проверяем поддержку Permissons API
  if (!navigator.permissions) {

    // если не поддерживает — пробуем получить город
    return getCity().catch(error => {

      // ошибка — проверяем, что это отказ в доступе и показываем подсказу
      if (error.code === 1) showEnableGeoHint();
      throw error; // пробрасываем ошибку дальше для последующей обработки
    });
  }

  // если Permissions API доступен, запрашиваем статус разрешения на гео
  const status = await navigator.permissions.query({ name: 'geolocation' });

  if (status.state === 'denied') {
    showEnableGeoHint();

    // гео получить не удалось
    return Promise.resolve(null);
  }

  // пробуем получить город, если статус !== denied
  return getCity().catch(error => {

    // показываем подсказку, если юзер отказался
    if (error.code === 1) showEnableGeoHint();

    // пробрасываем ошибку
    throw error;
  });
}