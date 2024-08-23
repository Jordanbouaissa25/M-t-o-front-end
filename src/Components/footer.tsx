import React from "react"
import { IoLogIn } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { NavLink } from 'react-router-dom';


export const Footer = () => {
  return (
     <footer className="bg-[#4E94CE] p-4 flex justify-around">
        <NavLink to="/" className="flex flex-col items-center text-black">
          <IoLogIn size={24} />
          <span className="mt-1">Logout</span>
        </NavLink>
        <NavLink to="/search" className="flex flex-col items-center text-black">
          <IoMdHome size={24} />
          <span className="mt-1">Home</span>
        </NavLink>
        <NavLink to="/Settings" className="flex flex-col items-center text-black">
          <IoIosSettings size={24} />
          <span className="mt-1">Settings</span>
        </NavLink>
      </footer>
  )
}



