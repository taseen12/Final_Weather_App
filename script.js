function searchWeather() {
    const apiKey = '6c64698dc5c9adcc83b19e5baf735ed3'; // Replace with your OpenWeatherMap API key
    const city = document.getElementById('cityInput').value;

    if (!city) {
        alert('Please enter a city.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherDataContainer = document.getElementById('weatherData');
    weatherDataContainer.innerHTML = '';

    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    let weatherImage;

    // Choose an image based on temperature and weather condition
    if (temperature > 30) {
        weatherImage = 'hot-sun-image.jpg';
    } else if (temperature > 20) {
        weatherImage = 'warm-sun-image.jpg';
    } else {
        weatherImage = 'cool-weather-image.jpg';
    }

    const weatherHTML = `
        <div class="weather-card">
            <h2>Current Weather Data</h2>
            <div class="weather-details">
                <h3>${cityName}</h3>
                <p>Temperature: ${temperature} &deg;C</p>
                <p>Weather: ${weatherDescription}</p>
                <img src="${weatherImage}" alt="Weather Image">
            </div>
        </div>
    `;

    weatherDataContainer.innerHTML = weatherHTML;
}

