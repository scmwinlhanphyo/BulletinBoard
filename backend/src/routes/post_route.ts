import express from 'express';
import { findPosts, createPost, findPost, updatePost, deletePost } from '../controllers/PostController';
import { body } from 'express-validator';

const router = express.Router();

router
    .route("/")
    .get(findPosts)
    .post(
        [
            body("title").notEmpty().withMessage("Tilte must note be empty"),
            body("description").notEmpty().withMessage("Description must note be empty")
        ],
        createPost);

router
    .route("/:id")
    .get(findPost)
    .put(
        [
            body("title").notEmpty().withMessage("Tilte must note be empty"),
            body("description").notEmpty().withMessage("Description must note be empty")
        ],
        updatePost)
    .delete(deletePost)
export default router;