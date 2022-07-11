import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { deleteFile } from "../utils";
import { UserCreate } from '../interfaces/User';
import User from '../models/User';


export const getUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userType = req.headers['userType'];
    const userId = req.headers['userId'];
    let condition: any = { deleted_at: null };
    if (userType === "User") {
      condition.created_user_id = userId;
    }
    const users: any = await User.find(condition);
    const result: any = [];
    for (let i = 0; i < users.length; i++) {
      const index = users.findIndex((dist:any) => users[i]._id.equals(dist._id));
      let username = "";
      index !== -1 ? username = users[index].name : "";
      let obj: any = {
        ...users[i]._doc,
        created_username: username
      };
      result.push(obj);
    }
    res.json({
      data: result,
      status: 1,
      total: result.length,
      links: {
        self: req.originalUrl,
      }
    });
  } catch (err) {
    next(err);
  }
};

export const createUserService = async (
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
    let profile: string = req.body.profile;
    if (req.file) {
      profile = req.file.path.replace("\\", "/");
    }
    const userTdo: UserCreate = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      type: req.body.type,
      phone: req.body.phone,
      dob: req.body.dob,
      address: req.body.address,
      profile: profile,
      created_user_id: req.body.created_user_id,
    }
    const post = new User(userTdo);
    const result = await post.save();
    res
      .status(201)
      .json({ message: "Created User Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const findUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error: any = Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: user, status: 1 });
  } catch (err) {
    next(err);
  }
}

export const updateUserService = async (
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
    const user: any = await User.findById(req.params.id);
    if (!user) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    let profile: string = req.body.profile;
    if (req.file) {
      profile = req.file.path.replace("\\", "/");
    }
    if (user.profile && user.profile != profile) {
      deleteFile(user.profile);
    }

    if (profile) {
      user.profile = profile;
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.type = req.body.type;
    user.phone = req.body.phone;
    user.dob = req.body.dob;
    user.address = req.body.address;
    user.created_user_id = req.body.created_user_id;
    user.updated_user_id = req.body.updated_user_id;
    const result = await user.save();
    res.json({ message: "Updated User Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const deleteUserService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findById(req.params.id);
    if (!user) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    user.deleted_at = new Date();
    const result = await user.save();
    res.json({ message: "Delete User Successfully!", data: result, status: 1 });
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
    const userType = req.headers['userType'];
    const userId = req.headers['userId'];
    let condition: any = { deleted_at: null };
    if (userType === "User") {
      condition.created_user_id = userId;
    }
    let fromDate = req.body?.fromDate ? new Date(req.body.fromDate) : null;
    let toDate = req.body?.toDate ? new Date(req.body.toDate) : null;
    req.body?.username ? condition.name = { '$regex': req.body.username, '$options': 'i' } : '';
    req.body?.email ? condition.email = { '$regex': req.body.email, '$options': 'i' } : '';
    req.body?.fromDate && req.body?.toDate ? condition.createdAt = { $gte: fromDate, $lte: toDate } : '';
    req.body?.fromDate && !req.body?.toDate ? condition.createdAt = { $gte: fromDate, $lte: new Date() } : '';
    req.body?.toDate && !req.body?.fromDate ? condition.createdAt = { $lte: toDate } : '';
    req.body?.fromDate && req.body?.toDate && req.body?.fromDate === req.body?.toDate ?
    condition.createdAt = { $gte: moment(fromDate), $lte: moment(toDate).add(1, 'days') } : '';

    const users: any = await User.find(condition);
    const result: any = [];
    for (let i = 0; i < users.length; i++) {
      const index = users.findIndex((dist:any) => users[i]._id.equals(dist._id));
      let username = "";
      index !== -1 ? username = users[index].name : "";
      let obj: any = {
        ...users[i]._doc,
        created_username: username
      };
      result.push(obj);
    }
    res.json({ data: result, status: 1 });
  } catch (err) {
    next(err);
  }
}