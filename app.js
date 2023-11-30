import express from 'express'
import Hello from './hello.js';
import Lab5 from './lab5.js';
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import "dotenv/config";
import UserRoutes from './users/routes.js';
import mongoose from "mongoose";
import session from "express-session";
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas-cs5610-fa23");


const app = express()
app.use(cors(
    {
        credentials: true,
        origin: '*',
        // origin: process.env.FRONTEND_URL
      }     
));
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


app.use(express.json());

UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app); 
Hello(app);


app.listen(4000);

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas-cs5610-fa23'
mongoose.connect(CONNECTION_STRING);