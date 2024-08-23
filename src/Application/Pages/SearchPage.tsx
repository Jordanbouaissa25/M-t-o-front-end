import React, { useState } from 'react';
import { FiAlignJustify, FiSunrise, FiSunset } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { Footer } from "../../Components/footer";
import humidity_icon from '../../assets/humidity.png';
import clear_icon from '../../assets/clear.png';
import wind_icon from '../../assets/wind.png';
import { http } from '../../Infrastructure/Http/Axios.Instance';

const API_KEY = '91fbde8f0b5ad7adc0d2262673e3bd6c'; // Remplacez par votre propre clé API

// Définition des types pour les données météo
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  wind: {
    speed: number;
  };
}

export const SearchPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    try {
      const response = await http.post('/weather', {
        city: search,
        appid: API_KEY,
        units: 'metric',
        lang: 'fr',
      });
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Ville non trouvée. Veuillez réessayer.");
      setWeatherData(null);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeatherData();
  };

   return (
    <div className="flex flex-col min-h-screen justify-between bg-[#2D2C5A] text-white">
      <header className="flex justify-between items-center p-5 bg-[#2D2C5A]">
        <div className="flex items-center">
          <img src="../../public/logo.png" alt="Logo météo" className="h-10" />
          <p className='ml-4 text-white'>Météo</p>
        </div>
        <NavLink to="/Menu" className="text-[#FEBF2C]">
          <FiAlignJustify size={24} />
        </NavLink>
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
            <img src={clear_icon} alt="Icône du temps clair" className="" />

            {/* Température */}
            <p className="text-4xl font-bold">{weatherData.main.temp}°C</p>

            {/* Ville */}
            <p className="text-xl">{weatherData.name}</p>

            {/* Heure du lever de soleil */}
            <div className="flex items-center space-x-2">
              <FiSunrise className="w-6 h-6" />
              <p className="text-lg">{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FiSunset className='w-6 h-6' />
              <p className='text-lg'>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className='flex items-center space-x-2'>
              <MdOutlineVisibility className='w-6 h-6' />
              <p className='text-lg'>{(weatherData.visibility / 1000).toFixed(1)} km</p>
            </div>
            {/* Humidité */}
            <div className="flex items-center space-x-2">
              <img src={humidity_icon} alt="IconHumidity" className="w-6 h-6" />
              <div className="flex flex-col items-start">
                <p className="text-lg">{weatherData.main.humidity}%</p>
              </div>
            </div>

            {/* Vitesse du vent */}
            <div className="flex items-center space-x-2">
              <img src={wind_icon} alt="IconWind" className="w-6 h-6" />
              <div className="flex flex-col items-start">
                <p className="text-lg">{weatherData.wind.speed} km/h</p>
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