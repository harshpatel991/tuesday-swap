import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter, Route} from "react-router-dom";
import LoginComponent from "./pages/LoginComponent";
import HomeComponent from "./pages/HomeComponent";


ReactDOM.render(
    <BrowserRouter>
        <App>
            <Route exact path='/' component={HomeComponent}/>
            <Route path='/login' component={LoginComponent}/>
        </App>
    </BrowserRouter>,
    document.getElementById('root')
);

