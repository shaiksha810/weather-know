import { useState, useEffect } from "react";

const useWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

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

      setWeather(data);    // ⬅ FIXED
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // Fetch by GPS
  const fetchByLocation = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) throw new Error(data.message);

      setWeather(data);
      setCity(data.name);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // Detect GPS location on page load
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

  // Fetch random background images
  useEffect(() => {
    fetch(`https://api.pexels.com/v1/search?query=weather&per_page=5`, {
      headers: {
        Authorization: import.meta.env.VITE_IMAGE_API_KEY,
      },
    })
      .then(res => res.json())
      .then(data => {
        setImages(data.photos.map(photo => photo.src.landscape)); // ⬅ FIXED
      });
  }, []);

  // console.log(images);

  return {
    city,
    setCity,
    weather,
    loading,
    error,
    fetchWeather,
    fetchByLocation, // ⬅ exposed
    images,
  };
};

export default useWeather;
