/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const api = (() => {\n    const endPoint = 'https://api.openweathermap.org/data/2.5/weather?q=';\n    const apiKey = '183b724297b712d09a53682be4425c4c';\n\n    function processData(response) {\n        const weatherData = {\n            type: response.weather[0].main,\n            description: response.weather[0].description,\n            city: response.name,\n            country: response.sys.country,\n            temp: response.main.temp,\n            tempMax: response.main.temp_max,\n            tempMin: response.main.temp_min,\n            feelsLike: response.main.feels_like,\n            sunrise: response.sys.sunrise,\n            sunset: response.sys.sunset,\n            humidity: response.main.humidity,\n            wind: response.wind.speed,\n            cloudiness: response.clouds.all,\n        }\n        return weatherData;\n    };\n\n    async function getData(query) {\n        const queryString = endPoint + query + '&appid=' + apiKey;\n        try {\n            const response = await fetch(queryString, {mode: 'cors'});\n            console.log('the response: ', response);\n            const data = await response.json();\n            console.log('the parsed data: ', data);\n            if(!response.ok) {\n                return data;\n            }\n            return processData(data);\n        }\n        catch(err) {\n            console.log('Error!', err);\n        }\n    };\n\n    return {\n        getData,\n    };\n})();\n\n\nconst dom = (() => {\n    let weatherData;\n\n    const form = document.querySelector('form');\n    const search = document.getElementById('search');\n\n    async function displayData(query) {\n        weatherData = await api.getData(query);\n        console.log('Weather Data: ', weatherData);\n        if(weatherData.cod) {\n            console.log(weatherData.message);\n        }\n        else {\n            console.log('displaying on page');\n        }\n    };\n\n    function submitToAPI(e) {\n        console.log('form submitted');\n        displayData(search.value);\n\n        search.value = '';\n        e.preventDefault();\n    };\n    \n    form.addEventListener('submit', submitToAPI);\n    return {\n\n    }\n})();\n\n\n//# sourceURL=webpack://top-weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;