export const weatherCodeMap = {
  0: 'Sky is clear',
  1: 'Sky is mainly clear',
  2: 'Partly cloudy',
  3: 'Cloudy',
  45: 'Foggy',
  48: 'Rime fog',

  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Heavy drizzle',

  56: 'Freezing drizzle',
  57: 'Freezing drizzle',

  61: 'Fine rain',
  63: 'Mid-intensity rain',
  65: 'Heavy showers',

  66: 'Freezing rain',
  67: 'Freezing rain',

  71: 'Fine snow',
  73: 'Mid-intensity snow',
  75: 'Heavy snow',

  77: 'Snow grains',

  80: 'Brief rain',
  81: 'Steady showers',
  82: 'Rainstorm',

  85: 'Light snow showers',
  86: 'Heavy snow showers',

  95: 'Thunderstorm'
};

// returns weather description string based on numeric weather code
export function getWeatherDescription(code) {
  return weatherCodeMap[code] || 'Unknown weather';
}