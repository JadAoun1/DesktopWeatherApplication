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
    const { temp, feels_like, humidity } = data.main;
    const { speed, deg } = data.wind;
    const { uvi } = data; // Make sure your API response includes UV index

    document.getElementById('temp').innerText = `${temp}°C`;
    document.getElementById('feels-like').innerText = `Feels like ${feels_like}°C`;
    document.getElementById('humidity').innerText = `${humidity}%`;
    document.getElementById('wind-speed').innerText = `${speed} km/h`;
    document.getElementById('wind-dir').innerText = convertDegreesToDirection(deg);
    document.getElementById('uv-index').innerText = `${uvi}`;
}

function convertDegreesToDirection(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.floor((deg + 22.5) / 45) % 8;
    return directions[index];
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
