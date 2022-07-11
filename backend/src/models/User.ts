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
  },
  type: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User'
  },
  phone: {
    type: String,
    default: ""
  },
  dob: {
    type: Date,
    default: ""
  },
  address: {
    type: String,
    default: ""
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
