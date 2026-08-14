const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello from backend",
  });
});

app.use("/api/v1/auth", userRoutes);

module.exports = app;
