require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const donorRoutes = require("./routes/DonorRoutes");
const volunteerRoutes = require("./routes/VolunteerRoutes");
const applicationFormRoutes = require("./routes/Application_formRoutes");
const contactRoutes = require("./routes/Contactroutes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI;

mongoose
//   .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/donor", donorRoutes);
app.use("/volunteer", volunteerRoutes);
app.use("/applicationform", applicationFormRoutes);
app.use("/contact", contactRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
