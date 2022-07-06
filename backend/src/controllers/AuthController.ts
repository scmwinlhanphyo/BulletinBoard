import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const login = async (
  _req: Request,
  res: Response
) => {
  User.findOne({ email: _req.body.email }).then((user: any) => {
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Could not find user'
      })
    }

    if (!compareSync(_req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        messages: 'Incorrect password'
      });
    }

    const payload = {
      email: user.email,
      id: user.id,
    }

    const token = jwt.sign(payload, 'abcd', { expiresIn: '1d' });

    return res.status(200).send({
      success: true,
      message: 'Login Successfully!',
      user: user,
      token: token
    });
  })
};

export const logout = (req: any, res: Response) => {
  // req.logout();
  req.session = null;
  console.log('logged out', req);
  return res.json({ "message": "Logout Successfully" });
};