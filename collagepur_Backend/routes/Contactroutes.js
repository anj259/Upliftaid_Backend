const express = require("express");
const {getAllContacts,getContactById,createContact,} = require("../controllers/contactController");

const router = express.Router();

router.get("/getallContacts", getAllContacts);

router.get("/getContact/:id", getContactById);

router.post("/createContact", createContact);

module.exports = router;
