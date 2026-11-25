function SearchPanel({
    searchMode,
    setSearchMode,
    cityInput,
    setCityInput,
    coordsInput,
    setCoordsInput,
    onSearch
}) {
    return (
        <div className="search-panel">

            <div className="search-modes">
                <button className={searchMode === 'city' ? 'active' : ''} onClick={() => setSearchMode('city')} >
                    Search by city
                </button>

                <button className={searchMode === 'coordinates' ? 'active' : ''} onClick={() => setSearchMode('coordinates')} >
                    Search by coordinates
                </button>
            </div>

            <form onSubmit={onSearch}>

                {searchMode === 'city' ? (
                    <input
                        type="text"
                        placeholder="Enter city name..."
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                    />
                ) : (
                    <div className="coordinates-inputs">
                        <input
                            type="number"
                            step="any"
                            placeholder="Latitude"
                            value={coordsInput.lat}
                            onChange={(e) =>
                                setCoordsInput({
                                    ...coordsInput,
                                    lat: e.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            step="any"
                            placeholder="Longitude"
                            value={coordsInput.long}
                            onChange={(e) =>
                                setCoordsInput({
                                    ...coordsInput,
                                    long: e.target.value
                                })
                            }
                        />
                    </div>
                )}

                <button type="submit">Search</button>

            </form>
        </div>
    );
}

export default SearchPanel;
