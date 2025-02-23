const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ruchithathota29:SMPNmufmUNF5ReMP@expensetrackerdb.9vmuw.mongodb.net/expensetrackerDB"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

// Import routes
const applicationsRoute = require("./routes/applications");

// Use routes
app.use("/api/applications", applicationsRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Job Application Tracker API!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
