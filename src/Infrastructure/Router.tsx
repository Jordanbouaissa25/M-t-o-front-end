import { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../Application/Pages/LoginPage";
import { SearchPage } from '../Application/Pages/SearchPage'; 
import { RegisterPage } from '../Application/Pages/RegisterPage'
import { SettingsPage } from '../Application/Pages/Settings';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/setting",
    element:  <SettingsPage />
  }
]);
