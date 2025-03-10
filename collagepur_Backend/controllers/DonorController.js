const Donor = require("../models/Donor");

const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find({});
    if (!donors ||donors.length === 0) {
      return res.status(404).json({ message: "Donors are not found" });
    }
    res.status(200).json(donors);
  } 
  catch (error) {
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
  } 
  catch (error) {
    res.status(500).json({ message: "Error fetching donor", error: error.message });
  }
};

const createDonor = async (req, res) => {
  const { name, email, amount, message, paymentMethod, details,fund  } = req.body;

  if (!name || !email || !amount || !message || !paymentMethod || !details || !fund) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    const donor = new Donor({ name, email, amount, message, paymentMethod, details,fund  });
    const savedDonor = await donor.save();
    res.status(200).json({ message: "Payment successful", donor: savedDonor });
  } 
  catch (error) {
    res.status(500).json({ message: "Error saving donor", error: error.message });
  }
};


// const createDonor = async (req, res) => {
//   const { name, email, amount, message, paymentMethod, details } = req.body;

//   if (!name || !email || !amount || !message || !paymentMethod || !details) {
//     return res.status(400).json({ message: "All fields are mandatory" });
//   }

//   // Check if an image was uploaded
//   const image = req.file ? req.file.filename : null;

//   if (!image) {
//     return res.status(400).json({ message: "Image upload is required" });
//   }

//   try {
//     const donor = new Donor({
//       name,
//       email,
//       amount,
//       message,
//       paymentMethod,
//       details,
//       image, // Store image filename
//     });

//     const savedDonor = await donor.save();
//     res.status(200).json({ message: "Payment successful", donor: savedDonor });
//   } catch (error) {
//     res.status(500).json({ message: "Error saving donor", error: error.message });
//   }
// };


module.exports = {
  getAllDonors,
  getDonorById,
  createDonor,
};
