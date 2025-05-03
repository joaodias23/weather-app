const API_KEY = 'SYQ4RCFPJ2A346HUZVM7ZDTY8';

async function fetchWeatherData(location) {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`);
    const data = await response.json();
    console.log('Raw weather data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

function parseWeatherData(data) {
    const current = data.currentConditions;
  
    return {
      temp: current.temp,
      condition: current.conditions,
      humidity: current.humidity,
      icon: current.icon
    };
}

const form = document.getElementById('weather-form');
const input = document.getElementById('location-input');
const output = document.getElementById('weather-output');
const loading = document.getElementById('loading');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (!location) return;

  output.innerHTML = '';
  loading.classList.remove('hidden');

  const rawData = await fetchWeatherData(location);
  const weather = parseWeatherData(rawData);

  loading.classList.add('hidden');

  console.log('Parsed weather data:', weather);

  displayWeather(weather);
});

function displayWeather(weather) {
    output.innerHTML = `
      <p>Temperature: ${weather.temp} °F</p>
      <p>Condition: ${weather.condition}</p>
      <p>Humidity: ${weather.humidity}%</p>
      <p><img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th Set - Color/${weather.icon}.png" alt="${weather.condition}" width="50" /></p>
    `;
  }
  