const multer = require("multer");
const express = require("express");
// const {uploadMiddleware,getAllApplications,getApplicationById,createApplication,} = require("../controllers/applicationformController");
const {getAllApplications,getApplicationById,createApplication,} = require("../controllers/applicationformController");
const uploadfileMiddleware = require("../utils/fileUpload");

const router = express.Router();

router.get("/getallApplications", getAllApplications);

router.get("/getApllication/:id", getApplicationById);


router.post("/createApplication", uploadfileMiddleware, createApplication);


module.exports = router;
