import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDb from "./lib/ConnectDb.js";
import authRoute from "./Routes/Auth.route.js";
import booksRoute from "./Routes/Books.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ 
    origin: "https://booksearch-319j.onrender.com", 
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/auth", authRoute);
app.use("/books", booksRoute);

app.listen(port, ()=>{
    console.log(`Server is working on port ${port}`);
    connectDb();
});
