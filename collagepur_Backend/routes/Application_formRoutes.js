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



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /pdf|doc|docx/; 
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedExtensions.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf, .doc, and .docx files are allowed"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});


router.post("/", (req, res, next) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File size exceeds the 5MB limit",
        });
      } else if (err.message.includes("Only .pdf, .doc, and .docx files are allowed")) {
        return res.status(400).json({
          message: "Invalid file type. Only .pdf, .doc, and .docx files are allowed",
        });
      } else {
        return res.status(500).json({
          message: "An error occurred during file upload",
          error: err.message,
        });
      }
    }
    next();
  });
}, async (req, res) => {
  const { name, email, jobposition, coverletter } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  const applicationform = new Applicationform({
    name,
    email,
    jobposition,
    resume: req.file.filename, 
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
    .catch((err) => {
      if (err.code === 11000) { 
        return res.status(400).json({
          message: "Email already exists",
          error: err.message,
        });
      } else {
        return res.status(500).json({
          message: "Error saving application form",
          error: err.message,
        });
      }
    });
});

module.exports = router;

