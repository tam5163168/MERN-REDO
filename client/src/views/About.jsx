import React from "react";
import { Col, Row } from "react-bootstrap";

function About() {
    return (
        <Row className="mt-5">
            <Col className="text-center">
                <a
                    href="https://github.com/tam5163168"
                    target="_blank"
                    style={{
                        padding: "10px",
                        backgroundColor: "#2980b9",
                        borderRadius: "24px",
                    }}
                >
                    Visit Github
                </a>
            </Col>
        </Row>
    );
}

export default About;
