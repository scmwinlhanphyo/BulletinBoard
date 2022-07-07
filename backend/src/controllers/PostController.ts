import { Request, Response, NextFunction } from 'express'
import Post from '../models/Post';
import { validationResult } from 'express-validator';
import { PostCreate } from '../interfaces/Post';

export const getPosts = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts = await Post.find({ deleted_at: null })
        res.json({ data: posts, status: 1 });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const createPost = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req.body);
        console.log("errors");
        console.log(errors);
        console.log(req.body);
        if (!errors.isEmpty()) {
            const error: any = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const postTdo: PostCreate = {
            title: req.body.title,
            description: req.body.description,
            created_user_id: req.body.created_user_id,
        }
        const post = new Post(postTdo);
        const result = await post.save();
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    } catch (err) {
        next(err);
    }
}

export const findPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            const error: any = Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        res.json({ data: post, status: 1 });
    } catch (err) {
        next(err);
    }
}

export const updatePost = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            const error: any = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const post: any = await Post.findById(req.params.id);
        if (!post) {
            const error: any = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        post.title = req.body.title;
        post.description = req.body.description;
        post.status = req.body.status;
        post.created_user_id = req.body.created_user_id;
        post.updated_user_id = req.body.updated_user_id;
        const result = await post.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const post: any = await Post.findById(req.params.id);
        if (!post) {
            const error: any = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        // user.deleted_user_id = req.body.deleted_user_id;
        post.deleted_at = new Date();
        await post.save();
        res.sendStatus(204)
    } catch (err) {
        next(err);
    }
};

export const findByName = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts = await Post.find({ title: { '$regex': req.body.title, '$options': 'i' }, deleted_at: null });
        res.json({ data: posts, status: 1 });
    } catch (err) {
        next(err);
    }
}