import express from 'express';
import { getUsers, createUser, findUser, updateUser, deleteUser, findByName } from '../controllers/UserController';
import { body } from 'express-validator';

const router = express.Router();

router
    .route("/")
    .get(getUsers)
    .post(
        [
            body("name").notEmpty().withMessage("Email must note be empty"),
            body("email").notEmpty().withMessage("Email must note be empty")
        ],
        createUser)

router.
    route("/keyword")
    .post(findByName)

router
    .route("/:id")
    .get(findUser)
    .put(updateUser)
    .delete(deleteUser)
export default router;