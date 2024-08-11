import React from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

export const HomePage = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="../../public/logo.png" alt="Logo météo" className="logo" />
        <p className='name-logo'>Météo</p>
      </div>
      <div className="icons">
       <FiAlignJustify />
       </div>
       <div className="icons2">
       <FaSearch />
       </div>
    </header>
  );
}
