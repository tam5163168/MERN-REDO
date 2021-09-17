import { PostContext } from "context/PostContext";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function AddPostModal() {
    // State
    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        url: "",
        status: "TO LEARN",
    });

    const { title, description, url } = newPost;

    // Context
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
        useContext(PostContext);

    // Function
    const onChangeNewPostForm = (event) => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value });
    };

    const closeDiaLog = () => {
        resetAddPostData();
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await addPost(newPost);
        resetAddPostData();
        setShowToast({
            show: true,
            message,
            type: success ? "success" : "danger",
        });
    };

    const resetAddPostData = () => {
        setNewPost({ title: "", description: "", url: "", status: "" });
        setShowAddPostModal(false);
    };

    // Render
    return (
        <Modal show={showAddPostModal} onHide={closeDiaLog}>
            <Modal.Header closeButton>
                <Modal.Title>What would you like to learn ?</Modal.Title>
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
                            onChange={onChangeNewPostForm}
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
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group style={{ marginTop: "10px" }}>
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial Url"
                            name="url"
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
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

export default AddPostModal;
