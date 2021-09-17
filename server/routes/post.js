const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { update } = require("../models/Post");

const Post = require("../models/Post");

//  @route GET api/posts
//  @desc GET post
//  @access Private
router.get("/", verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate("user", [
            "username",
        ]);
        res.json({ success: true, posts });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: "false",
            message: "Internal server error",
        });
    }
});

//  @route POST api/posts
//  @desc Create post
//  @access Private
router.post("/", verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    // Validation
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: "Title is required" });

    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith("https://") ? url : `https://${url}`,
            status: status || "TO LEARN",
            user: req.userId,
        });

        await newPost.save();

        return res.json({
            success: true,
            message: "Happy learning !",
            post: newPost,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: "false",
            message: "Internal server error",
        });
    }
});

//  @route PUT api/posts
//  @desc Update post
//  @access Private

router.put("/:id", verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;
    console.log(title, description, url, status);
    // Validation
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: "Title is required" });

    try {
        let updatedPost = {
            title,
            description: description || "",
            url: (url.startsWith("https://") ? url : `https://${url}`) || "",
            status: status || "TO LEARN",
        };

        const postUpdateCondition = { _id: req.params.id, user: req.userId }; // url:id, userID

        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            {
                new: true,
            }
        );

        // User not authorised to update post
        if (!updatedPost)
            res.status(401).json({
                success: false,
                message: "Post not found or user not authorised",
            });

        res.json({
            success: true,
            message: "Excellent process!",
            post: updatedPost,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: "false",
            message: "Internal server error",
        });
    }
});

//  @route PUT api/posts
//  @desc Update post
//  @access Private
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletePost = await Post.findOneAndDelete(postDeleteCondition);

        // User not authorised to update post
        if (!deletePost)
            res.status(401).json({
                success: false,
                message: "Post not found or user not authorised",
            });

        res.json({
            success: true,
            post: deletePost,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: "false",
            message: "Internal server error",
        });
    }
});

module.exports = router;
