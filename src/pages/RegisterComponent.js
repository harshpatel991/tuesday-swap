import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";

class RegisterComponent extends Component {
    render() {
        return (
            <Container fluid="true" >
                <Row>
                    <Col className="text-center hero-background">
                        <h1>Register</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RegisterComponent;
