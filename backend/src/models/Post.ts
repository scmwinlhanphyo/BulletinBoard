import { Schema, model } from 'mongoose';

// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
const postSchema = new Schema({
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "user"
    // },
},
    {
        timestamps: true
    }
);

export default model("post", postSchema)
