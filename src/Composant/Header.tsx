import React from "react";
import "./header.css"; // Assurez-vous d'importer votre fichier CSS

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="../../public/logo.png" alt="Logo météo" className="logo" />
        <span className="app-name">Météo</span>
      </div>
      <div className="icons">
        <i className="search-icon">🔍</i>
        <i className="menu-icon">☰</i>
      </div>
    </header>
  );
};

export default Header;
