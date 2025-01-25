const multer = require("multer");
const express = require("express");
const {uploadMiddleware,getAllApplications,getApplicationById,createApplication,} = require("../controllers/applicationformController");

const router = express.Router();

router.get("/getallApplications", getAllApplications);

router.get("/getApllication/:id", getApplicationById);

router.post("/createApplication", (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
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
}, createApplication);

module.exports = router;
