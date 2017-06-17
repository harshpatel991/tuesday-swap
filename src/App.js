import React, {Component} from 'react';
import {Button, Container, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './App.css';

class App extends Component {
    render() {
        return (
            <Container fluid="true">
                <Row>
                    <Col>
                    <h1 className="text-center">This is a header</h1>
                    </Col>
                </Row>

                <h1>Hello World</h1>
                <Button
                    tag="a"
                    color="success"
                    size="large"
                    href="http://reactstrap.github.io"
                    target="_blank"
                >
                    View Reactstrap Docs
                </Button>
            </Container>
        );
    }
}

export default App;
