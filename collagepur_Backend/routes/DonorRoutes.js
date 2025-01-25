const express = require("express");
const {getAllDonors,getDonorById,createDonor,} = require("../controllers/donorController");

const router = express.Router();

router.get("/getallDonors", getAllDonors);

router.get("/getDonor/:id", getDonorById);

router.post("/createDonor", createDonor);

module.exports = router;
