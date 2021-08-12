import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { index } from "./services/index";
import { authenticateToken } from "./middleware/authenticateToken";
import { postRouter } from "./routers/postRouter";
import { userRouter } from "./routers/userRouter";
import { checkEnv } from "./config/checkEnv";
import { cloudinaryConfig } from "./config/cloudinary";

require("dotenv").config();
checkEnv();
cloudinaryConfig();

const app = express();
const PORT = 3000;

mongoose.connect(process.env.DATABASE_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev")); //combined?

app.get("/", authenticateToken, index);
app.use("/users", userRouter);
app.use("/posts", authenticateToken, postRouter);

app.listen(PORT, () => {
    console.log("Listening at " + PORT);
});
