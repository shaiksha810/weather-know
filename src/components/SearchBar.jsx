import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TbCloudSearch } from "react-icons/tb";
import useWeather from "@/hooks/useWeather";
import WeatherCard from "./WeatherCard";

const SearchBar = () => {
  const { city, setCity, weather, loading, error, fetchWeather, images } = useWeather();
  const [bgImage, setBgImage] = useState(null);

  // Choose one random image when images finish loading
  useEffect(() => {
    if (images.length > 0) {
      const random = images[Math.floor(Math.random() * images.length)];
      setBgImage(random);
    }
  }, [images]);

  return (
    <div className="relative max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-500]"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
        }}
      />

      {/* Blur + dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 p-6 space-y-4 text-white">
        <h1 className="text-center font-bold text-2xl tracking-wide drop-shadow">
          🌤 Weather Forecast
        </h1>

        <div className="flex gap-2">
          <Input
            placeholder="Enter city..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className="text-md bg-white/70 text-black focus:bg-white transition"
          />

          <Button
            onClick={fetchWeather}
            disabled={loading || !city}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 font-semibold"
          >
            {loading ? "Loading..." : <TbCloudSearch className="text-xl" />}
          </Button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-300 text-sm text-center bg-red-900/40 py-1 rounded-md font-medium">
            {error}
          </p>
        )}

        {/* Weather Info */}
        {weather && (
          <div className="animate-in fade-in zoom-in-50 duration-300">
            <WeatherCard weatherData={weather} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
