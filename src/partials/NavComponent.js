import React, {Component} from "react";
import {Button, Collapse, Nav, Navbar, NavbarToggler, NavItem} from "reactstrap";
import {Link} from "react-router-dom";
import axios from 'axios';

class NavComponent extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light toggleable>
                    <NavbarToggler right onClick={this.toggle}/>
                    <Link className="navbar-brand" to="/">Tuesday Swap</Link>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.props.isLoggedIn ? <LoggedInButtonsComponent refreshLoggedInState={this.props.refreshLoggedInState}/> : <LoginRegisterButtonsComponent/>}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

class LoginRegisterButtonsComponent extends Component {
    render() {
        return (
            <div className="btn-group">
                <NavItem>
                    <Link className="btn btn-default" role="button" to="/login">Login</Link>
                </NavItem>
                <NavItem>
                    <Link className="btn btn-primary" role="button" to="/register">Register</Link>
                </NavItem>
            </div>
        )
    }
}

class LoggedInButtonsComponent extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    render() {
        return (
            <div className="btn-group">
                <NavItem>
                    <Link className="btn btn-primary" role="button" to="/profile">Profile</Link>
                </NavItem>
                <NavItem>
                    <Button className="btn btn-default" role="button" onClick={this.handleLogout}>Logout</Button>
                </NavItem>
            </div>
        )
    }

    handleLogout(event) {
        event.preventDefault();

        axios.get('/api/auth/logout')
            .then((response) => {
                //TODO: verify state or throw
                this.props.refreshLoggedInState();
            })
            .catch(function(err) {
                console.log("Error");
                console.log(err);
            })
    }
}

export default NavComponent;