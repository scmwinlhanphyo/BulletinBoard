import express from 'express';
import { login } from '../controllers/AuthController';
import { body } from 'express-validator';

const router = express.Router();

router
  .route("/login")
  .post(
    [
      body("email").notEmpty().withMessage("Email must not be empty"),
      body("password").notEmpty().withMessage("Password must not be empty")
    ],
    login);
export default router;