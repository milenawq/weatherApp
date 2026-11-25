const weatherDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snowfall',
    73: 'Moderate snowfall',
    75: 'Heavy snowfall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    97: 'Heavy thunderstorm',
    99: 'Thunderstorm with heavy hail'
};

function WeatherCard({ weather, cityName, coordinates }) {
    if (!weather) return null;

    const weatherDescription =
        weatherDescriptions[weather.weathercode] || 'Unknown weather';

    return (
        <div className="weather-card">
            <h2>{cityName}</h2>

            <div className="temperature">
                {weather.temperature}°C
            </div>

            <h3>Current weather</h3>

            <div className="weather-info">
                <p>
                    Wind speed: <strong>{weather.windspeed} km/h</strong>
                </p>

                <p>
                    Wind direction: <strong>{weather.winddirection}°</strong>
                </p>

                <p>
                    Weather: <strong>{weatherDescription}</strong>
                </p>
            </div>

            <p className="coordinates">
                Latitude: {coordinates.latitude.toFixed(2)},
                Longitude: {coordinates.longitude.toFixed(2)}
            </p>
        </div>
    );
}

export default WeatherCard;

