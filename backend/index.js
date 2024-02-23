import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import PostModel from "./models/Post.js";
import UserModel from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;
const app = express();
const salt = bcrypt.genSaltSync();
const jwtSecret = process.env.JWT_SECRET;
const uploadMiddleware = multer({ dest: "backend/uploads/" });

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.static(path.join(path.resolve(), "/frontend/dist")));

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
  } catch (error) {
    res.status(400).json("User does not exist.");
  }
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
      const { originalname, path } = req.file;
      const fileParts = originalname.split(".");
      const fileType = fileParts[fileParts.length - 1];
      const newPath = path + "." + fileType;
      console.log(newPath);
      fs.renameSync(path, newPath);
      const { token } = req.cookies;
      jwt.verify(token, jwtSecret, {}, async (err, info) => {
        if (err) throw new Error("Invalid token.");

        const { author, title, description, content } = req.body;
        if (!content) {
          throw new Error("Content is missing");
        }
        const post = await PostModel.create({
          author,
          title,
          description,
          content,
          image: newPath.split("backend\\").pop(),
        });
        res.status(200).json(post);
      });
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

app.put("/post", uploadMiddleware.single("uploadedImg"), async (req, res) => {
  const { originalname, path } = req.file;
  const fileParts = originalname.split(".");
  const fileType = fileParts[fileParts.length - 1];
  const newPath = path + "." + fileType;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) throw new Error("Invalid token.");

    const { author, title, description, content } = req.body;
    if (!content) {
      throw new Error("Content is missing");
    }

    const post = await PostModel.findOne({ author });

    const isAuthor = post.author === info.username;

    if (!isAuthor) res.status(400).json("Wrong credentials. Not the author.");

    await post.updateOne({
      title,
      description,
      content,
      image: newPath ? newPath : post.image,
    });

    res.json(post);
  });
});
// app.get("*", (req, res) => {
//   res.sendFile(path.join(path.resolve(), "frontend", "dist", "index.html"));
// });

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  mongoose.connect(process.env.MONGO_SECRET);
});
