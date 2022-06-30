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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.findPost = exports.createPost = exports.findPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const express_validator_1 = require("express-validator");
const findPosts = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find();
        res.json({ data: posts, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findPosts = findPosts;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        console.log("errors");
        console.log(errors);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        // const body = JSON.parse(req.body);
        // console.log('body', req.body);
        const postTdo = {
            title: req.body.title,
            description: req.body.description,
        };
        // console.log('post data', postTdo);
        const post = new Post_1.default(postTdo);
        const result = yield post.save();
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    }
    catch (err) {
        // if (!err.statusCode) {
        //     err.statusCode = 500;
        // }
        next(err);
    }
});
exports.createPost = createPost;
const findPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            const error = Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        res.json({ data: post, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findPost = findPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        post.title = req.body.title;
        post.description = req.body.description;
        const result = yield post.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        yield Post_1.default.findByIdAndRemove(req.params.id);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=PostController.js.map