"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostController_1 = require("../controllers/PostController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router
    .route("/")
    .get(PostController_1.getPosts)
    .post([
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name must note be empty"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email must note be empty"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password must note be empty")
], PostController_1.createPost);
router
    .route("/:id")
    .get(PostController_1.findPost)
    .put([
    (0, express_validator_1.body)("title").notEmpty().withMessage("Tilte must note be empty"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description must note be empty"),
    (0, express_validator_1.body)("status")
], PostController_1.updatePost)
    .delete(PostController_1.deletePost);
exports.default = router;
//# sourceMappingURL=post_route.js.map