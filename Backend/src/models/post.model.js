import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    desc:{
        type: String,
    },
    category:{
        type: String,
        default: "general",
    },
    content: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    visit: {
        type: Number,
        default: 0,
    },


}, {timestamps: true})

export const Post = mongoose.model("Post", postSchema);