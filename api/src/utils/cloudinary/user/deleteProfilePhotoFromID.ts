import { uploader } from "../../../config/cloudinary";
import { getUserUploadRoute } from "./getUserPhotoRoute";

export const deleteProfilePhotoFromID = async (
    userID: string
): Promise<void> => {
    const uploadRoute = getUserUploadRoute(userID);
    await uploader.destroy(uploadRoute);
};
