import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiErrorHandler } from '../utils/apiErrorHandler.js';
import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'

const verifyUser = asyncHandler(async (req, _, next) => {
    const { refreshToken, accessToken } = req.cookies;
    console.log(refreshToken);


    if (!refreshToken || !accessToken) {
        throw new ApiErrorHandler(false, 401, "Unauthorized! access")
    }
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    console.log(decodedToken);

    if (!decodedToken) {
        throw new ApiErrorHandler(false, 401, "Access token is invalid or expired")
    }
    const user = await User.findById(decodedToken.id).select("-password -refreshToken")


    if (!user) {
        throw new ApiErrorHandler(false, 404, "User not found")
    }
    req.user = user;
    next();

})

export { verifyUser }