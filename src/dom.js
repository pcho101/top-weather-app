import { fromUnixTime } from 'date-fns'
import { api } from './api.js'

const dom = (() => {
  let weatherData;
  let units = 'metric';

  const body = document.querySelector('body');
  const form = document.querySelector('form');
  const search = document.getElementById('search');
  const check = document.getElementById('toggle-temp');
  const main = document.querySelector('main');
  const errorMsg = document.querySelector('.error-message');

  const tempIcon = document.querySelector('.temp-icon');
  const date = document.querySelector('.date');
  const weatherType = document.querySelector('.type');
  const description = document.querySelector('.desc');
  const location = document.querySelector('.location');
  const temp = document.querySelector('.temp');
  const tempMax = document.querySelector('.temp-max');
  const tempMin = document.querySelector('.temp-min');
  const feelsLike = document.querySelector('.feels-like');
  const sunrise = document.querySelector('.sunrise');
  const sunset = document.querySelector('.sunset');
  const humidity = document.querySelector('.humidity');
  const wind = document.querySelector('.wind');
  const cloudiness = document.querySelector('.cloudiness');

  function toggleTemp() {
    units = units === 'metric' ? 'imperial' : 'metric';
    if(!weatherData.cod) render();
  }

  function convertTemp(temp, units) {
    return units === 'metric' ? Math.round(temp - 273.15) : Math.round((temp - 273.15) * (9.0/5) + 32);
  }

  function tempUnits(units) {
    return units === 'metric' ? '°C' : '°F';
  }

  function convertSpeed(speed, units) {
    return units === 'metric' ? speed : Math.round(speed * 2.237 * 100) / 100;
  }

  function speedUnits(units) {
    return units === 'metric' ? 'm/s' : 'mph';
  }

  function setTempIcon() {
    let result;
    switch(weatherData.icon) {
      case '01d':
        result = 'sunny';
        body.style.backgroundImage = 'var(--sunny)';
        break;
      case '01n':
        result = 'clear_night';
        body.style.backgroundImage = 'var(--night)';
        break;
      case '02d':
        result = 'partly_cloudy_day';
        body.style.backgroundImage = 'var(--cloud)';
        break;
      case '02n':
        result = 'partly_cloudy_night';
        body.style.backgroundImage = 'var(--night)';
        break;
      case '03d':
      case '04d':
      case '03n':
      case '04n':
        result = 'cloud';
        body.style.backgroundImage = 'var(--cloud)';
        break;
      case '09d':
      case '10d':
      case '09n':
      case '10n':
        result = 'rainy';
        body.style.backgroundImage = 'var(--rainy)';
        break;
      case '11d':
      case '11n':
        result = 'thunderstorm';
        body.style.backgroundImage = 'var(--storm)';
        break;
      case '13d':
      case '13n':
        result = 'cloudy_snowing';
        body.style.backgroundImage = 'var(--snow)';
        break;
      default:
        result = 'waves';
        body.style.backgroundImage = 'var(--cloud)';
    }
    tempIcon.textContent = result;
  }

  function capitalizeMessage(message) {
    const firstLetter = message.charAt(0).toUpperCase();
    return firstLetter + message.slice(1);
  }

  function renderError(data) {
    errorMsg.textContent = capitalizeMessage(data.message);
    main.style.display = 'none';
  }

  function renderLoading() {
    errorMsg.textContent = 'Loading...';
  }

  function render() {
    errorMsg.textContent = '';
    main.style.display = 'grid';
    setTempIcon();
    date.textContent = fromUnixTime(weatherData.time + weatherData.timezone).toUTCString().slice(0, -7);
    weatherType.textContent = weatherData.type;
    description.textContent = weatherData.description;
    location.textContent = weatherData.city + ', ' + weatherData.country;
    temp.textContent = convertTemp(weatherData.temp, units) + tempUnits(units);
    tempMax.textContent = convertTemp(weatherData.tempMax, units) + tempUnits(units);
    tempMin.textContent = convertTemp(weatherData.tempMin, units) + tempUnits(units);
    feelsLike.textContent = convertTemp(weatherData.feelsLike, units) + tempUnits(units);
    sunrise.textContent = fromUnixTime(weatherData.sunrise + weatherData.timezone).toUTCString().slice(-12,-7);
    sunset.textContent = fromUnixTime(weatherData.sunset + weatherData.timezone).toUTCString().slice(-12,-7);
    humidity.textContent = weatherData.humidity + '%';
    wind.textContent = convertSpeed(weatherData.wind, units) + speedUnits(units);
    cloudiness.textContent = weatherData.cloudiness + '%';
  }

  async function displayData(query) {
    renderLoading();
    weatherData = await api.getData(query);
    if(weatherData.cod) {
      renderError(weatherData);
    }
    else {
      render();
    }
  }

  function submitToAPI(e) {
    displayData(search.value);

    search.value = '';
    e.preventDefault();
  }
  
  form.addEventListener('submit', submitToAPI);
  check.addEventListener('click', toggleTemp);

  return {
    displayData,
  }
})();

export { dom };