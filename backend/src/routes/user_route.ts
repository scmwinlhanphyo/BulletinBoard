import express from 'express';
import { getUsers, createUser, findUser, updateUser, deleteUser } from '../controllers/UserController';
import { body } from 'express-validator';

const router = express.Router();

router
    .route("/")
    .get(getUsers)
    .post(
        [
            body("name").notEmpty().withMessage("Tilte must note be empty"),
            body("description").notEmpty().withMessage("Description must note be empty")
        ],
        createUser)

router
    .route("/:id")
    .get(findUser)
    .put(updateUser)
    .delete(deleteUser)
export default router;