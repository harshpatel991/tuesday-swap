import React, {Component} from "react";
import {Button, Card, CardBlock, CardSubtitle, ListGroup, ListGroupItem} from "reactstrap";
import CardIcon from "./CardIcon";

class EnrollmentCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card className="card-background">
                    <CardBlock>
                        <CardSubtitle>{ this.props.enrollment.user.reddit_username }</CardSubtitle>
                    </CardBlock>

                    <p className="card-text"><small className="text-muted">Giving Away</small></p>

                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            {
                                this.props.enrollment.codes.map(function (code) {
                                    return <CardIcon name={code.codeType.name}/>
                                })
                            }
                        </ListGroupItem>
                        <p className="card-text"><small className="text-muted">Looking For</small></p>
                        <ListGroupItem>
                            {
                                this.props.enrollment.seekings.map(function (seeking) {
                                    return <CardIcon name={seeking.codeType.name}/>
                                })
                            }
                        </ListGroupItem>
                    </ListGroup>
                    <CardBlock>
                        <div className="text-center">
                            <Button color="success" className="">Swap</Button>
                        </div>
                    </CardBlock>
                </Card>
            </div>
        )
    }
}
export default EnrollmentCard;