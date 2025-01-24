const express = require("express");
const {getAllContacts,getContactById,createContact,} = require("../controllers/ContactController");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", getContactById);

router.post("/", createContact);

module.exports = router;
