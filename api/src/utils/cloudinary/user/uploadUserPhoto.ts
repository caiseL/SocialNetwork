import { uploader } from "../../../config/cloudinary";
import { getUserUploadRoute } from "./getUserPhotoRoute";
import { optimizePhoto } from "../optimizePhoto";

export const returnURLFromPhoto = async (
    file: Express.Multer.File,
    userID: string
): Promise<string> => {
    const optimizedFile = await optimizePhoto(file);

    console.time("Time of photo upload");
    const APIResponse = await uploader.upload(optimizedFile, {
        public_id: getUserUploadRoute(userID),
        overwrite: true,
    });
    console.log(APIResponse.public_id);

    console.timeEnd("Time of photo upload");
    return APIResponse.secure_url;
};
