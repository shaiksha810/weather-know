

import { useState, useEffect } from "react";

const useWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const api_key = "6c858c359e6edb1831f087486412a0ba"

  // Fetch using city
  const fetchWeather = async () => {
    if (!city) return setError("Enter city name");

    setLoading(true);
    setError(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${api_key}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) throw new Error(data.message);

      setWeather(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // 🔥 Fetch weather using GPS coordinates
  const fetchByLocation = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) throw new Error(data.message);

      setWeather(data);
      setCity(data.name); // also fill input with location
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // 🚀 Detect location on app start
  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchByLocation(latitude, longitude);
        },
        () => {
          setLoading(false);
          setError("Location access denied. Search manually.");
        }
      );
    }
  }, []);

  return { city, setCity, weather, loading, error, fetchWeather };
};

export default useWeather;
