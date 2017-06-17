import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter, Route} from "react-router-dom";
import LoginComponent from "./pages/LoginComponent";
import HomeComponent from "./pages/HomeComponent";
import NotFoundComponent from "./pages/NotFoundComponent";
import {Switch} from "react-router";
import RegisterComponent from "./pages/RegisterComponent";


ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
            <Route exact path='/' component={HomeComponent}/>
            <Route exact path='/login' component={LoginComponent}/>
            <Route exact path='/register' component={RegisterComponent}/>
            <Route path='*' component={NotFoundComponent}/>
            </Switch>
        </App>
    </BrowserRouter>,
    document.getElementById('root')
);

