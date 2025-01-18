const express = require("express");
const Donor = require("../models/Doner");

const router = express.Router();

router.get("/", (req, res) => {
  Donor.find({})
    .then((donors) => res.status(200).json(donors))
    .catch((err) => res.status(500).json({ message: "Error fetching donors", error: err.message }));
});


router.get("/:id", (req, res) => {
  Donor.findById(req.params.id)
    .then((donor) => {
      if (!donor) {
        return res.status(404).json({ message: "Donor not found" });
      }
      res.status(200).json(donor);
    })
    .catch((err) => res.status(500).json({ message: "Error fetching donor", error: err.message }));
});


router.post("/", (req, res) => {
  const { name, email, amount, message, paymentMethod, details } = req.body;

  const donor = new Donor({
    name,
    email,
    amount,
    message,
    paymentMethod,
    details,
  });

  donor
    .save()
    .then((savedDonor) => res.status(200).json({ message: "Payment successful", donor: savedDonor }))
    .catch((err) => res.status(500).json({ message: "Error saving donor", error: err.message }));
});

module.exports = router;
