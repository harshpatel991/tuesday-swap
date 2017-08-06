import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.css";
import App from "./App";

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