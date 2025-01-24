const Donor = require("../models/Doner");

const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find({});
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error: error.message });
  }
};

const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donor", error: error.message });
  }
};

const createDonor = async (req, res) => {
  const { name, email, amount, message, paymentMethod, details } = req.body;

  try {
    const donor = new Donor({ name, email, amount, message, paymentMethod, details });
    const savedDonor = await donor.save();
    res.status(200).json({ message: "Payment successful", donor: savedDonor });
  } catch (error) {
    res.status(500).json({ message: "Error saving donor", error: error.message });
  }
};

module.exports = {
  getAllDonors,
  getDonorById,
  createDonor,
};
