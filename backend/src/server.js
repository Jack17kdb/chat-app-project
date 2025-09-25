import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
	connectDB();
});
