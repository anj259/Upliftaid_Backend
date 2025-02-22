// const Contact = require("../models/Contact");
const Contact=require("../models/Contact");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "Contacts are not found" });
    }
    res.status(200).json(contacts);
  } 
  catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error: error.message });
  }
};


const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } 
  catch (error) {
    res.status(500).json({ message: "Error fetching contact", error: error.message });
  }
};


const createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    const contact = new Contact({ name, email, subject, message });
    const savedContact = await contact.save();

    res.status(200).json({ message: "Contact created successfully", contact: savedContact });
  } 
  catch (error) {
    res.status(500).json({ message: "Error saving contact", error: error.message });
  }
};



module.exports = {
  getAllContacts,
  getContactById,
  createContact,
};



