"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "user"
    // },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("post", postSchema);
//# sourceMappingURL=Post.js.map