import React, { useContext } from "react";
import playIcon from "assets/play-btn.svg";
import editIcon from "assets/pencil.svg";
import deleteIcon from "assets/trash.svg";
import { Button } from "react-bootstrap";
import { PostContext } from "context/PostContext";

function ActionButtons({ url, _id }) {
    // Context
    const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext);

    // Function
    const choosePost = (postId) => {
        findPost(postId);
        setShowUpdatePostModal(true)
    };

    return (
        <>
            <Button className="post-button" href={url} target="_blank">
                <img src={playIcon} alt="play" width="32" height="32" />
            </Button>
            <Button className="post-button" onClick={() => choosePost(_id)}>
                <img src={editIcon} alt="edit" width="24" height="24" />
            </Button>
            <Button className="post-button" onClick={() => deletePost(_id)}>
                <img src={deleteIcon} alt="delete" width="24" height="24" />
            </Button>
        </>
    );
}

export default ActionButtons;
