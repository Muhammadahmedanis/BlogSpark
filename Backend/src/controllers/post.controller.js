import { Post } from "../models/post.model.js";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseMessages } from "../constant/responseMessages.js";
const { GET_UNSUCCESS_MESSAGES, GET_SUCCESS_MESSAGES, EMPTY_PARAMS, MISSING_FIELDS, CREATE_SUCCESS_MESSAGES, DUPLICATE_SLUG, DELETED_SUCCESS_MESSAGES, } = responseMessages;
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

// @desc    CREATEPOST
// @route   POST /api/v1/post/create
// @access  User

export const createPost = asyncHandler(async (req, res) => {
    const {user, title, slug, content } = req.body;
    if([user, title, slug, content].some((field) => typeof field !== "string" || field.trim() === "")){
        throw new ApiError(StatusCodes.BAD_REQUEST, MISSING_FIELDS);
    };

    const isSlugExist = await Post.findOne({ slug });
    if(isSlugExist){
        throw new ApiError(StatusCodes.BAD_REQUEST, DUPLICATE_SLUG);
    };

    const newPost = new Post(req.body);
    const post = await newPost.save();
    return res.status(StatusCodes.CREATED).send(new ApiResponse(StatusCodes.CREATED, CREATE_SUCCESS_MESSAGES, post));
})


// @desc    GETPOSTS
// @route   GET /api/v1/post/
// @access  Public

export const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find();
    if(!posts){
        throw new ApiError(StatusCodes.BAD_REQUEST, GET_UNSUCCESS_MESSAGES);
    };
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, GET_SUCCESS_MESSAGES, posts));
})



// @desc    GETPOST
// @route   DELETE /api/v1/post/:slug
// @access  User

export const getPost = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    if(!slug){
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_PARAMS);
    };

    const post = await Post.findOne({ slug });
    if(!post){
        throw new ApiError(StatusCodes.BAD_REQUEST, GET_UNSUCCESS_MESSAGES);
    };
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, GET_SUCCESS_MESSAGES, post));
})



// @desc    DELETE
// @route   DELETE /api/v1/post/:id
// @access  User

export const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // todo implemnt admin work also
    if(!id){
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_PARAMS);
    };
    
    const isIdExist = await Post.findByIdAndDelete(id);
    if(!isIdExist){
        throw new ApiError(StatusCodes.BAD_REQUEST, GET_UNSUCCESS_MESSAGES);
    };

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, DELETED_SUCCESS_MESSAGES));
})