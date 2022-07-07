import { Schema, model } from 'mongoose';

const passwordResetSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
},
  {
    timestamps: true
  }
);

export default model("passwordReset", passwordResetSchema)
