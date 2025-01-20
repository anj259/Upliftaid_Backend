const express = require("express");
const multer = require("multer");
const path = require("path");

const Applicationform = require("../models/Application_form");

const router = express.Router();

router.get("/", (req, res) => {
  Applicationform.find({})
    .then((applicationform) => res.status(200).json(applicationform))
    .catch((err) => res.status(500).json({ message: "Error fetching applicationform", error: err.message }));
});


router.get("/:id", (req, res) => {
  Applicationform.findById(req.params.id)
    .then((applicationform) => {
      if (!applicationform) {
        return res.status(404).json({ message: "applicationform not found" });
      }
      res.status(200).json(applicationform);
    })
    .catch((err) => res.status(500).json({ message: "Error fetching applicationform", error: err.message }));
});



// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

router.post("/", upload.single("resume"), (req, res) => {
  const { name, email, jobposition, coverletter } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  const applicationform = new Applicationform({
    name,
    email,
    jobposition,
    resume: req.file.filename, // Store the filename in the database
    coverletter,
  });

  applicationform
    .save()
    .then((savedApplication) =>
      res.status(200).json({
        message: "Application submitted successfully",
        name: savedApplication.name, 
        applicationform: savedApplication,
      })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error saving application form", error: err.message })
    );
});




// router.post("/", (req, res) => {
//   const { name, email, jobposition,resume,coverletter  } = req.body;

//   const applicationform = new Applicationform({
//     name,
//     email,
//     jobposition,
//     resume,
//     coverletter,
//   });

//   applicationform
//     .save()
//     .then((savedapplicationform) => res.status(200).json({ message: "Application submitted successful", applicationform: savedapplicationform }))
//     .catch((err) => res.status(500).json({ message: "Error saving applicationform", error: err.message }));
// });

module.exports = router;
