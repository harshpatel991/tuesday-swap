import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";

class NotFoundComponent extends Component {
    render() {
        return (
            <Container fluid="true" >
                <Row>
                    <Col className="text-center hero-background">
                        <img className="mx-auto d-block" src="/images/swap-icon.png" width="100px" alt="icon"/>
                        <h1>404 Not Found</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NotFoundComponent;
