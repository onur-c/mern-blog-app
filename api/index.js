import express from "express";
import cors from "cors";
const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { userName, password } = req.body;
  res.json({
    requestData: { userName, password },
  });
});

app.listen(PORT);
