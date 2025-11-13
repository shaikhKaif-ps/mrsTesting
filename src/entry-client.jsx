// // src/entry-client.jsx
// import './index.css'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'

// ReactDOM.hydrateRoot(
//   document.getElementById('root'),
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
// ======================
// ======================
// ======================

// src/entry-client.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
