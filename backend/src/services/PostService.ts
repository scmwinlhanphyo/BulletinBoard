import { Request, Response, NextFunction } from 'express';
import Post from '../models/Post';
import { validationResult } from 'express-validator';

/**
 * get post service.
 * @param _req 
 * @param res 
 * @param next 
 */
export const getPostService = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page: any = _req.query.page || 0;
    const postsPerPage: any = _req.query.ppp || 5;

    const userType = _req.headers['userType'];
    const userId = _req.headers['userId'];
    let condition: any = { deleted_at: null };
    if (userType === "User") {
      condition.created_user_id = userId;
      condition.updated_user_id = userId;
    }
    const posts = await Post.find(condition).skip(page * postsPerPage).limit(postsPerPage);
    res.json({ data: posts, status: 1 });
  } catch (err) {
    next(err);
  }
};

/**
 * create post service
 * @param req 
 * @param res 
 * @param next 
 */
export const createPostService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const postList = req.body; 
    const result: any = await Post.insertMany(postList);
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const findPostService = async (
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

export const updatePostService = async (
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

export const deletePostService = async (
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
    post.deleted_at = new Date();
    await post.save();
    res.sendStatus(204)
  } catch (err) {
    next(err);
  }
};

export const findByNameService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const page: any = req.query.page || 0;
    const postsPerPage: any = req.query.ppp || 5;

    const userType = req.headers['userType'];
    const userId = req.headers['userId'];
    let condition: any = { title: { '$regex': req.body.title, '$options': 'i' }, deleted_at: null };
    if (userType === "User") {
      condition.created_user_id = userId;
    }
    const posts = await Post.find(condition).skip(page * postsPerPage).limit(postsPerPage);
    res.json({ data: posts, status: 1 });
  } catch (err) {
    next(err);
  }
}