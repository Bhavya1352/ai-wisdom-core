const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// MongoDB URI (agar DB use nahi kar rahe to yeh default chalega)
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/aiwisdom";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ----------------------------
// Example API endpoint
// ----------------------------



app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Backend 🚀' });
});


// ----------------------------
// Start the server
// ----------------------------
const PORT = process.env.PORT || 5003;
app.listen(5003, () => {
  console.log('Server running at http://localhost:${5003}');
});



