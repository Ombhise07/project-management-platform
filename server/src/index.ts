import express from "express";

const app = express();

app.get("/health", (_, res) => {
  res.json({ message: "API is running" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});