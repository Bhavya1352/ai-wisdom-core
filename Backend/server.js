require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Root route (health check)
app.get('/', (req, res) => {
  res.send('Backend is running! ✅');
});

// Port configuration
const PORT = process.env.PORT || 5001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
