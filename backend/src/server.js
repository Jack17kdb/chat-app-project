import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./lib/db.js";
import { logger, errorLogger } from "./middleware/logger.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socketio.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorLogger);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
  connectDB();
});
