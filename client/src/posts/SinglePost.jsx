import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

function SinglePost({ post: { _id, status, title, description, url } }) {
    return (
        <Card
            className="shadow"
            border={
                status === "LEARNED"
                    ? "success"
                    : status === "LEARNING"
                    ? "warning"
                    : "danger"
            }
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className="post-titt">{title}</p>
                            <Badge
                                pill
                                style={
                                    status === "LEARNED"
                                        ? { backgroundColor: "#2ecc71" }
                                        : status === "LEARNING"
                                        ? { backgroundColor: "#f1c40f" }
                                        : { backgroundColor: "#e74c3c" }
                                }
                            >
                                {status}
                            </Badge>
                        </Col>
                        <Col
                            className="text-right"
                            style={{ textAlign: "right" }}
                        >
                            <ActionButtons url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SinglePost;
