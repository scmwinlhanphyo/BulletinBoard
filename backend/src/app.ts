import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import post_route from './routes/post_route';
import user_route from './routes/user_route';
import auth_route from './routes/auth_route';
import error from './middlewares/error';
import cors from 'cors';
const bodyParser = require('body-parser');

dotenv.config();

const PORT = process.env.port;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get("/", (_req, res) => {
        res.json({ country: 'USA' })
})

mongoose
        .connect(process.env.DATABSE || "")
        .then(() => {
                app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
                app.use("/api/posts/", post_route);
                app.use("/api/users", user_route);
                app.use("/api/", auth_route);
                app.use(error);
        })
        .catch((err: any) => console.log(err));

