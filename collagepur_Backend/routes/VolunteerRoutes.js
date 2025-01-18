const express = require("express");
const Volunteer = require("../models/Volunteer");

const router = express.Router();

router.get("/", (req, res) => {
  Volunteer.find({})
    .then((Volunteer) => res.status(200).json(Volunteer))
    .catch((err) => res.status(500).json({ message: "Error fetching Volunteer", error: err.message }));
});


router.get("/:id", (req, res) => {
  Volunteer.findById(req.params.id)
    .then((Volunteer) => {
      if (!Volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
      res.status(200).json(Volunteer);
    })
    .catch((err) => res.status(500).json({ message: "Error fetching Volunteer", error: err.message }));
});


router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  const volunteer = new Volunteer({
    name,
    email,
    message,
  });

  volunteer
    .save()
    .then((saveVolunteer) => res.status(200).json({ message: "successful", volunteer: saveVolunteer }))
    .catch((err) => res.status(500).json({ message: "Error saving volunteer", error: err.message }));
});

module.exports = router;
