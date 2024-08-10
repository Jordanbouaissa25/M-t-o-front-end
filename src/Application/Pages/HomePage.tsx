import React from 'react'
import { Header } from '../../Composant/Header'
import { FiAlignJustify } from "react-icons/fi";

export const HomePage = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="../../public/logo.png" alt="Logo météo" className="logo" />
        <span className="app-name">Météo</span>
      </div>
      <div className="icons">
        <i className="search-icon">🔍</i>
       <FiAlignJustify />
      </div>
    </header>
  );
}
