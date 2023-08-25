import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './index.css';
import TemplateDrawer from './components/TemplateDrawer';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <TemplateDrawer>
                <App />
            </TemplateDrawer>
        </BrowserRouter>
    </React.StrictMode>
);
