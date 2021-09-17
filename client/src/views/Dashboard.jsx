import { PostContext } from "context/PostContext";
import { AuthContext } from "context/AuthContext";
import React, { useContext, useEffect } from "react";
import {
    Spinner,
    Card,
    Button,
    Row,
    Col,
    OverlayTrigger,
    Tooltip,
    Toast,
} from "react-bootstrap";
import SinglePost from "posts/SinglePost";
import AddPostModal from "posts/AddPostModal";
import addIcon from "assets/plus-circle-fill.svg";
import UpdatePostModal from "posts/UpdatePostModal";

function Dashboard() {
    // Context
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);
    const {
        postsState: { post, posts, postsLoading },
        getPosts,
        setShowAddPostModal,
        showToast: { show, message, type },
        setShowToast,
    } = useContext(PostContext);

    // Effect
    useEffect(() => {
        getPosts();
    }, []);

    // Body
    let body = null;

    if (postsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as="h1">Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to
                            learn
                        </Card.Text>
                        <Button
                            variant="primary"
                            onClick={() => setShowAddPostModal(true)}
                        >
                            LearnIt!
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map((post) => (
                        <Col key={post._id} className="my-2">
                            <SinglePost post={post}></SinglePost>
                        </Col>
                    ))}
                </Row>

                {/* Open modal */}
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip>Add a new thing to learn</Tooltip>}
                >
                    <Button
                        className="btn-floating"
                        onClick={() => setShowAddPostModal(true)}
                    >
                        <img
                            src={addIcon}
                            alt="add-post"
                            width="60"
                            height="60"
                        />
                    </Button>
                </OverlayTrigger>
            </>
        );
    }

    return (
        <>
            {body}
            <AddPostModal></AddPostModal>
            {post !== null && <UpdatePostModal />}
            {/* After post is added, show toast */}
            <Toast
                show={show}
                style={{ position: "fixed", top: "20%", right: "0px" }}
                className={`bg-${type} text-white`}
                onClose={() =>
                    setShowToast({ show: false, message: "", type: null })
                }
                delay={3000}
                autohide
                animation={true}
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </>
    );
}

export default Dashboard;
