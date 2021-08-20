class Env {
    constructor(env: NodeJS.ProcessEnv) {
        this.TOKEN_SECRET = env.TOKEN_SECRET!;
        this.DATABASE_URI = env.DATABASE_URI!;
        this.CLOUDINARY_CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME!;
        this.CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY!;
        this.CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET!;
    }

    TOKEN_SECRET: string;
    DATABASE_URI: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
}

export function checkEnv() {
    const environmentValues = new Env(process.env);

    let thereIsErrors = false;
    for (const [key, val] of Object.entries(environmentValues)) {
        if (!val) {
            console.error(`No ${key} in environment`);
            thereIsErrors = true;
        }
    }

    if (thereIsErrors) {
        console.log("You need more env variables");
        process.exit();
    }
}
