require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectdb=require("./database/dbconnection");

const donorRoutes = require("./routes/DonorRoutes");
const volunteerRoutes = require("./routes/VolunteerRoutes");
const applicationFormRoutes = require("./routes/Application_formRoutes");
const contactRoutes = require("./routes/Contactroutes");

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
