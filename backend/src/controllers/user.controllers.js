import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { uploadCloudinary } from "../utils/uploadCloudnary.js";
import { apiResponseHandler } from "../utils/apiResponseHandler.js";




const registerUser = asyncHandler(async (req, res) => {
    const { email, fullName, password } = req.body || {};


    if (!email) {
        throw new ApiErrorHandler(false, 400, "email is required")
    }
    const userExist = await User.findOne({
        $or: [{ email }, { fullName }]
    })


    if (userExist) {
        throw new ApiErrorHandler(false, 400, "User already exist")
    }


    const avatarLocalPath = req.file
    const profileObj = avatarLocalPath?.path
    const profileMimetype = profileObj?.mimetype


    if (!profileObj) {
        throw new ApiErrorHandler(false, 400, "profile is required")
    }

    const profile = await uploadCloudinary(profileObj, profileMimetype)
    if (!profile) {
        throw new ApiErrorHandler(false, 500, "Error uploading profile image to cloudnary")
    }



    const user = await User.create({
        fullName,
        password,
        profilePic: profile.url,
        profilePublicId: profile.public_id,
        email,
    })
    if (!user) {
        throw new ApiErrorHandler(false, 400, "Error creating user")
    }
    const createdUser = await User.findById(user._id).select("-password ")
    if (!createdUser) {
        throw new ApiErrorHandler(false, 500, "Error creating user")
    }


    res.status(200)
        .json(
            new apiResponseHandler(
                true,
                200,
                "Created succesfully",
                createdUser
            ))
})

export { registerUser }