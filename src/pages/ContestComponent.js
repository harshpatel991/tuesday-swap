import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import axios from "axios";
import EnrollmentCard from "../partials/EnrollmentCard";

import "../styles/Contest.css";

class ContestComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            enrollments: []
        }
    }

    componentDidMount() {
        this.props.refreshLoggedInState();
        var _this = this;
        axios.get("/api/contest/" + this.props.match.params.contestId + "/" + this.props.match.params.contestSlug)
            .then(function (result) {
                _this.setState({
                    name: result.data.name,
                    description: result.data.description,
                    enrollments: result.data.enrollments
                });
            }).catch(function (error) { // any error will go here
                console.log(error); //TODO: show error to user
        });
    };

    render() {
        return (
            <Container fluid="true" >
                <Row>
                    <Col xs="12" md="3">
                        <div className="sidebar-background text-center">
                            <h2>{this.state.name}</h2>
                            <h4>{this.state.description}</h4>
                        </div>
                    </Col>
                    <Col xs="12" md="9">
                        <Row>
                            {this.state.enrollments.map(function (enrollment) {
                                return <Col xs="12" sm="6" lg="4"><EnrollmentCard enrollment={enrollment}/></Col>
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ContestComponent;