"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByName = exports.deletePost = exports.updatePost = exports.findPost = exports.createPost = exports.getPosts = void 0;
const PostService_1 = require("../services/PostService");
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, PostService_1.getPostService)(req, res, next);
});
exports.getPosts = getPosts;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, PostService_1.createPostService)(req, res, next);
});
exports.createPost = createPost;
const findPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, PostService_1.findPostService)(req, res, next);
});
exports.findPost = findPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, PostService_1.updatePostService)(req, res, next);
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, PostService_1.deletePostService)(req, res, next);
});
exports.deletePost = deletePost;
const findByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, PostService_1.findByNameService)(req, res, next);
});
exports.findByName = findByName;
//# sourceMappingURL=PostController.js.map