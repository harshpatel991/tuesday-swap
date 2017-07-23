import React, {Component} from "react";
import NavComponent from "./partials/NavComponent";
import {withCookies} from 'react-cookie';
import {Route, Switch} from "react-router";
import HomeComponent from "./pages/HomeComponent";
import LoginComponent from "./pages/LoginComponent";
import RegisterComponent from "./pages/RegisterComponent";
import EnrollmentComponent from "./pages/EnrollmentComponent";
import NotFoundComponent from "./pages/NotFoundComponent";

class App extends Component {
    constructor(props) {
        super(props);
        this.refreshLoggedInState = this.refreshLoggedInState.bind(this);
    }

    componentWillMount() {
        this.state = {
            errors: {},
            isLoggedIn: false
        };
        this.refreshLoggedInState();
    }

    render() {
        return (<div>
            <NavComponent isLoggedIn={this.state.isLoggedIn} refreshLoggedInState={this.refreshLoggedInState} />
            <Switch>
                <Route exact path='/' render={(props) => (
                    <HomeComponent {...props} refreshLoggedInState={this.refreshLoggedInState}/>)}/>
                <Route exact path='/login' render={(props) => (
                    <LoginComponent {...props} refreshLoggedInState={this.refreshLoggedInState}/>)}/>
                <Route exact path='/register' render={(props) => (
                    <RegisterComponent {...props} refreshLoggedInState={this.refreshLoggedInState}/>)}/>
                <Route exact path='/shareable/:enrollmentId/:enrollmentSlug' render={(props) => (
                    <EnrollmentComponent {...props} refreshLoggedInState={this.refreshLoggedInState}/>)}/>
                <Route path='*' render={(props) => (
                    <NotFoundComponent {...props} refreshLoggedInState={this.refreshLoggedInState}/>)}/>
            </Switch>
        </div>)
    }

    refreshLoggedInState() {
        const {cookies} = this.props;
        this.setState({
            isLoggedIn: cookies.get('loggedIn') == 'true'
        });
    }
}

export default withCookies(App);
