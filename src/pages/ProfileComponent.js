import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import "../styles/Enrollment.css";

class ProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.props.refreshLoggedInState();
    }

    render() {
        return (
            <Container fluid="true">
                <Row>
                    <Col className="text-center enrollment-hero-background">

                        <img className="mx-auto d-block" src="/images/swap-icon.png" width="100px" alt=""/>
                        <h1>Profile</h1>
                    </Col>
                </Row>



            </Container>
        );
    }
}

export default ProfileComponent;
