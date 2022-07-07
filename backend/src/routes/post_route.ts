import express from 'express';
import { getPosts, createPost, findPost, updatePost, deletePost, findByName } from '../controllers/PostController';
import { body } from 'express-validator';

const router = express.Router();

router
  .route("/")
  .get(getPosts)
  .post(
    [
      body("title").notEmpty().withMessage("Tilte must not be empty"),
      body("description").notEmpty().withMessage("Description must note be empty")
    ],
    createPost);

router
  .route("/search")
  .post(findByName)

router
  .route("/:id")
  .get(findPost)
  .put(
    [
      body("title").notEmpty().withMessage("Tilte must not be empty"),
      body("description").notEmpty().withMessage("Description must note be empty"),
      body("status")
    ],
    updatePost)
  .delete(deletePost)
export default router;