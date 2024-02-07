import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import router from "./router";

dotenv.config();



const app = express();

app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200,
    })
);
app.set("trust proxy", true);

app.use(
    urlencoded({
        extended: false,
    })
);
app.use(json());

app.use("/api/v1", router);


const start = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (err) {
        throw new Error("database error!");
    }

    app.listen(8080, () => console.log("server is up and running on port 8080"));
};

start();