import React from "react";
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from './App';
import { AuthProvider } from './utility/authContext';
import store from "./store";
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </AuthProvider>
);