import React, {Component} from "react";
import {Button, Col, Container, Input, Row} from "reactstrap";
import {Link} from "react-router-dom";
import axios from 'axios';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateEmailValue = this.updateEmailValue.bind(this);
        this.updatePasswordValue = this.updatePasswordValue.bind(this);
    }

    render() {
        return (
            <Container fluid="true" >
                <Row>
                    <Col sm="12" md={{ size: 4, offset: 4 }}>

                        <h2>Login</h2>

                        <form onSubmit={this.handleSubmit}>
                            <Input id="email" placeholder="email" value={this.state.email} onChange={this.updateEmailValue} />
                            <Input id="password" placeholder="password" type="password" value={this.state.password} onChange={this.updatePasswordValue} />
                            <Button color="primary">Submit</Button>
                            <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
                        </form>

                    </Col>
                </Row>
            </Container>
        );
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('/api/auth/login', {
            email_address: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                //TODO: verify state or throw
                this.props.refreshLoggedInState();
                this.setState({ //clear out values
                    email: '',
                    password: ''
                })
            })
            .catch(function(err) {
                console.log("Error");
                console.log(err);
            })
    }

    updateEmailValue(evt) {
        this.setState({
            email: evt.target.value
        });
    }
    updatePasswordValue(evt) {
        this.setState({
            password: evt.target.value
        });
    }
}

export default LoginComponent;
