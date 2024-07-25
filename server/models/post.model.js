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
      default:
        "https://img.freepik.com/free-vector/blogging-social-media-concept_23-2148642667.jpg?t=st=1721903984~exp=1721907584~hmac=4bb671b29d4949accabfa1f811036fa91e1e75bd479498745fb83f67ae940e4d&w=1380",
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
