"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_route_1 = __importDefault(require("./routes/post_route"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const error_1 = __importDefault(require("./middlewares/error"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const utils_1 = require("./utils");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./config/passport');
dotenv_1.default.config();
const fileStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "apiuploads");
    },
    filename: (_req, file, cb) => {
        cb(null, `${(0, uuid_1.v4)()}_${file.originalname}`);
        // cb(null, file.fieldname + '-' + Date.now());
    },
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const PORT = process.env.port;
const app = (0, express_1.default)();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((0, cors_1.default)());
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).single("profile"));
app.use("/apiuploads", express_1.default.static(path_1.default.join(utils_1.rootDir, "apiuploads")));
app.use(cookieParser());
app.use(passport_1.default.initialize());
app.get("/", (_req, res) => {
    res.json({ country: 'USA' });
});
mongoose_1.default
    .connect(process.env.DATABSE || "")
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use('/api/users', passport_1.default.authenticate('jwt', { session: false }), user_route_1.default);
    app.use('/api/posts', passport_1.default.authenticate('jwt', { session: false }), post_route_1.default);
    app.use("/api", auth_route_1.default);
    app.use(error_1.default);
})
    .catch((err) => console.log(err));
