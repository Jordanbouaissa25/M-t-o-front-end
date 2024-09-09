import React, { useState, useEffect } from 'react';
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import { Footer } from "../../Components/footer";
import humidity_icon from '../../assets/humidity.png';
import wind_icon from '../../assets/wind.png';
import { http } from '../../Infrastructure/Http/Axios.Instance';
import moment from 'moment';
import 'moment-timezone';
import clear_icon from '../../assets/clear.png'
import cloud_icon from '../../assets/cloud.png'
import drizzle_icon from '../../assets/drizzle.png'
import snow_icon from '../../assets/snow.png'
import darkcloud_icon from '../../assets/dark-cloud.png'
import rain2_icon from '../../assets/rain2.png'
import storm_icon from '../../assets/storm.png'
import cloud2_icon from '../../assets/cloud2.png'
import mist_icon from '../../assets/mist.png'
import drizzle_night_icon from '../../assets/drizzle_night.png'
import cloud_night_icon from '../../assets/cloud_night.png'
import clear_night_icon from '../../assets/clear_night.png'

// Définition des types pour les données météo
interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  sunrise: number;
  sunset: number;
  visibility: number;
  wind: number;
  description: string;
  icon: string;
  country: string;
  timezone: number;
  pressure: number
}

// Ajouter un interceptor pour inclure le token dans chaque requête
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const SearchPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tempUnit, setTempUnit] = useState<string>('°C'); 
  const [windUnit, setWindUnit] = useState<string>('km/h'); 

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_night_icon,
    "02d": cloud_icon,
    "02n": cloud_night_icon,
    "03d": cloud2_icon,
    "03n": cloud2_icon,
    "04d": darkcloud_icon,
    "04n": darkcloud_icon,
    "09d": rain2_icon,
    "09n": rain2_icon,
    "10d": drizzle_icon,
    "10n": drizzle_night_icon,
    "11d": storm_icon,
    "11n": storm_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon
  }

  const fetchWeatherData = async (city: string) => {
    try {
      console.log(`Recherche des données météo pour la ville: ${city}`);
      const response = await http.post(`/weather?city=${city}`);
      console.log('Réponse complète de l\'API :', response);

      if (response.data && response.data.city) {
        const iconKey = response.data.icon as keyof typeof allIcons;

        // Vérifie que l'icône existe dans allIcons
        if (iconKey in allIcons) {
          response.data.icon = allIcons[iconKey];
        } else {
          response.data.icon = clear_icon; // Utilise une icône par défaut si l'icône est manquante
        }

        setWeatherData(response.data);
        setError(null);
      } else {
        setError("Ville non trouvée. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Erreur lors de l'appel au backend :", err);
      setError("Ville non trouvé, veuillez réessayer.");
      setWeatherData(null);
    }
  };

  console.log(weatherData)

  const fetchSettings = async () => {
    try {
      const user_id = localStorage.getItem("userId");
      if (!user_id) return;

      const response = await http.get(`/setting/${user_id}`);
      if (response.status === 200) {
        setTempUnit(response.data.setting_temperature);
        setWindUnit(response.data.setting_wind);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des paramètres :", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);
   
  const convertTemperature = (temp: number, unit: string) => {
  const convertedTemp = unit === '°F' ? (temp * 9) / 5 + 32 : temp;
  return Math.round(convertedTemp);
};

  const convertWindSpeed = (wind: number, unit: string) => {
    const convertedWind = unit === 'mi/h' ? wind / 1.609 : wind;
    return Math.round(convertedWind);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeatherData(search);
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#2D2C5A] text-white">
      <header className="flex justify-between items-center p-5 bg-[#2D2C5A]">
        <div className="flex items-center">
          <img src="../../public/logo.png" alt="Logo météo" className="h-10" />
          <p className="ml-4 text-white">Météo</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-white h-6 w-6 hover:text-blue-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white h-6 w-6 hover:text-pink-500" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white h-6 w-6 hover:text-blue-600" />
          </a>
        </div>
      </header>

      {/* Barre de recherche */}
      <div className="px-5 mt-1 flex flex-col lg:items-center">
        <form onSubmit={handleSearchSubmit}>
          <label htmlFor="search" className="mb-2 text-lg">Rechercher</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={search}
              onChange={handleSearchChange}
              className="p-3 pl-5 pr-10 rounded-full w-full lg:w-[350px] text-black"
              placeholder="Rechercher une ville, un pays..."
            />
            <span className="absolute right-3 top-3 text-black">
              <FaSearch size={20} />
            </span>
          </div>
        </form>
      </div>

      {/* Affichage des données météo */}
      <div className="flex flex-col items-center text-white bg-transparent p-6 rounded-lg space-y-4 max-w-lg mx-auto mt-10">
        {error && <p className="text-red-500">{error}</p>}
        {weatherData && (
          <>
            {/* Ville */}
            <div className="flex justify-between w-full">
              <div>
                <p className="text-lg font-semibold">{weatherData.city}, {weatherData.country}</p>
                <p className="text-sm text-gray-500">{weatherData.description}</p>
              </div>
              <img src={weatherData.icon} alt="Icône du temps clair" className="h-16 w-16" />
            </div>

            {/* Température */}
            <p className="text-5xl font-bold">
              {convertTemperature(weatherData.temp, tempUnit)}{tempUnit}
            </p>

            {/* Informations supplémentaires */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Humidité */}
              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="text-lg font-semibold">{weatherData.humidity}%</p>
              </div>

              {/* Vitesse du vent */}
              <div>
                <p className="text-sm text-gray-500">Wind Speed</p>
                <p className="text-lg font-semibold">{convertWindSpeed(weatherData.wind, windUnit)} {windUnit}</p>
              </div>

              {/* Pression */}
              <div>
                <p className="text-sm text-gray-500">Pressure</p>
                <p className="text-lg font-semibold">{weatherData.pressure} hPa</p>
              </div>
            </div>

            {/* Heure du lever et coucher du soleil */}
            <div className="flex flex-col space-y-2 mt-4">
              <div className="flex items-center space-x-2">
                <FiSunrise className="w-6 h-6 text-yellow-500" />
                <p className="text-lg">
                  {moment.unix(weatherData.sunrise).utcOffset(weatherData.timezone / 60).format('HH:mm')}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <FiSunset className="w-6 h-6 text-orange-500" />
                <p className="text-lg">
                  {moment.unix(weatherData.sunset).utcOffset(weatherData.timezone / 60).format('HH:mm')}
                </p>
              </div>
            </div>

            {/* Visibilité */}
            <div className="flex items-center space-x-2">
              <MdOutlineVisibility className="w-6 h-6" />
              <p className="text-lg">{(weatherData.visibility / 1000).toFixed(1)} km</p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
