import React, { useState, ChangeEvent, FormEvent } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import {useNavigate } from "react-router-dom";

export const SettingsPage: React.FC = () => {
  const [windUnit, setWindUnit] = useState<string>("Km/h");
  const [tempUnit, setTempUnit] = useState<string>("°C");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleWindUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWindUnit(event.target.value);
  };

  const handleTempUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTempUnit(event.target.value);
  };

  const handleEmailChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fakeHttpPost("/setting", { email: newEmail });
      const { success } = response.data;
      if (success) {
        console.log("Email modifié avec succès");
      }
    } catch (error: unknown) {
      console.error("Erreur de modification d'email:", error);
      setError("Erreur lors de la modification de l'email. Veuillez réessayer.");
    }
  };

  const handlePasswordChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fakeHttpPost("/setting", { password: newPassword });
      const { success } = response.data;
      if (success) {
        console.log("Mot de passe modifié avec succès");
      }
    } catch (error: unknown) {
      console.error("Erreur de modification du mot de passe:", error);
      setError("Erreur lors de la modification du mot de passe. Veuillez réessayer.");
    }
  };

  const handleNewEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#2D2C5A] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-5 bg-[#2D2C5A]">
        <div className="flex items-center">
          <img src="../../public/logo.png" alt="Logo météo" className="h-10" />
          <p className='ml-4 text-white'>Météo</p>
        </div>
        <NavLink to="/Menu" className="text-[#FEBF2C]">
          <FiAlignJustify size={24} />
        </NavLink>
         <NavLink to='/' className="text-white">
          <FaSearch size={24} />
        </NavLink>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow p-8 space-y-6">
        <div className="flex items-center space-x-4">
          <label className="text-lg text-white">Vent :</label>
          <select
            value={windUnit}
            onChange={handleWindUnitChange}
            className="p-2.5 rounded bg-[#4e94ce] text-white"
          >
            <option value="Km/h">Km/h</option>
            <option value="mi/h">mi/h</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-lg text-white">Température :</label>
          <select
            value={tempUnit}
            onChange={handleTempUnitChange}
            className="p-2.5 rounded bg-[#4e94ce] text-white"
          >
            <option value="°C">°C</option>
            <option value="°F">°F</option>
          </select>
        </div>

        <form onSubmit={handleEmailChange} className="mt-4 w-full">
          <h3 className="text-lg mb-2 text-white">Modifier adresse mail</h3>
          <input
            type="email"
            value={newEmail}
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

        <form onSubmit={handlePasswordChange} className="mt-4 w-full">
          <h3 className="text-lg mb-2 text-white">Modifier mot de passe</h3>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Nouveau mot de passe"
            className="w-full p-2.5 rounded border border-gray-300 text-black bg-white mb-4"
            required
          />
          <button
            type="submit"
            className="p-2.5 bg-[#4e94ce] rounded text-white w-full"
          >
            Modifier mot de passe
          </button>
        </form>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </main>

      {/* Footer */}
      <footer className="bg-[#4E94CE] p-4 flex justify-around">
        <NavLink to="/login" className="flex flex-col items-center text-black">
          <IoLogIn size={24} />
          <span className="mt-1">Logout</span>
        </NavLink>
        <NavLink to="/" className="flex flex-col items-center text-black">
          <IoMdHome size={24} />
          <span className="mt-1">Home</span>
        </NavLink>
        <NavLink to="/Settings" className="flex flex-col items-center text-black">
          <IoIosSettings size={24} />
          <span className="mt-1">Settings</span>
        </NavLink>
      </footer>
    </div>
  );
};

// Fonction factice pour simuler une requête HTTP
async function fakeHttpPost(url: string, data: any) {
  return new Promise<{ data: { success: boolean } }>((resolve) =>
    setTimeout(() => resolve({ data: { success: true } }), 1000)
  );
}
