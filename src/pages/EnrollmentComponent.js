import React, {Component} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import "../styles/Enrollment.css";
import axios from "axios";

class EnrollmentComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        var _this = this;
        this.serverRequest =
            axios.get("http://localhost:3001/enrollment/" + this.props.match.params.enrollmentSlug)
                .then(function (result) {
                    _this.setState({
                        enrollment: result.data
                    });
                }).catch(function (error) { // any error will go here
                    console.log(error);
                });
    };

    componentWillUnmount() {
        this.serverRequest.abort();
    };

    render() {
        return (
            <Container fluid="true">
                <Row>
                    <Col className="text-center enrollment-hero-background">

                        <img className="mx-auto d-block" src="/images/swap-icon.png" width="100px"/>
                        <h1>/u/Dude wants to swap codes</h1>
                        <pre>{JSON.stringify(this.state.enrollment)}</pre>

                        {/*TODO: if not logged in:*/}
                        <div>
                            <Button tag="a" color="secondary" size="lg" href="/login">
                                Login
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col className="giving-away-background">
                        <img className="mx-auto d-block explanationImage" src="/images/register.png"/>
                        <h3 className="text-center">/u/dude is giving away</h3>
                        <h4>xyz</h4>
                        <h4>abc</h4>
                        <h4>123</h4>
                    </Col>
                    <Col className="wants-background">
                        <img className="mx-auto d-block explanationImage" src="/images/add.png"/>
                        <h3 className="text-center">/u/dude wants</h3>
                        <h4>abc</h4>
                        <h4>123</h4>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default EnrollmentComponent;
