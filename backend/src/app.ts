import express, { Request } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import post_route from './routes/post_route';
import user_route from './routes/user_route';
import auth_route from './routes/auth_route';
import error from './middlewares/error';
import cors from 'cors';
import multer, { FileFilterCallback } from 'multer';
import { v4 } from 'uuid';
import path from "path";
import passport from 'passport';
import { rootDir } from "./utils";
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./config/passport');


dotenv.config();

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "apiuploads");
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}_${file.originalname}`);
    // cb(null, file.fieldname + '-' + Date.now());
  },
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const PORT = process.env.port;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(multer({ storage: fileStorage, fileFilter }).single("profile"));
app.use("/apiuploads", express.static(path.join(rootDir, "apiuploads")));
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (_req, res) => {
  res.json({ country: 'USA' })
})

mongoose
  .connect(process.env.DATABSE || "")
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    app.use('/api/users', passport.authenticate('jwt', { session: false }), user_route);
    app.use('/api/posts', passport.authenticate('jwt', { session: false }), post_route);
    app.use("/api", auth_route);
    app.use(error);
  })
  .catch((err: any) => console.log(err));

