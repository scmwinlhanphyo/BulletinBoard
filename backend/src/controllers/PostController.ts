import { Request, Response, NextFunction } from 'express'
import {
  getPostService,
  createPostService,
  findPostService,
  updatePostService,
  deletePostService,
  findByNameService
} from '../services/PostService';


export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getPostService(req, res, next);
};

export const createPost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  createPostService(req, res, next);
}

export const findPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  findPostService(req, res, next);
}

export const updatePost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  updatePostService(req, res, next);
};

export const deletePost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  deletePostService(req, res, next);
};

export const findByName = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  findByNameService(req, res, next);
}