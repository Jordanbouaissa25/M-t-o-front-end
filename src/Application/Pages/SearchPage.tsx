import React from 'react';
import { FiAlignJustify } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { NavLink } from 'react-router-dom';

export const SearchPage = () => {
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
        {/* <div className="text-white">
          <FaSearch size={24} />
        </div> */}
      </header>

      {/* Barre de recherche */}
      <div className="px-5 mt-1 flex flex-col">
        <label htmlFor="search" className="mb-2 text-lg">Rechercher</label>
        <div className="relative">
          <input
            type="text"
            id="search"
            className="p-3 pl-5 pr-10 rounded-full w-full text-black"
            placeholder="Rechercher une ville, un pays..."
          />
          <span className="absolute right-3 top-3 text-black">
            <FaSearch size={20} />
          </span>
        </div>
      </div>

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
        <NavLink to="/setting" className="flex flex-col items-center text-black">
          <IoIosSettings size={24} />
          <span className="mt-1">Settings</span>
        </NavLink>
      </footer>
    </div>
  );
}
