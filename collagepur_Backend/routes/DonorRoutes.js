const express = require("express");
const {getAllDonors,getDonorById,createDonor,} = require("../controllers/donorController");

const router = express.Router();

router.get("/getallDonors", getAllDonors);

router.get("/getDonor/:id", getDonorById);

router.post("/createDonor", createDonor);

// router.post("/createDonor", uploadImageMiddleware, createDonor);

module.exports = router;
