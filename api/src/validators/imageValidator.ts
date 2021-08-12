export const isMimeTypeValid = (mimeType: string): boolean => {
    return mimeType !== ("image/jpeg" || "image/png") ? false : true;
};
