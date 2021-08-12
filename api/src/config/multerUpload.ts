import multer from "multer";

const storage = multer.memoryStorage();
const multerUpload = (fileName: string) => multer({ storage }).single(fileName);

export { multerUpload };
