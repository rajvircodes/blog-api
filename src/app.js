const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const morgan = require("morgan");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello from backend",
  });
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/posts", postRoutes);

module.exports = app;
