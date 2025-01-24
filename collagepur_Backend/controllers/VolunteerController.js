
const Volunteer = require("../models/Volunteer");

const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching volunteers", error: error.message });
  }
};

const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.status(200).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching volunteer", error: error.message });
  }
};

const createVolunteer = async (req, res) => {
  const { name, email, phone_no, message, availability, activities } = req.body;

  try {
    const volunteer = new Volunteer({ name, email, phone_no, message, availability, activities });
    const savedVolunteer = await volunteer.save();
    res.status(200).json({ message: "Volunteer created successfully", volunteer: savedVolunteer });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists", error: error.message });
    }
    res.status(500).json({ message: "Error saving volunteer", error: error.message });
  }
};

module.exports = {
  getAllVolunteers,
  getVolunteerById,
  createVolunteer,
};
