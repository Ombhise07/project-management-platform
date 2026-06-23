import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./auth/auth.routes.js";

import userRoutes from "./routes/user.routes.js";

import workspaceRoutes from "./workspace/workspace.routes.js";
import projectRoutes from "./project/project.routes.js";
import taskRoutes from "./task/task.routes.js";
import commentRoutes from "./comment/comment.routes.js";

import path from "path";
import attachmentRoutes from "./attachment/attachment.routes.js";

import notificationRoutes from "./notification/notification.routes.js";

import dashboardRoutes from "./dashboard/dashboard.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/health", (_, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);

app.use("/api/attachments", attachmentRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
