import React, { useState, ChangeEvent, useEffect } from "react";
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import {useNavigate } from "react-router-dom";
import {Footer} from "../../Components/footer"
import { http } from "../../Infrastructure/Http/Axios.Instance";

export const SettingsPage: React.FC = () => {
  const [windUnit, setWindUnit] = useState<string>("");
  const [tempUnit, setTempUnit] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [settingID, setSettingId] = useState<string>("")
  const navigate = useNavigate();

   // Fonction pour récupérer les paramètres
  useEffect(() => {
    const fetchSettings = async () => {
      const user_id = localStorage.getItem("userId");
      if (!user_id) {
        setError("Utilisateur non authentifié.");
        setLoading(false);
        navigate("/setting");
        return;
      }

      try {
        console.log(user_id)
        const response = await http.get(`/setting/${user_id}`);
        if (response.status === 200) {
          const tempUnitFromServer = response.data.setting_temperature;
          const windUnitFromServer = response.data.setting_wind
          setSettingId(response.data._id)
          setWindUnit(windUnitFromServer);
          setTempUnit(tempUnitFromServer);
        } else {
          setError("Erreur lors de la récupération des paramètres.");
        }
      } catch (err) {
        console.error("Erreur lors de la requête GET pour les paramètres:", err);
        setError("Impossible de récupérer les paramètres.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [navigate]);

  const handleWindUnitChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
     try {
       const response = await http.put(`/setting/${settingID}`, { setting_wind : event.target.value });

    if (response.status === 200) {  // Modifier pour vérifier un statut 200
      console.log("Modification de l'unité réussie");
      // Si nécessaire, traiter les données de la réponse ici
      //navigate("/"); // Rediriger l'utilisateur après une réinitialisation réussie
    } else {
      console.log("Impossible de modifier l'unité");
    }
  } catch (error) {
    console.error("Erreur lors de la modification de l'unité:", error);
    // Gérer l'affichage d'une erreur à l'utilisateur ici si nécessaire
  }
  };

  const  handleTempUnitChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
    const response = await http.put(`/setting/${settingID}`, { setting_temperature : event.target.value });
    if (response.status === 200) {  // Modifier pour vérifier un statut 200
      console.log("Modification de la température réussie");
      // Si nécessaire, traiter les données de la réponse ici
      //navigate("/"); // Rediriger l'utilisateur après une réinitialisation réussie
    } else {
      console.log("Impossible de modifier la température");
    }
  } catch (error) {
    console.error("Erreur lors de la modification de la température:", error);
    // Gérer l'affichage d'une erreur à l'utilisateur ici si nécessaire
  }
  };

async function reinitialisation(email: string) {
  try {
    const response = await http.put("/user", { email });

    if (response.status === 200) {  // Modifier pour vérifier un statut 200
      console.log("Réinitialisation réussie");
      // Si nécessaire, traiter les données de la réponse ici
      navigate("/"); // Rediriger l'utilisateur après une réinitialisation réussie
    } else {
      console.log("Impossible de réinitialiser le mot de passe");
    }
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    // Gérer l'affichage d'une erreur à l'utilisateur ici si nécessaire
  }
}

  const handleNewEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#2D2C5A] text-white">
      <header className="flex justify-between items-center p-5 bg-[#2D2C5A]">
        <div className="flex items-center">
          <img src="../../public/logo.png" alt="Logo météo" className="h-10" />
          <p className='ml-4 text-white'>Météo</p>
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
        <div className="flex items-center space-x-2">
           <NavLink to='/search' className="text-white">
          <FaSearch size={24} />
        </NavLink>
        </div>
      </header>
      <main className="flex-grow p-8 space-y-6">
        <div className="flex items-center space-x-4">
          <label className="text-lg text-white">Vent :</label>
          <select
            onChange={handleWindUnitChange}
            className="p-2.5 rounded bg-[#4e94ce] text-white"
          >
            <option selected={windUnit==="km/h"} value="km/h">km/h</option>
            <option selected={windUnit==="mi/h"} value="mi/h">mi/h</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-lg text-white">Température :</label>
          <select
            onChange={handleTempUnitChange}
            className="p-2.5 rounded bg-[#4e94ce] text-white"
          >
            <option selected={tempUnit==="°C"} value="°C">°C</option>
            <option selected={tempUnit==="°F"} value="°F">°F</option>
          </select>
        </div>

        <form onSubmit={(e)=>{e.preventDefault();reinitialisation(email)}} className="mt-4 w-full">
          <h3 className="text-lg mb-2 text-white">Modifier adresse mail</h3>
          <input
            type="email"
            value={email}
            onChange={handleNewEmailChange}
            placeholder="Nouvelle adresse mail"
            className="w-full p-2.5 rounded border border-gray-300 text-black bg-white mb-4"
            required
          />
          <button
            type="submit"
            className="p-2.5 bg-[#4e94ce] rounded text-white w-full"
          >
            Modifier adresse mail
          </button>
        </form>

        <form className="mt-4 w-full">
          {/* <h3 className="text-lg mb-2 text-white">Modifier mot de passe</h3> */}
          {/* <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Nouveau mot de passe"
            className="w-full p-2.5 rounded border border-gray-300 text-black bg-white mb-4"
            required
          /> */}
          <NavLink to="/reset">
          <button
            type="submit"
            className="p-2.5 bg-[#4e94ce] rounded text-white w-full"
          >
            Reinitialiser mot de passe
          </button>
          </NavLink>
          
        </form>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </main>
      

      {/* Footer */}
      <Footer />
    </div>
  );
};
