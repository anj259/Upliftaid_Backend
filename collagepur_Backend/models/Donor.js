const mongoose = require("mongoose");

const donorschema=mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    amount:{ type: Number, required: true },
    message:{ type: String, required: true },
    paymentMethod:{ type: String, required: true },
    details: { type: Object, required: true } ,
    // image: { type: String, required: true },
    fund: { type: String, required: true },  // New field for selected fundraiser

})


const Donor=mongoose.model("Donor",donorschema,"doner")

module.exports = Donor;
