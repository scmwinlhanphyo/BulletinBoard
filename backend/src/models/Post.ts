import { Schema, model } from 'mongoose';

const postSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "user",
    autopopulate: true
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

postSchema.plugin(require('mongoose-autopopulate'));
export default model("post", postSchema)
