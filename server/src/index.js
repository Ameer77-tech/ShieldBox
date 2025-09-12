import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import connectdb from "../config/DbConn.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../routes/authRoutes/auth.route.js";
import SectionRoutes from "../routes/protectedRoutes/SectionRoutes.js";
import ItemRoute from "../routes/protectedRoutes/ItemRoute.js";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://shield-box.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectdb();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api", SectionRoutes);
app.use("/api", ItemRoute);

app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Running");
});
