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

  const fetchWeatherData = async (city: string) => {
    try {
      console.log(`Recherche des données météo pour la ville: ${city}`);
      const response = await http.post(`/weather?city=${city}`);
      console.log('Réponse complète de l\'API :', response);

      if (response.data && response.data.city) {
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
            <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Icône du temps clair" className="size-44" />
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
