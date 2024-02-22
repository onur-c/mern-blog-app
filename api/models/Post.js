import mongoose, { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    author: String,
    title: String,
    description: String,
    content: String,
    image: String,
  },
  {
    timestamps: true,
  }
);
const PostModel = model("Post", PostSchema);

export default PostModel;
