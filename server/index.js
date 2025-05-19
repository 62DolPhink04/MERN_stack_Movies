import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import routes from "./src/routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb connected");
    server.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process with failure
  });
