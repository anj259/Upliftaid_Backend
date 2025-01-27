const multer = require("multer");
const path = require("path");
const Applicationform = require("../models/Applicationform");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadfileMiddleware = upload.single("resume");

const getAllApplications = async (req, res) => {
  try {
    const applications = await Applicationform.find({});
    if (!applications || applications.length===0) {
      return res.status(404).json({ message: "Applications are not found" });
    }
    res.status(200).json(applications);
  } 
  catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const application = await Applicationform.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching application", error: error.message });
  }
};


const createApplication = async (req, res) => {
  const { name, email, jobposition, coverletter } = req.body;

  if (!req.file) 
    {
    return res.status(400).json({ message: "Resume file is required" });
  } 
  else if (!name || !email || !jobposition) 
    {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    const application = new Applicationform({
      name,
      email,  
      jobposition,
      resume: req.file.filename,
      coverletter,
    });

    const savedApplication = await application.save();
    res.status(200).json({
      message: "Application submitted successfully",
      name: savedApplication.name,
      applicationform: savedApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving application form", error: error.message });
  }
};


module.exports = {
  uploadfileMiddleware,
  getAllApplications,
  getApplicationById,
  createApplication,
};
