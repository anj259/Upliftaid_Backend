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
  const { name, email,phone_no, message,availability, activities} = req.body;

  const volunteer = new Volunteer({
    name,
    email,
    phone_no,
    message,
    availability,
    activities,
  });

  volunteer
    .save()
    .then((saveVolunteer) => res.status(200).json({ message: "successful", volunteer: saveVolunteer }))
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ message: "Email already exists", error: err.message });
      } else {
        return res.status(500).json({ message: "Error saving volunteer", error: err.message });
      }
    });

    
    // .catch((err) => res.status(500).json({ message: "Error saving volunteer", error: err.message }));
    // .catch((err) => {
    //   if (err.code === 11000) 
    //   {
    //     res.status(400).json({ message: "Email already exists", error: err.message });
    //   } 
    //   // else if (err.name === "ValidationError") 
    //   // {
    //   //   res.status(400).json({ message: "Validation Error", error: err.message });
    //   // } 
    //   else 
    //   {
    //     res.status(500).json({ message: "Error saving volunteer", error: err.message });
    //   }
    // });
   
   
    // .catch((err) => {
    //   console.error("Error:", err); // Log the full error
    //   if (err.code === 11000) {
    //     res.status(400).json({ message: "Email already exists", error: err.message });
    //   } else {
    //     res.status(500).json({ message: "Error saving volunteer", error: err.message });
    //   }
    // });
});

module.exports = router;
