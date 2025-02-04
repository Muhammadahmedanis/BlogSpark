import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseMessages } from "../constant/responseMessages.js";
const { UNAUTHORIZED_REQUEST, UPDATE_UNSUCCESS_MESSAGES, ADD_UNSUCCESS_MESSAGES, ADD_SUCCESS_MESSAGES, NO_USER } = responseMessages
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// @desc    GET-SAVED-USER-POST
// @route   GET /api/v1/user/saved
// @access  User

export const getUserSavedPost = asyncHandler(async (req, res) => {
    const id = req.user._id;
    
    if(!id){
        throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_REQUEST)
    };
    
    const user = await User.findOne(id);
    
    if (!user) {
        throw new ApiError(StatusCodes.UNAUTHORIZED,NO_USER );
    };

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, "", user.savedPosts));
})




// @desc    SAVE-USER-POST
// @route   GET /api/v1/user/save
// @access  User

export const saveUserPost = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const postId = req.body.postId;
    
    if(!id){
        throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_REQUEST)
    };

    if (!postId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
    }
    const user = await User.findOne(id);
    
    const isSaved = user?.savedPosts.some(post => post === postId);
    
    if(!isSaved){
        await User.findByIdAndUpdate(user._id, {
            $push: { savedPosts: postId }
        });
    }else{
        await User.findByIdAndUpdate(user._id, {
            $pull: { savedPosts: postId }
        }); 
    };

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, isSaved ?  ADD_UNSUCCESS_MESSAGES : ADD_SUCCESS_MESSAGES ))
})