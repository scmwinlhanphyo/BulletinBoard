import express from 'express';
import { getUsers, createUser, findUser, updateUser, deleteUser, findByName } from '../controllers/UserController';
import { body } from 'express-validator';
import { logout } from '../controllers/AuthController';

const router = express.Router();

router
    .route("/")
    .get(getUsers)
    .post(
        [
            body("name").notEmpty().withMessage("Email must note be empty"),
            body("email").notEmpty().withMessage("Email must note be empty")
        ],
        createUser);
    
router.route("/logout").post([], logout);

router.
    route("/search")
    .post(findByName)

router
    .route("/:id")
    .post(findUser)
    .put(updateUser)
    .delete(deleteUser)
export default router;