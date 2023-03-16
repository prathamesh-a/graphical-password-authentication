import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import {Analytics} from "@vercel/analytics/react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} rtl={false} theme="dark"/>
      <App />
      <Analytics />
  </React.StrictMode>
);
