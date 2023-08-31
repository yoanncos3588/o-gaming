import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import TemplateDrawer from './components/TemplateDrawer';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <TemplateDrawer>
                    <App />
                </TemplateDrawer>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
