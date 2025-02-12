const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
