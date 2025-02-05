import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseMessages } from "../constant/responseMessages.js";
const { UNAUTHORIZED_REQUEST, UPDATE_UNSUCCESS_MESSAGES, ADD_UNSUCCESS_MESSAGES, UPDATE_SUCCESS_MESSAGES, ADD_SUCCESS_MESSAGES, NO_USER, ADMIN_ACCESS } = responseMessages
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



// @desc    GET
// @route   GET /api/v1/user/
// @access  Admin

export const getAlluser = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if(!role && role !== "admin"){
        throw new ApiError(StatusCodes.BAD_REQUEST, ADMIN_ACCESS);
    };

    const getUser = await User.find();
    if (!getUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_USER);
    }
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, "", getUser));
});




// @desc    PUT
// @route   put /api/v1/admin/updateUser/:id
// @access  Admin

export const updateUser = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if(!role && role !== "admin"){
        throw new ApiError(StatusCodes.BAD_REQUEST, ADMIN_ACCESS);
    };

    const { userId } = req.params;
    if(!userId){
        return new ApiError(StatusCodes.BAD_REQUEST, UPDATE_SUCCESS_MESSAGES);
    };

    if(Object.keys(req.body).length === 0){
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_DATA_FOUND)
    }

    const isUser = await User.findByIdAndUpdate(userId,
        { $set: req.body }, 
        { new: true, runValidators: true  }
    );
    if(!isUser){
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_USER);
    }
    console.log(isUser);

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, UPDATE_SUCCESS_MESSAGES));
})



// @desc    DELETE
// @route   DELETE /api/v1/admin/delete/
// @access  Admin

export const deleteUser = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if(!role && role !== "admin"){
        throw new ApiError(StatusCodes.BAD_REQUEST, ADMIN_ACCESS);
    };

    const { userId } = req.params;

    if(!userId){
        return new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
    };

    const isUser = await User.findByIdAndDelete(userId);
    if(!isUser){
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_USER);
    };

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, DELETED_SUCCESS_MESSAGES));
})