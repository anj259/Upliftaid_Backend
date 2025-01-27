const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /pdf|doc|docx/;
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedExtensions.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf, .doc, and .docx files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadfileMiddleware = (req, res, next) => {
  const singleUpload = upload.single("resume");
  singleUpload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") 
        {
        return res.status(400).json({
          message: "File size exceeds the 5MB limit",
        });
      } 
      else if (err.message.includes("Only .pdf, .doc, and .docx files are allowed")) 
        {
        return res.status(400).json({message: "Invalid file type. Only .pdf, .doc, and .docx files are allowed",});
      } 
      else 
        {
        return res.status(500).json({message: "An error occurred during file upload",error: err.message,});
      }
    }
    next();
  });
};

module.exports = uploadfileMiddleware;
