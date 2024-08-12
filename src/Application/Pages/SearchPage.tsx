import React from 'react';
import { FiAlignJustify } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";

export const SearchPage = () => {
  return (
    <div className="search-page">
      <header className="headerSearch">
        <div className="logo-container">
          <img src="../../public/logo.png" alt="Logo météo" className="logo" />
          <p className='name-logo'>Météo</p>
        </div>
        <div className="icons">
          <FiAlignJustify />
        </div>
        {/* <div className="icons2">
          <FaSearch />
        </div> */}
      </header>

      {/* Barre de recherche */}
      <div className="search-container">
        <label htmlFor="search">Rechercher</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Rechercher une ville, un pays..."
          />
          <span className="search-icon">
            <FaSearch />
          </span>
        </div>
      </div>

      {/* Ton contenu existant ici */}

      {/* Footer */}
      <footer className="footerSearch">
        <a href="#login">
          <IoLogIn />
          Login
        </a>
        <a href="#home">
          <IoMdHome />
          Home
        </a>
        <a href="#settings">
         <IoIosSettings />
          Settings
        </a>
      </footer>
    </div>
  );
}

