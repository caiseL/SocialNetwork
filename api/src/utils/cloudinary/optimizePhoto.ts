import Jimp from "jimp";
import { dataURIParser } from "../dataURIParser";

export const optimizePhoto = async (
    file: Express.Multer.File
): Promise<string> => {
    const sizeOfFile = file.size;
    const fileBuffer = file.buffer;

    const bytesInAMB = 1048576;
    const MBInPhoto = sizeOfFile / bytesInAMB;
    const maxImageSizeInMB = 5;

    let ImageResized = await (await Jimp.read(fileBuffer)).resize(500, 500);

    let imageBuffer;
    if (MBInPhoto > maxImageSizeInMB) {
        console.log("Foto más de 5mb?");
        imageBuffer = await ImageResized.quality(50).getBufferAsync(
            Jimp.MIME_PNG
        );
    } else {
        imageBuffer = await ImageResized.quality(40).getBufferAsync(
            Jimp.MIME_PNG
        );
    }

    return dataURIParser(imageBuffer).content!;
};
