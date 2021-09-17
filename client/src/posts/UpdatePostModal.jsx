import { PostContext } from "context/PostContext";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function UpdatePostModal() {
    // Context
    const {
        postsState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast,
    } = useContext(PostContext);

    // State
    const [updatedPost, setUpdatedPost] = useState(post);

    const { title, description, url, status } = updatedPost;

    // Effect
    useEffect(() => {
        setUpdatedPost(post)
    }, [post])

    // Function
    const onChangeUpdatedPostForm = (event) => {
        setUpdatedPost({
            ...updatedPost,
            [event.target.name]: event.target.value,
        });
    };

    const closeDiaLog = () => {
        setUpdatedPost(post)
        setShowUpdatePostModal(false);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await updatePost(updatedPost);
        setShowUpdatePostModal(false);
        setShowToast({
            show: true,
            message,
            type: success ? "success" : "danger",
        });
    };

    // const resetAddPostData = () => {
    //     setNewPost({ title: "", description: "", url: "", status: "" });
    //     setShowAddPostModal(false);
    // };

    // Render
    return (
        <Modal show={showUpdatePostModal} onHide={closeDiaLog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progess ?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeUpdatedPostForm}
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group style={{ marginTop: "10px" }}>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group style={{ marginTop: "10px" }}>
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial Url"
                            name="url"
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="select"
                            value={status}
                            name="status"
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option value="TOLEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={closeDiaLog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        LearnIt!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UpdatePostModal;
