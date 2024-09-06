import React, { useState } from 'react';
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
      setError("Erreur de communication avec le serveur. Veuillez réessayer.");
      setWeatherData(null);
    }
  };

  console.log(weatherData)

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
      <div className="px-5 mt-1 flex flex-col">
        <form onSubmit={handleSearchSubmit}>
          <label htmlFor="search" className="mb-2 text-lg">Rechercher</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={search}
              onChange={handleSearchChange}
              className="p-3 pl-5 pr-10 rounded-full w-full text-black"
              placeholder="Rechercher une ville, un pays..."
            />
            <span className="absolute right-3 top-3 text-black">
              <FaSearch size={20} />
            </span>
          </div>
        </form>
      </div>

      {/* Affichage des données météo */}
      <div className="flex flex-col items-center text-white p-6 rounded-lg space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {weatherData && (
          <>
            <img src={weatherData.icon} alt="Icône du temps clair" className="size-44" />
            {/* Température */}
            <p className="text-4xl font-bold">{weatherData.temp}°C</p>

            {/* Ville */}
            <p className="text-xl">{weatherData.city}, {weatherData.country}</p>
            {/* Heure du lever de soleil */}
            <div className="flex items-center space-x-2">
              <FiSunrise className="w-6 h-6" />
              <p className="text-lg">
                {moment.unix(weatherData.sunrise).utcOffset(weatherData.timezone / 60).format('HH:mm')}
              </p>
            </div>
            {/* Heure du coucher du soleil */}
            <div className="flex items-center space-x-2">
              <FiSunset className='w-6 h-6' />
              <p className='text-lg'>
                {moment.unix(weatherData.sunset).utcOffset(weatherData.timezone / 60).format('HH:mm')}
              </p>
            </div>
            {/* Visibilité */}
            <div className='flex items-center space-x-2'>
              <MdOutlineVisibility className='w-6 h-6' />
              <p className='text-lg'>{(weatherData.visibility / 1000).toFixed(1)} km</p>
            </div>
            {/* Humidité */}
            <div className="flex items-center space-x-2">
              <img src={humidity_icon} alt="IconHumidity" className="w-6 h-6" />
              <div className="flex flex-col items-start">
                <p className="text-lg">{weatherData.humidity}%</p>
              </div>
            </div>

            {/* Vitesse du vent */}
            <div className="flex items-center space-x-2">
              <img src={wind_icon} alt="IconWind" className="w-6 h-6" />
              <div className="flex flex-col items-start">
                <p className="text-lg">{weatherData.wind} km/h</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
