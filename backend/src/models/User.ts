import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: "post"
        }
    ]
},
    {
        timestamps: true
    }
);

export default model("user", userSchema)
