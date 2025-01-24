
const express = require("express");
const {getAllVolunteers,getVolunteerById,createVolunteer,} = require("../controllers/VolunteerController");

const router = express.Router();

router.get("/", getAllVolunteers);

router.get("/:id", getVolunteerById);

router.post("/", createVolunteer);

module.exports = router;
