
const apiKey = '09ba7540068e51fa6d86ee28540e517a'; 

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
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
    }
}

function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description } = data.weather[0];
    const { speed } = data.wind;

    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Conditions: ${description}</p>
        <p>Wind Speed: ${speed} m/s</p>
    `;
}
