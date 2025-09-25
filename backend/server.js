import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express()

app.get("/", (req, res) => {
	res.status(200).json({msg: "Connected successfully"})
})

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
