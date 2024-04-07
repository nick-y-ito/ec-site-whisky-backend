import express from "express";
import cors from "cors";

export const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

app.use(express.json());

app.get("/", (_, res) => {
	res.send("Hello World!");
});
