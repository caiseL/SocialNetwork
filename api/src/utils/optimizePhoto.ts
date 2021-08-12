import Jimp from "jimp";
import { dataURIParser } from "./dataURIParser";

export const optimizePhoto = async (
    file: Express.Multer.File
): Promise<string> => {
    const sizeOfFile = file.size;
    const fileBuffer = file.buffer;

    const bytesInAMB = 1048576;
    const MBInPhoto = sizeOfFile / bytesInAMB;
    const maxImageSizeInMB = 5;

    if (maxImageSizeInMB > MBInPhoto) {
        console.log("A");
    } else {
    }

    const buffer = await Jimp.read(fileBuffer).then(
        async (file) =>
            await file
                .resize(500, 500)
                .quality(60)
                .getBufferAsync(Jimp.MIME_PNG)
    );

    return dataURIParser(buffer).content!;
};
