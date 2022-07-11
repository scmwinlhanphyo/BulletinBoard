"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    created_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        autopopulate: true
    },
    updated_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user"
    },
    deleted_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user"
    },
    deleted_at: {
        type: Date
    },
}, {
    timestamps: true
});
postSchema.plugin(require('mongoose-autopopulate'));
exports.default = (0, mongoose_1.model)("post", postSchema);
//# sourceMappingURL=Post.js.map