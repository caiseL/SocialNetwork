import { v2 } from "cloudinary";

const config = v2.config;
const image = v2.image;
const uploader = v2.uploader;
const cloudinaryConfig = () =>
    config({
        secure: true,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

export { cloudinaryConfig, uploader, image };
