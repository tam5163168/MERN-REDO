import React from "react";
import { Button, Col, Row } from "react-bootstrap";

function About() {
    return (
        <Row className="mt-5" >
            <Col className="text-center">
                <Button variant="primary" size="lg">
                    Visit
                </Button>
            </Col>
        </Row>
    );
}

export default About;
