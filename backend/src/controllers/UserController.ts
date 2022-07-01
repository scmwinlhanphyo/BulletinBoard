import { Request, Response, NextFunction } from 'express'
import User from '../models/User';
import { validationResult } from 'express-validator';
import { UserCreate } from '../interfaces/User';
import bcrypt from 'bcrypt';

export const getUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // const searchText = req.query.pagination as string
        // const searchPage = req.query.page as string
        // const pagination = parseInt(searchText) : 2;
        // const page = parseInt(searchPage) : 1;
        // const users = await User.find({})
        //     .skip((page - 1) * pagination)
        //     .limit(pagination);
        // res.json({ data: users, status: 1 });

        // const users = await User.find().skip(0).limit(2).sort({ _id: -1 });
        const users = await User.find();
        res.json({ data: users, status: 1 });
    } catch (err) {
        next(err);
    }
};

export const createUser = async (
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
        // const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const userTdo: UserCreate = {
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 12),
            type: req.body.type,
            phone: req.body.phone,
            dob: req.body.dob,
            address: req.body.address,
            profile: req.body.profile,
            created_user_id: req.body.created_user_id,
        }
        // console.log('post data', postTdo);
        const post = new User(userTdo);
        const result = await post.save();
        res
            .status(201)
            .json({ message: "Created User Successfully!", data: result, status: 1 });
    } catch (err) {
        // if (!err.statusCode) {
        //     err.statusCode = 500;
        // }
        next(err);
    }
};

export const findUser = async (
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

export const updateUser = async (
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
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = hashedPassword;
        user.type = req.body.type;
        user.phone = req.body.phone;
        user.dob = req.body.dob;
        user.address = req.body.address;
        user.profile = req.body.profile;
        user.created_user_id = req.body.created_user_id;
        user.updated_user_id = req.body.updated_user_id;
        const result = await user.save();
        res.json({ message: "Updated User Successfully!", data: result, status: 1 });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (
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
        user.deleted_user_id = req.body.deleted_user_id;
        user.deleted_at = new Date();
        const result = await user.save();
        res.json({ message: "Delete User Successfully!", data: result, status: 1 });
        // await User.findByIdAndRemove(req.params.id);
        // res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};