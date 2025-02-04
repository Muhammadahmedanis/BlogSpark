import { Comment } from "../models/comment.model.js";
import { responseMessages } from "../constant/responseMessages.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
const { UNAUTHORIZED_REQUEST, GET_UNSUCCESS_MESSAGES, NO_USER, NO_DATA_FOUND, DELETED_SUCCESS_MESSAGES, UPDATE_UNSUCCESS_MESSAGES } = responseMessages;

// @desc    GETPOSTCOMMENTS
// @route   GET /api/v1/comment/:postId
// @access  User

export const getPostComments =  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if(!postId){
        throw new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
    }
    
    const comments = await Comment.find({post: postId}).populate("user", "userName img").sort({ createdAt:-1 });
    
    if(!comments){
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_DATA_FOUND);
    }

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, "", comments)); // GET_Success
})



// @desc    ADDCOMMENT
// @route   POST /api/v1/comment/:postId
// @access  Public

export const addComment =  asyncHandler(async (req, res) => {
    const id = req.user._id;
    if(!id){
        throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_REQUEST)
    }

    const { postId } = req.params;
    if(!postId){
        throw new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
    }
    
    const user = await User.findOne(id);
    if(!user){
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_USER);
    }

    const newComment = new Comment({ ...req.body, user: user._id, post: postId });
   
    const saveComment =  await newComment.save();
    return res.status(StatusCodes.CREATED).send(new ApiResponse(StatusCodes.CREATED, "", saveComment));

})



// @desc    DELETECOMMENT
// @route   DELETE /api/v1/comment/:postId
// @access  Public

export const deleteComment =  asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { role } = req.user;
    const { id } = req.params;
    
    if (!id) {
        throw new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
    }
    
    const isIdExist = await Comment.findById(id).populate("user");
    
    if (!isIdExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, GET_UNSUCCESS_MESSAGES);
    }
    
    if (isIdExist.user.role !== role) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_REQUEST);
    }
    
    const deleteComment = await Comment.findOneAndDelete({ _id: id, user: userId });
    
    if (!deleteComment) {
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_DATA_FOUND);
    }
    
    return res.status(StatusCodes.OK).send({ message: DELETED_SUCCESS_MESSAGES });    
    
})


// await Post.findOneAndDelete(id);
// return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, DELETED_SUCCESS_MESSAGES));

// const { role } = req.user;
// if(!userId){
//     throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_REQUEST)
// }

// const { id } = req.params;
// if(!id){
//     throw new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
// }

// const deleteComment = await Comment.findByIdAndDelete({id, user: userId});
// if (!deleteComment) {
//     throw new ApiError(StatusCodes.BAD_REQUEST, NO_DATA_FOUND);
// }

// return res.status(StatusCodes.OK).send(StatusCodes.OK, DELETED_SUCCESS_MESSAGES);