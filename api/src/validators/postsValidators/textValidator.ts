export function isTextValid(text: string): boolean {
    if (!text) return false;

    return 255 > text.length;
}
