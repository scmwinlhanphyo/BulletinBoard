import { Request, Response, NextFunction } from 'express'
import Post from '../models/Post';
import { validationResult } from 'express-validator';
import { IPostCreate } from '../interfaces/IPost';

export const findPosts = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts = await Post.find()
        res.json({ data: posts, status: 1 });
    } catch (err) {
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
        if (!errors.isEmpty()) {
            const error: any = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        // const body = JSON.parse(req.body);
        // console.log('body', req.body);
        const postTdo: IPostCreate = {
            title: req.body.title,
            description: req.body.description,

        }
        // console.log('post data', postTdo);
        const post = new Post(postTdo);
        const result = await post.save();
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    } catch (err) {
        // if (!err.statusCode) {
        //     err.statusCode = 500;
        // }
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
        const errors = validationResult(req);
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
        await Post.findByIdAndRemove(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};