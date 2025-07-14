import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <App/>
  </BrowserRouter>
);
