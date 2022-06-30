import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
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
    type: {
        type: String,
        enum: ['Admin', 'User']
    },
    phone: {
        type: String
    },
    dob: {
        type: Date
    },
    address: {
        type: String
    },
    profile: {
        type: String,
        default: ""
    },
    created_user_id: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    updated_user_id: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    deleted_user_id: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    deleted_at: {
        type: Date
    },
},
    {
        timestamps: true
    }
);

export default model("user", userSchema)
