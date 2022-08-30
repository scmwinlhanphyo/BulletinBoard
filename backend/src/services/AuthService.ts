import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
// import moment from 'moment';
import bcrypt from 'bcrypt';
import User from '../models/User';
import PasswordReset from '../models/PasswordReset';
// import { use } from 'passport';
const sendEmail = require("../utils/sendEmail");


export const loginService = async (
  req: Request,
  res: Response
) => {
  User.findOne({ email: req.body.email }).then(async (user: any) => {
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Could not find user'
      })
    }

    if (!compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        messages: 'Incorrect password'
      });
    }

    const payload = {
      email: await bcrypt.hash(user.email, 12),
      id: await bcrypt.hash(user.id, 12)
    }

    const token = jwt.sign(payload, 'abcd', { expiresIn: '1d' });

    return res.status(200).send({
      success: true,
      message: 'Login Successfully!',
      user: user,
      token: token
    });
  })
}

export const logoutService = (req: any, res: Response) => {
  req.session = null;
  return res.json({ "message": "Logout Successfully" });
};

export const forgetPasswordService = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("Email does not exist");

    let token = await PasswordReset.findOne({ email: req.body.email });
    if (!token) {
      token = await new PasswordReset({
        email: req.body.email,
        token: crypto.randomBytes(16).toString("hex"),
      }).save();
    }
    const link = `${process.env.BASE_URL}/forget-password-update/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.status(200).json({
      message: "Password reset link sent to your email account."
    });
  } catch (error) {
    res.send("An error occured");
  }
};

// export const checkResetPasswordService = async (req: any, res: Response) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) return res.status(400).send("Invalid link or expired");

//     const token = await PasswordReset.findOne({
//       email: user.email,
//       token: req.params.token,
//       createdAt: { $gte: moment().subtract(1, 'hours').utc() }
//     });
//     if (!token) return res.status(400).send("Invalid link or expired");

//     user.password = req.body.password;
//     await user.save();

//     res.json({
//       message: "Forget password sucessfully."
//     });
//   } catch (error) {
//     res.send("An error occured");
//   }
// };

export const resetPasswordService = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("User Id does not exist");

    const passwordReset = await PasswordReset.findOne({
      token: req.params.token
    });
    if (!passwordReset) return res.status(400).send("Invalid link or expired");

    user.password = await bcrypt.hash(req.body.password, 12);
    await user.save();
    await passwordReset.delete();

    res.json({
      message: "Password reset sucessfully."
    });
  } catch (error) {
    res.send("An error occured");
  }
}

export const passwordChangeService = async (req: Request, res: Response) => {
  try {
    await User.findById(req.params.userId)
    .then(async (user: any) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'Could not find user'
        })
      }

      const token= req.params.token;
      if (!token) return res.status(401).send("Unauthorized");

  
      if (!compareSync(req.body.oldPassword, user.password)) {
        return res.send({
          success: false,
          message: 'Incorrect password'
        });
      }

      if(compareSync(req.body.newPassword, user.password)) {
        return res.send({
          success: false,
          message: 'Current Password and New Password are same.'
        });
      }

      user.password = await bcrypt.hash(req.body.newPassword, 12);
      await user.save();
      res.json({ message: "Password Change Successfully!" });
    })
  } catch (error) {
    res.send("An error occured");
    // next(error)
  }
}