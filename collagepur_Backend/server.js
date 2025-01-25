require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectdb=require("./database/dbConnection");

const donorRoutes = require("./routes/donorRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const applicationFormRoutes = require("./routes/applicationformRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connectdb();

app.use("/donor", donorRoutes);
app.use("/volunteer", volunteerRoutes);
app.use("/applicationform", applicationFormRoutes);
app.use("/contact", contactRoutes);

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
