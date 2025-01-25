
const express = require("express");
const {getAllVolunteers,getVolunteerById,createVolunteer,} = require("../controllers/volunteerController");

const router = express.Router();

router.get("/getallVolunteers", getAllVolunteers);

router.get("/getVolunteer/:id", getVolunteerById);

router.post("/createVolunteer", createVolunteer);

module.exports = router;
