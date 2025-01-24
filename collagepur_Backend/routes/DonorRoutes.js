const express = require("express");
const {getAllDonors,getDonorById,createDonor,} = require("../controllers/DonorController");

const router = express.Router();

router.get("/", getAllDonors);

router.get("/:id", getDonorById);

router.post("/", createDonor);

module.exports = router;
