import { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../../Application/Pages/LoginPage";
import { SearchPage } from '../../Application/Pages/SearchPage'; 
import { RegisterPage } from '../../Application/Pages/RegisterPage'
import { SettingsPage } from '../../Application/Pages/Settings';
import { ResetPage } from '../../Application/Pages/ResetPage'
import App from '../../Module/App';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    index: true
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/setting",
    element:  <SettingsPage />
  },
  {
  path: "/reset",
  element: <ResetPage />
  },
]);
