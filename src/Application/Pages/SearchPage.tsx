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
  pressure: number;
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
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
  };

  const cities = [
    "Paris",
    "Marseille",
    "Audincourt",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Montpellier",
    "Strasbourg",
    "Bordeaux",
    "Lille",
    "Abu Dhabi", // Émirats Arabes Unis
    "Accra", // Ghana
    "Addis-Abeba", // Éthiopie
    "Alger", // Algérie
    "Amman", // Jordanie
    "Amsterdam", // Pays-Bas
    "Andorre-la-Vieille", // Andorre
    "Athènes", // Grèce
    "Besançon",
    "Belfort",
    "Bagdad", // Irak
    "Baku", // Azerbaïdjan
    "Bamako", // Mali
    "Bangkok", // Thaïlande
    "Banjul", // Gambie
    "Basseterre", // Saint-Christophe-et-Niévès
    "Beijing", // Chine
    "Belgrade", // Serbie
    "Berlin", // Allemagne
    "Bern", // Suisse
    "Bissau", // Guinée-Bissau
    "Bogotá", // Colombie
    "Brasilia", // Brésil
    "Bratislava", // Slovaquie
    "Brazzaville", // Congo-Brazzaville
    "Bruxelles", // Belgique
    "Bucarest", // Roumanie
    "Buenos Aires", // Argentine
    "Le Caire", // Égypte
    "Canberra", // Australie
    "Caracas", // Venezuela
    "Castries", // Sainte-Lucie
    "Colombo", // Sri Lanka
    "Conakry", // Guinée
    "Damas", // Syrie
    "Dhaka", // Bangladesh
    "Dili", // Timor oriental
    "Djibouti", // Djibouti
    "Dodoma", // Tanzanie
    "Dushanbé", // Tadjikistan
    "Erevan", // Arménie
    "Helsinki", // Finlande
    "Islamabad", // Pakistan
    "Jakarta", // Indonésie
    "Juba", // Soudan du Sud
    "Kampala", // Ouganda
    "Katmandou", // Népal
    "Kigali", // Rwanda
    "Kinshasa", // Congo-Kinshasa
    "Kuala Lumpur", // Malaisie
    "Kuwait", // Koweït
    "Libreville", // Gabon
    "Lima", // Pérou
    "Lisbonne", // Portugal
    "Ljubljana", // Slovénie
    "Londres", // Royaume-Uni
    "Luanda", // Angola
    "Lusaka", // Zambie
    "Madrid", // Espagne
    "Malabo", // Guinée équatoriale
    "Manille", // Philippines
    "Minsk", // Biélorussie
    "Moscou", // Russie
    "Monrovia", // Libéria
    "Montbéliard",
    "Montevideo", // Uruguay
    "Moroni", // Comores
    "Mulhouse",
    "Nairobi", // Kenya
    "Nassau", // Bahamas
    "Ngerulmud", // Palau
    "Niamey", // Niger
    "Nicosie", // Chypre
    "Nouakchott", // Mauritanie
    "Ouagadougou", // Burkina Faso
    "Port-au-Prince", // Haïti
    "Port Moresby", // Papouasie-Nouvelle-Guinée
    "Prague", // République tchèque
    "Rabat", // Maroc
    "Réunion", // Réunion
    "Riga", // Lettonie
    "Rome", // Italie
    "San Salvador", // Salvador
    "Sanaa", // Yémen
    "São Tomé", // São Tomé-et-Principe
    "Sarajevo", // Bosnie-Herzégovine
    "Tbilissi", // Géorgie
    "Téhéran", // Iran
    "Tirana", // Albanie
    "Tokyo", // Japon
    "Tripoli", // Libye
    "Tunis", // Tunisie
    "Ulaanbaatar", // Mongolie
    "Vaduz", // Liechtenstein
    "Valparaíso", // Chili
    "Varsovie", // Pologne
    "Vienne", // Autriche
    "Vilnius", // Lituanie
    "Washington D.C.", // États-Unis
    "Wellington", // Nouvelle-Zélande
    "Zagreb", // Croatie
    "Zurich", // Suisse
    "Asunción", // Paraguay
    "Honiara", // Îles Salomon
    "Kingston", // Jamaïque
    "Lima", // Pérou
    "Malabo", // Guinée équatoriale
    "Managua", // Nicaragua
    "Maseru", // Lesotho
    "Mogadiscio", // Somalie
    "Port Moresby", // Papouasie-Nouvelle-Guinée
    "San Salvador", // Salvador
    "Tegucigalpa", // Honduras
    "Tbilissi", // Géorgie
    "Yamoussoukro", // Côte d'Ivoire
    "Zagreb", // Croatie
    "Zurich", // Suisse
     "New York", // États-Unis
  "Los Angeles", // États-Unis
  "Chicago", // États-Unis
  "Houston", // États-Unis
  "Philadelphia", // États-Unis
  "San Antonio", // États-Unis
  "San Diego", // États-Unis
  "Dallas", // États-Unis
  "San Jose", // États-Unis
  "Toronto", // Canada
  "Montreal", // Canada
  "Vancouver", // Canada
  "Calgary", // Canada
  "Edmonton", // Canada
  "London", // Royaume-Uni
  "Birmingham", // Royaume-Uni
  "Manchester", // Royaume-Uni
  "Glasgow", // Royaume-Uni
  "Liverpool", // Royaume-Uni
  "Edinburgh", // Royaume-Uni
  "Belfast", // Royaume-Uni
  "Madrid", // Espagne
  "Barcelona", // Espagne
  "Valence", // Espagne
  "Seville", // Espagne
  "Zaragoza", // Espagne
  "Málaga", // Espagne
  "Las Palmas", // Espagne
  "Granada", // Espagne
  "Lisbon", // Portugal
  "Porto", // Portugal
  "Rome", // Italie
  "Milan", // Italie
  "Naples", // Italie
  "Turin", // Italie
  "Palermo", // Italie
  "Genoa", // Italie
  "Venice", // Italie
  "Athens", // Grèce
  "Thessaloniki", // Grèce
  "Istanbul", // Turquie
  "Ankara", // Turquie
  "Izmir", // Turquie
  "Dubai", // Émirats Arabes Unis
  "Abu Dhabi", // Émirats Arabes Unis
  "Riyadh", // Arabie Saoudite
  "Jeddah", // Arabie Saoudite
  "Cairo", // Égypte
  "Alexandria", // Égypte
  "Hurghada",
  "Assouan",
  "Luxor",
  "Phuket",
  "Pékin",
  "Cape Town", // Afrique du Sud
  "Johannesburg", // Afrique du Sud
  "Nairobi", // Kenya
  "Lagos", // Nigéria
  "Abuja", // Nigéria
  "Kinshasa", // République Démocratique du Congo
  "Luanda", // Angola
  "Sao Paulo", // Brésil
  "Rio de Janeiro", // Brésil
  "Brasilia", // Brésil
  "Belo Horizonte", // Brésil
  "Porto Alegre", // Brésil
  "Buenos Aires", // Argentine
  "Córdoba", // Argentine
  "Rosario", // Argentine
  "Santiago", // Chili
  "Valparaíso", // Chili
  "Montevideo", // Uruguay
  "Asunción", // Paraguay
  "Bogotá", // Colombie
  "Medellín", // Colombie
  "Quito", // Équateur
  "Lima", // Pérou
  "Caracas", // Venezuela
  "San Juan", // Porto Rico
  "Mexico City", // Mexique
  "Guadalajara", // Mexique
  "Monterrey", // Mexique
  "Toronto", // Canada
  "Vancouver", // Canada
  "Calgary", // Canada
  "Edmonton", // Canada
  "Sydney", // Australie
  "Melbourne", // Australie
  "Brisbane", // Australie
  "Perth", // Australie
  "Adelaide", // Australie
  "Wellington", // Nouvelle-Zélande
  "Auckland", // Nouvelle-Zélande
  "Helsinki", // Finlande
  "Stockholm", // Suède
  "Oslo", // Norvège
  "Copenhague", // Danemark
  "Reykjavik", // Islande
  "Dublin", // Irlande
  "Bruxelles", // Belgique
  "Amsterdam", // Pays-Bas
  "Zurich", // Suisse
  "Geneva", // Suisse
  "Vienna", // Autriche
  "Budapest", // Hongrie
  "Prague", // République Tchèque
  "Warsaw", // Pologne
  "Kiev", // Ukraine
  "Minsk", // Biélorussie
  "Chisinau", // Moldavie
  "Bucharest", // Roumanie
  "Sofia", // Bulgarie
  "Belgrade", // Serbie
  "Sarajevo", // Bosnie-Herzégovine
  "Zagreb", // Croatie
  "Ljubljana", // Slovénie
  "Bratislava", // Slovaquie
  "Sofia", // Bulgarie
  "Vilnius", // Lituanie
  "Riga", // Lettonie
  "Tallinn", // Estonie
  "Belgrade", // Serbie
  "Podgorica", // Monténégro
  "Tirana", // Albanie
  "Skopje", // Macédoine du Nord
  "Yerevan", // Arménie
  "Tbilisi", // Géorgie
  "Baku", // Azerbaïdjan
  "Ashgabat", // Turkménistan
  "Dushanbe", // Tadjikistan
  "Islamabad", // Pakistan
  "Kabul", // Afghanistan
  "Tehran", // Iran
  "Damascus", // Syrie
  "Beirut", // Liban
  "Riyadh", // Arabie Saoudite
  "Jeddah", // Arabie Saoudite
  "Abu Dhabi", // Émirats Arabes Unis
  "Doha", // Qatar
  "Manama", // Bahreïn
  "Kuwait City", // Koweït
  "Muscat", // Oman
  "Sanaa", // Yémen
  "Hanoi", // Vietnam
  "Ho Chi Minh Ville", // Vietnam
  "Bangkok", // Thaïlande
  "Manila", // Philippines
  "Kuala Lumpur", // Malaisie
  "Singapore", // Singapour
  "Tokyo", // Japon
  "Seoul", // Corée du Sud
  "Pyongyang", // Corée du Nord
  "Ulaanbaatar", // Mongolie
  "Osaka", // Japon
  "Nagoya", // Japon
  "Kyoto", // Japon
  "Fukuoka", // Japon
  "Hiroshima", // Japon
  "Hokkaido", // Japon
  "Seoul", // Corée du Sud
  "Busan", // Corée du Sud
  "Incheon", // Corée du Sud
  "Gwangju", // Corée du Sud
  "Daejeon", // Corée du Sud
  "Helsinki", // Finlande
  "Stockholm", // Suède
  "Oslo", // Norvège
  "Copenhague", // Danemark
  "Reykjavik", // Islande
  ];

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
      setError("Ville non trouvée, veuillez réessayer.");
      setWeatherData(null);
    }
  };

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
    const query = e.target.value;
    setSearch(query);

    // Générer des suggestions basées sur les villes
    if (query) {
      setSuggestions(cities.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeatherData(search);
    setSuggestions([]); // Efface les suggestions après la soumission
  };

  const handleSuggestionClick = (city: string) => {
    setSearch(city);
    fetchWeatherData(city);
    setSuggestions([]); // Efface les suggestions après la sélection
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#2D2C5A] text-white">
      <header className="flex justify-between items-center p-5 bg-[#2D2C5A]">
        <div className="flex items-center">
          <img src="../../public/logo.png" alt="Logo météo" className="h-10" />
          <p className="ml-4 text-white">WorldWeather</p>
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
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white text-black rounded-lg mt-1">
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(city)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
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
