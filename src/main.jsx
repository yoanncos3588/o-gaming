import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import TemplateDrawer from './TemplateDrawer';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <TemplateDrawer>
                <App />
            </TemplateDrawer>
        </BrowserRouter>
    </React.StrictMode>
);
