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
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const forecastResponse = await fetch(forecastUrl);
        if (!response.ok || !forecastResponse.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        const forecastData = await forecastResponse.json();
        displayWeather(data);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-container').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description } = data.weather[0];
    const { speed } = data.wind;

    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = `
        <h1>Weather in ${name}</h1>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Conditions: ${description}</p>
        <p>Wind Speed: ${speed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = data.list.slice(0, 5).map(forecast => {
        const date = new Date(forecast.dt * 1000);
        const temp = forecast.main.temp;
        const icon = forecast.weather[0].icon;
        return `
            <div class="forecast-day">
                <p>${date.toDateString()}</p>
                <p>${temp}°C</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            </div>
        `;
    }).join('');
}
