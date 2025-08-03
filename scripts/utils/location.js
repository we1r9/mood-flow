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

  } catch (error) {
    console.error('Reverse-geocoding failed:', error);
    locationElement.textContent = '';
  }
}