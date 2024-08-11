import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// IMPORT ROUTESauthRoutes
import router from "./Authentication/index.js";
import txRouter from "./Transaction/index.js";

dotenv.config();
const app = express();
const port = 3000;

mongoose.connect(process.env.DBCONNECT);

app.use("/auth", router);
app.use("/transaction", txRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
