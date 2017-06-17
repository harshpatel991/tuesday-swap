import React, {Component} from 'react';
import {Button, Container, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './App.css';

class App extends Component {
    render() {
        return (
            <Container fluid="true" >
                <Row>
                    <Col className="text-center hero-background">

                        <img className="mx-auto d-block" src="/images/swap-icon.png" width="100px"/>
                        <h1>Swap Codes Without the Hassle</h1>
                        <h5>Tuesday Swap ensures that you can trade codes with other users without worrying about getting scammed.</h5>
                        <div>
                            <Button tag="a" color="primary" size="lg" href="/register">
                                Register Now
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col className="explanationCol explanationCol1">
                        <img className="mx-auto d-block explanationImage" src="/images/register.png"/>
                        <h3 className="text-center">1. Register</h3>
                        <p>Register for an account. A reddit account older than 3 months will be required to ensure only legitimate accounts are used.</p>
                    </Col>
                    <Col className="explanationCol explanationCol2">
                        <img className="mx-auto d-block explanationImage" src="/images/add.png"/>
                        <h3 className="text-center">2. Add Codes</h3>
                        <p>Add the codes that you want to give away and tell us what codes you are looking to receive.</p>
                    </Col>
                    <Col className="explanationCol explanationCol3">
                        <img className="mx-auto d-block explanationImage" src="/images/swap.png"/>
                        <h3 className="text-center">3. Receive Codes</h3>
                        <p>When a user that can trade with you is found, you will swap codes.</p>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default App;
