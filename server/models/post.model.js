import mongoose, { Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url_of_image = `${process.env.FRONTEND_URL}/src/assets/imgs/post_picture.png`;

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    keywords: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: url_of_image,
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
