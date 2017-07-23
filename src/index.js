import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter} from "react-router-dom";
import { CookiesProvider} from 'react-cookie';

ReactDOM.render(
    <BrowserRouter>
        <CookiesProvider>
            <App/>
        </CookiesProvider>
    </BrowserRouter>,
    document.getElementById('root')
);