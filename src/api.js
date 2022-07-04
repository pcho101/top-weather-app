const api = (() => {
  const endPoint = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const apiKey = '183b724297b712d09a53682be4425c4c';

  function processData(response) {
    const weatherData = {
      time: response.dt,
      type: response.weather[0].main,
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      city: response.name,
      country: response.sys.country,
      temp: response.main.temp,
      tempMax: response.main.temp_max,
      tempMin: response.main.temp_min,
      feelsLike: response.main.feels_like,
      sunrise: response.sys.sunrise,
      sunset: response.sys.sunset,
      timezone: response.timezone,
      humidity: response.main.humidity,
      wind: response.wind.speed,
      cloudiness: response.clouds.all,
    }
    return weatherData;
  }

  async function getData(query) {
    const queryString = endPoint + query + '&appid=' + apiKey;
    try {
      const response = await fetch(queryString, {mode: 'cors'});
      const data = await response.json();
      if(!response.ok) {
        return data;
      }
      return processData(data);
    }
    catch(err) {
      console.log('Error!', err);
    }
  }

  return {
    getData,
  };
})();

export { api };