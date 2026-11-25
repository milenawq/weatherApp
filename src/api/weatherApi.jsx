export const fetchGeocoding = async (cityName) => {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch city data');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error('City not found');
    }

    return {
        name: data.results[0].name,
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude
    };
};

export const fetchWeather = async ({ latitude, longitude }) => {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch weather');
    }

    const data = await response.json();

    return data.current_weather;
};
