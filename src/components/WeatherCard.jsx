import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wind, Droplets, Eye, ThermometerSun } from "lucide-react";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const temp = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  const humidity = weatherData.main.humidity;
  const wind = weatherData.wind.speed;
  const visibility = weatherData.visibility / 1000; // convert to km
  const description = weatherData.weather[0].description;

  return (
    <Card
      className="max-w-md mx-auto mt-8 shadow-xl rounded-2xl 
  border border-white/30 
  bg-white/10 backdrop-blur-md
  bg-gradient-to-br from-blue-200/30 to-blue-400/20
  dark:from-slate-900/30 dark:to-slate-800/20 transition"
    >
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold text-black dark:text-blue-300">
          {temp}°C
        </CardTitle>
        <CardDescription className="capitalize text-lg font-medium text-white">
          {description}
        </CardDescription>
        <p className=" dark:text-gray-400 text-sm text-white">
          {weatherData.name}, {weatherData.sys.country}
        </p>
      </CardHeader>

      <Separator />

      <CardContent className="grid grid-cols-2 gap-6 mt-4 mb-4">
        <div className="flex items-center gap-3">
          <ThermometerSun className="text-orange-500" size={22} />
          <div>
            <p className="text-xs text-yellow-500">Feels Like</p>
            <p className="font-semibold">{feelsLike}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Droplets className="text-blue-500" size={22} />
          <div>
            <p className="text-xs text-yellow-500">Humidity</p>
            <p className="font-semibold">{humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Wind className="text-sky-500" size={22} />
          <div>
            <p className="text-xs text-yellow-500">Wind Speed</p>
            <p className="font-semibold">{wind} m/s</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Eye className="text-purple-500" size={22} />
          <div>
            <p className="text-xs  text-yellow-500">Visibility</p>
            <p className="font-semibold">{visibility} km</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
