import React, {Component} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button} from "reactstrap";
import {Link} from "react-router-dom";


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
                    <NavbarToggler right onClick={this.toggle} />
                    <Link className="navbar-brand" to="/">Tuesday Swap</Link>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link className="btn btn-success" role="button" to="/login">Login</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="btn btn-primary" role="button" to="/register">Register</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavComponent;