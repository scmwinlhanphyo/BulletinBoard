import { Request, Response, NextFunction } from 'express'
import Post from '../models/Post';
// import { validationResult } from 'express-validator';
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
    _next: NextFunction
) => {
    try {
        // const errors = validationResult(req.body);
        // console.log("errors");
        // console.log(errors);
        // if (!errors.isEmpty()) {
        //     const error: any = new Error("Validation failed!");
        //     error.data = errors.array();
        //     error.statusCode = 422;
        //     throw error;
        // }
        // const body = JSON.parse(req.body);
        console.log('body', req.body);
        const postTdo: IPostCreate = {
            title: req.body.title,
            description: req.body.description,

        }
        console.log('post data', postTdo);
        const post = new Post(postTdo);
        const result = await post.save();
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    } catch (err) {
        // if (!err.statusCode) {
        //     err.statusCode = 500;
        // }
        // next(err);
    }
}

// export const findPost = async (
//     _req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const post = Post.findById(req.params.id);
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next(err);
//     }
// }

