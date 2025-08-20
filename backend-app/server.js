import express from "express";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to handle JSON
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
