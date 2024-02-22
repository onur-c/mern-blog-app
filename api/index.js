import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/User.js";
import "dotenv/config.js";

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_SECRET);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.create({ username, password });

  res.json(user);
});

app.listen(PORT);
