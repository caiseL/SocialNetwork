export function isEmailValid(email: string): boolean {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!email) return false;

    const isValid = emailRegex.test(email);
    if (!isValid) return false;

    const emailSplitted = email.split("@");

    return emailSplitted[0].length > 64 ? false : true;
}
