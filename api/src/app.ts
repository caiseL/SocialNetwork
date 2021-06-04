import express from "express";
import index from "./controllers/index";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", index);

app.listen(PORT, () => {
    console.log("Listening at " + PORT);
});
