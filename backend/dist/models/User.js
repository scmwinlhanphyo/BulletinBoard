"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: ""
    },
    posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=User.js.map