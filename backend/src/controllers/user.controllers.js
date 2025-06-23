import { User } from "../../../../backend/src/models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiErrorHandler } from "../utils/apiErrorHandler.js"




const registerUser = asyncHandler(async (req, res) => {
    const { email, fullName, password } = req.body;
    const userExist = await User.findOne({
        $or: [{ email }, { fullName }]
    })
    if (userExist) {
        throw new apiErrorHandler(400, "User already exist")
    }
    const avatarLocalPath = req.files?.avatar?.[0].path

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)



    const user = await User.create({
        fullName,
        password,
        userName,
        avatar: avatar.url,
        avatarPublicId: avatar.public_id,
        email,
    })
    if (!user) {
        throw new apiError(400, "Error creating user")
    }
    const createdUser = await User.findById(user._id).select("-password ")
    if (!createdUser) {
        throw new apiError(500, "Error creating user")
    }


    res.status(200)
        .json(
            new apiResponse(
                200,
                "Created succesfully",
                createdUser
            ))
})