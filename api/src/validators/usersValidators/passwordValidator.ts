export function isPasswordValid(password: string): boolean {
    if (!password) return false;

    if (password.length > 40) {
        return false;
    }
    return true;
}
