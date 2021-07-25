export function isEmailValid(email: string): boolean {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!email) return false;

    let isValid = emailRegex.test(email);
    if (!isValid) return false;

    let emailSplitted = email.split("@");

    if (emailSplitted[0].length > 64) {
        return false;
    }

    return true;
}
