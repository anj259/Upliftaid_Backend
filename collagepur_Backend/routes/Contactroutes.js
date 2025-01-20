const express = require("express");
const Contact = require("../models/contact");

const router = express.Router();

router.get("/", (req, res) => {
  Contact.find({})
    .then((Contact) => res.status(200).json(Contact))
    .catch((err) => res.status(500).json({ message: "Error fetching Contact", error: err.message }));
});


router.get("/:id", (req, res) => {
  Contact.findById(req.params.id)
    .then((Contact) => {
      if (!Contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json(Contact);
    })
    .catch((err) => res.status(500).json({ message: "Error fetching Contact", error: err.message }));
});


router.post("/", (req, res) => {
  const { name, email,subject, message } = req.body;

  const contact = new Contact({
    name,
    email,
    subject,
    message,
  });

  contact
    .save()
    .then((saveContact) => res.status(200).json({ message: "successful",name:contact.name, Contact: saveContact }))
    .catch((err) => res.status(500).json({ message: "Error saving Contact", error: err.message }));
});

module.exports = router;
