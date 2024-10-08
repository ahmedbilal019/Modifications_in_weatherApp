import React, { useEffect, useState } from "react";
import "../App.css";
import searchIcon from "../searchIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../weatherSlice"; // Import the async action

export default function Card() {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState("");

  // Get weather data, loading, and error state from Redux store
  const { data, loading, error } = useSelector((state) => state.weather);

  // Fetch weather data when cityName changes
  const handleSearch = () => {
    if (cityName) {
      dispatch(fetchWeather(cityName)); // Dispatch the action to fetch weather
    }
  };

  useEffect(() => {
    // Fetch default weather for "Attock" on component mount
    dispatch(fetchWeather("Attock"));
  }, [dispatch]);

  const handleChangeInput = (e) => {
    setCityName(e.target.value);
  };
  useEffect(() => {
    if (error) {
      alert("city name not found. please write city name correctly");
    }
  }, [error]);

  // Data formatting
  const temperature = data?.main ? (data.main.temp - 273.15).toFixed(2) : null;
  const weatherIconUrl = data?.weather
    ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : null;

  return (
    <div className="card">
      <div className="header">
        <input
          type="text"
          name="searchbar"
          className="search-field"
          id="search"
          placeholder="Enter City name..."
          onChange={handleChangeInput}
          value={cityName}
        />
        <button className="searchbtn" onClick={handleSearch}>
          <img src={searchIcon} alt="Search Icon" className="searchIcon" />
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {data && (
        <div className="card-data">
          <h2 className="city">{data.name}</h2>
          <div className="temperature">
            <figure>
              <img src={weatherIconUrl} alt="icon" className="weather-logo" />
              <figcaption>{data.weather?.[0]?.description}</figcaption>
            </figure>
            <p className="temp">{temperature}&deg;C</p>
          </div>
          <div className="moreDetail">
            <div className="humidity">Humidity: {data.main?.humidity}%</div>
            <div className="windspeed">Wind Speed: {data.wind?.speed}m/s</div>
            <div className="pressure">Pressure: {data.main?.pressure} hPa</div>
          </div>
        </div>
      )}
    </div>
  );
}
