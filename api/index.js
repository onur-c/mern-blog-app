import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/User.js";
import "dotenv/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import PostModel from "./models/Post.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 4000;
const app = express();
const salt = bcrypt.genSaltSync();
const jwtSecret = process.env.JWT_SECRET;
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGO_SECRET);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("This username already exists.");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    const passValid = bcrypt.compareSync(password, user.password);
    if (passValid) {
      jwt.sign({ username, id: user._id }, jwtSecret, {}, (error, token) => {
        if (error) throw new Error(error.message);
        res.status(200).cookie("token", token).json({ id: user._id, username });
      });
    } else {
      res.status(400).json("Wrong credentials.");
    }
  } catch (error) {}
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (error, info) => {
      if (error) throw new Error(error.message);
      res.json(info);
    });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post(
  "/create",
  uploadMiddleware.single("uploadedImg"),
  async (req, res) => {
    try {
      const { author, title, description, content } = req.body;
      if (!content) {
        throw new Error("Content is missing");
      }
      const { originalname, path } = req.file;
      const fileParts = originalname.split(".");
      const fileType = fileParts[fileParts.length - 1];
      const newPath = path + "." + fileType;
      fs.renameSync(path, newPath);

      const post = await PostModel.create({
        author,
        title,
        description,
        content,
        image: newPath,
      });

      res.status(200).json(post);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
);

app.get("/posts", async (req, res) => {
  const posts = await PostModel.find().sort({ createdAt: -1 }).limit(20);
  res.status(200).json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json("Could not find post by given id.");
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
