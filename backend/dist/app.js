"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_route_1 = __importDefault(require("./routes/post_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const error_1 = __importDefault(require("./middlewares/error"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require('body-parser');
dotenv_1.default.config();
const PORT = process.env.port;
const app = (0, express_1.default)();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((0, cors_1.default)());
app.get("/", (_req, res) => {
    res.json({ country: 'USA' });
});
mongoose_1.default
    .connect(process.env.DATABSE || "")
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use("/api/posts/", post_route_1.default);
    app.use("/api/", auth_route_1.default);
    app.use(error_1.default);
})
    .catch((err) => console.log(err));
//# sourceMappingURL=app.js.map