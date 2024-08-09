import { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../Application/Pages/LoginPage";
import { HomePage } from '../Application/Pages/HomePage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
]);
