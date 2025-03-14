import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { responseMessages } from "../constant/responseMessages.js";
const { GET_UNSUCCESS_MESSAGES, UPDATE_UNSUCCESS_MESSAGES, EMPTY_URL_PARAMS, MISSING_FIELDS, CREATE_SUCCESS_MESSAGES, DUPLICATE_SLUG, DELETED_SUCCESS_MESSAGES, UNAUTHORIZED_REQUEST, ADMIN_ACCESS, ADD_SUCCESS_MESSAGES, NO_DATA_FOUND, NO_USER, IMAGE_ERROR} = responseMessages;
// import ImageKit from "imagekit";



// @desc    CREATEPOST
// @route   POST /api/v1/post/create
// @access  User

export const createPost = asyncHandler(async (req, res) => {
    const id = req.user?._id;
    if (!id) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_REQUEST);
    }

    const { title, content } = req.body;
    if ([title, content].some((field) => typeof field !== "string" || field.trim() === "")) {
        throw new ApiError(StatusCodes.BAD_REQUEST, MISSING_FIELDS);
    }

    const imgFile = req.file; // If using `upload.single("image")`
    if (!imgFile) {
        throw new ApiError(StatusCodes.BAD_REQUEST, IMAGE_ERROR);
    }

    // Upload image to Cloudinary (or any other service)
    const uploadedImage = await uploadOnCloudinary(imgFile.path);
    if (!uploadedImage) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Image upload failed!");
    }

    // Generate slug
    const slug = title.replace(/ /g, "-").toLowerCase();
    const isSlugExist = await Post.findOne({ slug });
    if (isSlugExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, DUPLICATE_SLUG);
    }

    // Create and save the new post
    const newPost = new Post({
        title,
        content,
        img: uploadedImage.secure_url, // Save the uploaded image URL
        user: id,
        slug
    });

    const post = await newPost.save();
    return res.status(StatusCodes.CREATED).send(new ApiResponse(StatusCodes.CREATED, CREATE_SUCCESS_MESSAGES, post));
});





// @desc    GETPOSTS
// @route   GET /api/v1/post/
// @access  Public

export const getPosts = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    // Queries
    const query = {};

    const category = req.query.cat;
    const author = req.query.author;
    const searchQuery = req.query.search;
    const sortQuery = req.query.sort;
    const featuredPost = req.query.featuredPost;

    if(category){
        query.category = category;
    };
    if (searchQuery) {
        query.title = {$regex:searchQuery, $options: "i"};
    };
    if (author) {
        const user = await User.findOne({userName: author}).select("_id");
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
        };

        query.user = user._id;
    };

        let sortObj = { createdAt: -1 };
        if (sortQuery) {
            switch (sortQuery) {
                case "newest":
                    sortObj = { createdAt: -1 };
                    break;
                case "oldest":
                    sortObj = { createdAt: 1 };
                    break;
                case "popular":
                    sortObj = { visit: -1 };
                    break; 
                case "trending":
                    sortObj = { visit: -1 };
                    query.createdAt = {
                        $gte: new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),
                    };
                    break;
                default:
                    break;
            }
        }

    const totalPosts = await Post.countDocuments();
    const hasMore = page * limit < totalPosts;

    if (featuredPost) {
        query.isFeatured = true
    }
    
    const posts = await Post.find(query)
    .populate("user", "userName img")
    .sort(sortObj) 
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();
    
    if(!posts){
        throw new ApiError(StatusCodes.BAD_REQUEST, GET_UNSUCCESS_MESSAGES);
    };
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, "" ,{posts, hasMore}));
})



// @desc    GETPOSTBYSearch
// @route   DELETE /api/v1/post/:slug
// @access  User

export const getPostBySearchParams = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    if(!slug){
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_URL_PARAMS);
    };

    const post = await Post.findOneAndUpdate( { slug }, { $inc: { visit: 1 } }, { new: true } ).populate("user", "userName img").lean();
    if(!post){
        throw new ApiError(StatusCodes.BAD_REQUEST, GET_UNSUCCESS_MESSAGES);
    };
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, "", post));
})
// GET_SUCCESS_MESSAGES



// @desc    DELETE
// @route   DELETE /api/v1/post/:id
// @access  User

export const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    
    if(!id){
        throw new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
    };
    const isIdExist = await Post.findById(id).populate("user");
    console.log(isIdExist.user.role);
    
    if(!isIdExist){
        throw new ApiError(StatusCodes.BAD_REQUEST, GET_UNSUCCESS_MESSAGES);
    };

    if(isIdExist.user.role === role || role === "admin"){
        throw new ApiError(StatusCodes.BAD_REQUEST, UNAUTHORIZED_REQUEST);
    };

    await Post.findOneAndDelete(id);
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, DELETED_SUCCESS_MESSAGES));
})




// @desc    PATCH
// @route   DELETE /api/v1/post/featured
// @access  User

export const featuredPost =  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const postId = req.body.postId;
    const { role } = req?.user
    if(!userId || !role){
        throw new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
    };

    if(role !== "user"){
        throw new ApiError(StatusCodes.BAD_REQUEST, ADMIN_ACCESS);
    };

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_DATA_FOUND);
    }

    const isFeatured = post?.isFeatured;
    const updatedPost = await Post.findByIdAndUpdate(postId, {
        isFeatured: !isFeatured,
    },
     {new: true}
)

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, isFeatured ?  DELETED_SUCCESS_MESSAGES : ADD_SUCCESS_MESSAGES , updatedPost));
})




// @desc    GET
// @route   GET /api/v1/post/
// @access  Admin

export const AllPost = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if(!role && role !== "admin"){
        throw new ApiError(StatusCodes.BAD_REQUEST, ADMIN_ACCESS);
    };
    
    const getPost = await Post.find();
    
    if (!getPost) {
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_USER);
    }
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, "", getPost));
});




// @desc    GET-MY-SAVED-POST
// @route   GET /api/v1/post/
// @access  Private

export const getSaveBlog =  asyncHandler(async (req, res) => {
    const userId = req?.user?._id;
    if(!userId){
        throw new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
    };

    const userSaveBlog = await User.findById(userId) .populate({
        path: "savedPosts",
        select: "img title slug desc category content _id" // Only include necessary fields
    })
    .select("-password -email -role -isVerified -__v -refreshToken"); // Exclude unnecessary user fields
    
if (!userSaveBlog || !userSaveBlog.savedPosts.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, NO_DATA_FOUND);
}
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, "", userSaveBlog));
})




// @desc    GET-MY-SAVED-POST
// @route   GET /api/v1/post/
// @access  Private

export const getMyBlog = async (req, res) => {
    const userId = req?.user?._id;
    if(!userId){
        throw new ApiError(StatusCodes.BAD_REQUEST, UPDATE_UNSUCCESS_MESSAGES);
    };

    const myBlog = await Post.find({user: userId}).populate("user","userName img");
    
    if (!myBlog.length) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_DATA_FOUND);
    };
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, "", myBlog));
}















// const imagekit = new ImageKit({
//     urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
//     publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
// });
// export const uploadAuth = async (req, res) => {
//     const result = imagekit.getAuthenticationParameters();
//     return res.json(result)
// }