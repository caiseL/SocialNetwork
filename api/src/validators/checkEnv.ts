export function checkEnv() {
    const tokenSecret = process.env.TOKEN_SECRET;
    const databaseURI = process.env.ATLAS_URI;

    if (!tokenSecret) {
        console.log("NO TOKEN SECRET IN ENVIRONMENT: TOKEN_SECRET");
        throw new Error();
    }

    if (!databaseURI) {
        console.log("NO DATABASE URI IN ENVIRONMENT: ATLAS_URI");
        throw new Error();
    }
}
