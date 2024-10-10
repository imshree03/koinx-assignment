const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cryptoRoutes = require("./routes/cryptoRoutes");
const runCryptoJob = require("./jobs/cryptoJob");
const cron = require("node-cron");

dotenv.config();
connectDB();

const app = express();

// API routes
app.use("/api", cryptoRoutes);

// Run the job every 2 hours
cron.schedule('0 */2 * * *', runCryptoJob);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
