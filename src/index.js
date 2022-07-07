import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from 'react-redux'
import {store} from "./core";

const theme = createTheme({
    palette: {
        primary: {
            main: '#d61e4c',
        },
        secondary: {
            main: '#d61e4c',
        }
    },
    typography: {
        button: {
            textTransform: "none"
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>
);
