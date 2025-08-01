let locationElement = document.querySelector(".current-location");

export function getLocation() {
  if (!("geolocation" in navigator)) {
    
    // clear element if geo not supported
    locationElement.textContent = '';
    console.warn("geolocation not supported.");
    return;
  }

  // make geo request
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// destructuring position 
function onSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);

  // prepare url for request to Nominatim (reverse-geocoding)
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat=${latitude}&lon=${longitude}`;

  // HTTP-request itself
  fetch(url)
    .then((response) => {
      return response.json()
    })

    // save short-circuit evaluation result
    .then((data) => {
      const city = data.address.city || data.address.town || data.address.village || "Unknown";
      locationElement.textContent = city;
      
      localStorage.setItem("city", city);

      console.log(city);
    })
    .catch((error) => {
      console.error("Reverse-geocoding failed: ", error);
      locationElement.textContent = '';
    });
}

// handle the error and clean the DOM
function onError(error) {
  console.warn("Geolocation error:", error.message);
  locationElement.textContent = '';
}