const COORDS_KEY = 'cachedCoordinates';

export function getCoordinates() {
  const cached = localStorage.getItem(COORDS_KEY);
  if (cached) {
    try {
      return Promise.resolve(JSON.parse(cached));
    } catch {
      localStorage.removeItem(COORDS_KEY);
    } 
  }

   return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        localStorage.setItem(COORDS_KEY, JSON.stringify(coords));
        resolve(coords);
      },

      (error) => {
        reject(error);
      }
    );
  });
}

export async function getCity() {
  const locationElement = document.querySelector('.current-location');
  try {
    localStorage.setItem('geoDenied', 'false');

    const { latitude, longitude } = await getCoordinates();

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat=${latitude}&lon=${longitude}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const city = data.address.city || data.address.town || data.address.village || 'Unknown';

    if (locationElement) locationElement.textContent = city;
    localStorage.setItem('city', city);

    return city;

  } catch (error) {
    console.error('Reverse-geocoding failed:', error);

    if (error && error.code === 1) {
      localStorage.setItem('geoDenied', 'true');
    }

    locationElement.textContent = '';

    throw error;
  }
}

export function toggleGeoAccess() {
  const locationElement = document.querySelector('.current-location');
  const denied = localStorage.getItem('geoDenied') === 'true';

  if (denied) {
    return getCity();
  } else {
    localStorage.setItem('geoDenied', 'true');
    localStorage.removeItem('city');
    locationElement.textContent = '';

    return Promise.resolve(null);
  }
}

export function showEnableGeoHint() {

  const toast = document.createElement('div');
  toast.className = 'geo-toast';
  toast.innerHTML = 'To display your city and local weather, please enable location access in your browser settings';

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true});
  }, 3500);
}

export async function tryRequestGeo() {
  if (!navigator.permissions) {
    return getCity().catch(error => {
      if (error && error.code === 1) showEnableGeoHint();
      throw error;
    });
  }

  const status = await navigator.permissions.query({ name: 'geolocation' });

  if (status.state === 'denied') {
    showEnableGeoHint();
    return null;
  }

  return getCity().catch(error => {
    if (error && error.code === 1) showEnableGeoHint();
    throw error;
  });
}
