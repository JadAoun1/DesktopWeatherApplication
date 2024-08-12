const apiKey = '09ba7540068e51fa6d86ee28540e517a';

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-container').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { temp, feels_like, humidity, pressure, temp_min, temp_max } = data.main;
    const { speed, deg } = data.wind;
    const visibility = data.visibility / 1000; // Convert visibility to kilometers
    const { description, icon } = data.weather[0];
    const { sunrise, sunset } = data.sys;
    const cloudiness = data.clouds.all;
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('temp').innerText = `${temp}°C`;
    document.getElementById('feels-like').innerText = `Feels like ${feels_like}°C`;
    document.getElementById('humidity').innerText = `${humidity}%`;
    document.getElementById('pressure').innerText = `${pressure} hPa`;
    document.getElementById('wind-speed').innerText = `${speed} km/h`;
    document.getElementById('wind-dir').innerText = convertDegreesToDirection(deg);
    document.getElementById('visibility').innerText = `${visibility} km`;
    document.getElementById('weather-description').innerText = description;
    document.getElementById('cloudiness').innerText = `Cloudiness: ${cloudiness}%`;
    document.getElementById('sunrise').innerText = `Sunrise: ${sunriseTime}`;
    document.getElementById('sunset').innerText = `Sunset: ${sunsetTime}`;
    document.getElementById('min-max-temp').innerText = `Min: ${temp_min}°C / Max: ${temp_max}°C`;

    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${icon}.png`;
}

function convertDegreesToDirection(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.floor((deg + 22.5) / 45) % 8;
    return directions[index];
}

async function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Forecast data not available');
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        document.getElementById('forecast-container').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = data.list.slice(0, 5).map(forecast => {
        const date = new Date(forecast.dt * 1000);
        const { temp } = forecast.main;
        const { icon } = forecast.weather[0];
        return `
            <div class="forecast-day card bg-gray-800 rounded-lg p-4 shadow-xl">
                <p>${date.toDateString()}</p>
                <p>${temp}°C</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            </div>
        `;
    }).join('');
}
