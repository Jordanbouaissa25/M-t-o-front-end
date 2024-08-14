import React from "react";
import ReactDOM from "react-dom/client";
// import { App } from "./App.tsx"
import "./Infrastructure/Style/index.css";
import { router } from './Infrastructure/Router.tsx';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
