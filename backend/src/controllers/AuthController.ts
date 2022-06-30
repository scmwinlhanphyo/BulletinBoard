import { Request, Response } from 'express';

export const login = async (
  _req: Request,
  res: Response,
  // next: NextFunction
) => {
  console.log('login');
  res.json({ message: "Login Successful" });
  // try {
  //   // const posts = await Post.find()
  //   res.json({ message: "Login Successful" });
  // } catch (err) {
  //   next(err);
  // }
};