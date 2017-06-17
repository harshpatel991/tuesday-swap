import React, {Component, PropTypes} from "react";
import {Button, CardBlock, CardTitle, Col, Container, Input, Row} from "reactstrap";
import {Link} from "react-router-dom";

class LoginComponent extends Component {
    render() {
        return (
            <Container fluid="true" >
                <Row>
                    <Col sm="12" md={{ size: 4, offset: 4 }}>

                        <h2>Login</h2>

                        <form action="/" onSubmit="">
                            <Input placeholder="email" onChange="" value="" />
                            <Input placeholder="username" onChange="" value="" />
                            <Button color="primary">Submit</Button>
                            <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
                        </form>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LoginComponent;
