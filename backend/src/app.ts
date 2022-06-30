import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import post_route from './routes/post_route';
import error from './middlewares/error';
const bodyParser = require('body-parser');

dotenv.config();

const PORT = process.env.port;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (_req, res) => {
    res.json({ country: 'USA' })
})

mongoose
    .connect(process.env.DATABSE || "")
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        app.use("/api/posts/", post_route);
        app.use(error);
    })
    .catch((err: any) => console.log(err));

