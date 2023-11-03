import React from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);
