import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { uploadCloudinary } from "../utils/uploadCloudnary.js";
import { apiResponseHandler } from "../utils/apiResponseHandler.js";

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiErrorHandler(false, 404, "User not found")
    }
    const accessToken = user.generateACCESSToken()
    const refreshToken = user.generateRefToken()

    user.refreshToken = refreshToken
    await user.save()

    return { accessToken, refreshToken }
}


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
    console.log(avatarLocalPath);

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiErrorHandler(false, 400, "Email and password are required")
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiErrorHandler(false, 404, "User not found")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        throw new ApiErrorHandler(false, 401, "Invalid credentials")
    }
    const tokens = await generateAccessAndRefreshTokens(user._id)
    if (!tokens) {
        throw new ApiErrorHandler(false, 500, "Error in generating tokens")
    }
    const { refreshToken, accessToken } = tokens
    const refreshTokenOptions = {
        httpOnly: true,
        secure: false,            // ✅ false for localhost
        sameSite: "lax",          // ✅ good for dev
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/",                // ✅ optional but recommended
    };

    const accessTokenOptions = {
        httpOnly: true,           // or false if you want to access in JS
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,   // 15 minutes
        path: "/"
    };

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .json(
            new apiResponseHandler(
                true,
                200,
                "Login successful"
            ))
})


const getUser = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiErrorHandler(false, 400, "user not found")
    }
    res.status(200)
        .json(
            new apiResponseHandler(
                true,
                200,
                "User fetched succesfully",
                user
            )
        )
})
export {
    registerUser,
    loginUser,
    getUser
}