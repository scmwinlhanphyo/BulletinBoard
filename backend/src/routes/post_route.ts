import express from 'express';
import { getPosts, createPost, findPost, updatePost, deletePost } from '../controllers/PostController';
import { body } from 'express-validator';

const router = express.Router();

router
    .route("/")
    .get(getPosts)
    .post(
        [
            body("name").notEmpty().withMessage("Name must note be empty"),
            body("email").notEmpty().withMessage("Email must note be empty"),
            body("password").notEmpty().withMessage("Password must note be empty")
        ],
        createPost);

router
    .route("/:id")
    .get(findPost)
    .put(
        [
            body("title").notEmpty().withMessage("Tilte must note be empty"),
            body("description").notEmpty().withMessage("Description must note be empty"),
            body("status")
        ],
        updatePost)
    .delete(deletePost)
export default router;