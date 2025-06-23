import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv"


dotenv.config({
    path: "./.env"
})
cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_SECRET
})

const uploadCloudinary = async (localFilePath, mimetype) => {
    try {
        let resourceType = "auto";

        if (mimetype?.startsWith("video/")) {
            resourceType = "video";
        } else if (mimetype?.startsWith("image/")) {
            resourceType = "image";
        }

        const uploader = (path, options) => {
            if (resourceType === "video") {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_large(
                        path,
                        { resource_type: "video", chunk_size: 6000000, ...options },
                        (err, result) => {
                            if (err) return reject(err);
                            return resolve(result);
                        }
                    );
                });
            } else {
                return cloudinary.uploader.upload(path, options);
            }
        };

        const result = await uploader(localFilePath, { resource_type: resourceType });


        fs.unlinkSync(localFilePath);
        return result;
    } catch (error) {

        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        return null;
    }
};


export { uploadCloudinary }