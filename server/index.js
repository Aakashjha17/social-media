import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(cors());

//every routes inside of the postRoutes will start from posts
//means we added a prefix for all routes i.e instead of '/' it will '/posts'
app.use('/posts',postRoutes)


mongoose.set("strictQuery", false);
const PORT = process.env.PORT||5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, () => console.log(`server on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));


