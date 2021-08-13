export function isPasswordValid(password: string): boolean {
    if (!password) return false;

    return 40 > password.length && password.length > 4;
}
