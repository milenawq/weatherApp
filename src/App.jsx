import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGeocoding, fetchWeather } from './api/weatherApi';
import SearchPanel from './components/SearchPanel';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
    const [searchMode, setSearchMode] = useState('city');

    const [cityInput, setCityInput] = useState('');

    const [coordsInput, setCoordsInput] = useState({
        lat: '',
        long: ''
    });

    const [targetCity, setTargetCity] = useState(null);

    const [coordinates, setCoordinates] = useState(null);

    const [cityName, setCityName] = useState('');

    const [error, setError] = useState('');

    const cityQuery = useQuery({
        queryKey: ['city', targetCity],
        queryFn: () => fetchGeocoding(targetCity),
        enabled: targetCity !== null,
        retry: false
    });

    const activeCoordinates = cityQuery.data ? 
        {
            latitude: cityQuery.data.latitude,
            longitude: cityQuery.data.longitude
        } : coordinates;

    const activeCityName = cityQuery.data?.name || cityName;

    const weatherQuery = useQuery({
        queryKey: ['weather', activeCoordinates],
        queryFn: () => fetchWeather(activeCoordinates),
        enabled: activeCoordinates !== null && (!targetCity || cityQuery.data !== undefined),
        retry: false
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');

        if (searchMode === 'city') {
            if (!cityInput.trim()) {
                setError('Enter a city name');
                return;
            }

            setTargetCity(cityInput.trim());
        } else {
            const latitude = Number(coordsInput.lat);
            const longitude = Number(coordsInput.long);

            if (coordsInput.lat === '' || coordsInput.long === '') {
                setError('Enter both coordinates');
                return;
            }

            if (
                !Number.isFinite(latitude) ||
                !Number.isFinite(longitude) ||
                latitude < -90 ||
                latitude > 90 ||
                longitude < -180 ||
                longitude > 180
            ) {
                setError('Enter valid coordinates');
                return;
            }

            setTargetCity(null);

            setCoordinates({
                latitude,
                longitude
            });

            setCityName('Selected location');
        }
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>

            <SearchPanel
                searchMode={searchMode}
                setSearchMode={setSearchMode}
                cityInput={cityInput}
                setCityInput={setCityInput}
                coordsInput={coordsInput}
                setCoordsInput={setCoordsInput}
                onSearch={handleSearch}
            />

            {error && <p className="error">{error}</p>}

            {cityQuery.isLoading && <p>Searching city...</p>}

            {cityQuery.isError && (
                <p className="error">{cityQuery.error.message}</p>
            )}

            {weatherQuery.isLoading && <p>Loading weather...</p>}

            {weatherQuery.isError && (
                <p className="error">Failed to load weather</p>
            )}

            {weatherQuery.data && !cityQuery.isLoading && !cityQuery.isError && (
                <WeatherCard
                    weather={weatherQuery.data}
                    cityName={activeCityName}
                    coordinates={activeCoordinates}
                />
            )}
        </div>
    );
}

export default App;
