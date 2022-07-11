"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controllers/AuthController");
const router = express_1.default.Router();
router
    .route("/")
    .get(UserController_1.getUsers)
    .post([
    (0, express_validator_1.body)("name").notEmpty().withMessage("Email must note be empty"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email must note be empty")
], UserController_1.createUser);
router.route("/logout").post([], AuthController_1.logout);
router.
    route("/search")
    .post(UserController_1.findByName);
router
    .route("/:id")
    .post(UserController_1.findUser)
    .put(UserController_1.updateUser)
    .delete(UserController_1.deleteUser);
exports.default = router;
