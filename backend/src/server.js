import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./lib/db.js";
import cookieparser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieparser());
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
	connectDB();
});
