import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({
    message: "Hello, Server is Running Successfully",
  });
});

app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

const CONNECTION_URL = `mongodb+srv://admin:admin@cluster0.dich2jb.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Stack Overflow Server is Runnig on http://localhost:5000/`);
    })
  )
  .catch((err) => console.log(err.message));
