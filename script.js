function scrollToEnd() {
    
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}
function searchWeather() {
    const apiKey = '6c64698dc5c9adcc83b19e5baf735ed3'; 
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
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const country = data.sys.country;

    

    // Choose an image based on temperature and weather condition
    let weatherImage;
    if (temperature > 295) {
        weatherImage = 'Image/sunny.png';
    } else if (temperature > 293) {
        weatherImage = 'Image/rainy.png';
        
    }
    else if (temperature > 20) {
        weatherImage = 'Image/cold.jfif';
    }

    const imgElement = document.createElement('img');
imgElement.src = weatherImage;
imgElement.alt = 'Weather Image';
imgElement.style.maxWidth = '50%'; // Adjust based on your preference
imgElement.style.height = 'auto'; // Maintain aspect ratio

// Append the image to the document or a specific container
document.getElementById('weatherData').appendChild(imgElement); 
    const weatherHTML = `
        <div class="weather-card">
            <h2>Current Weather Data</h2>
            <div class="weather-details">
                <h3>${cityName}, ${country}</h3>
                <p>Temperature: ${temperature} &deg;F</p>
                <p>Weather: ${weatherDescription}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <img src="${weatherImage}" alt="Weather Image">
            </div>
        </div>
    `;

    weatherDataContainer.innerHTML = weatherHTML;
}

function searchWeather2() {
    const apiKey = '6c64698dc5c9adcc83b19e5baf735ed3'; 
    const city = document.getElementById('cityInput2').value;

    if (!city) {
        alert('Please enter a city.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayForecastDetails(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Error fetching forecast data. Please try again.');
        });
}

function displayForecastDetails(data) {
    console.log(data); // Output the entire data to the console for inspection

    const forecastDataContainer = document.getElementById('weatherData2');
    forecastDataContainer.innerHTML = '';

    const cityName = data.city.name;
    const country = data.city.country;

    const forecastList = data.list;

    forecastList.forEach(item => {
        const forecastTime = new Date(item.dt * 1000);
        const temperature = item.main.temp;
        const weatherDescription = item.weather[0].description;
        const humidity = item.main.humidity;
        const windSpeed = item.wind.speed;
        const cloudiness = item.clouds.all;

        // Choose an image based on temperature
        let weatherImage;
        if (temperature > 295) {
            weatherImage = 'Image/sunny.png';
        } else if (temperature > 293) {
            weatherImage = 'Image/rainy.png';
            
        }
        else if (temperature > 20) {
            weatherImage = 'Image/cold.jfif';
        }

        const forecastHTML = `
            <div class="forecast-card">
                <img src="${weatherImage}" alt="Weather Image" class="weather-image">
                <h3>${formatTime(forecastTime)}</h3>
                <p>Temperature: ${temperature} &deg;F</p>
                <p>Weather: ${weatherDescription}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Cloudiness: ${cloudiness}%</p>
            </div>
        `;

        forecastDataContainer.innerHTML += forecastHTML;
    });
}

function formatTime(date) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' };
    return date.toLocaleTimeString('en-US', options);
}
