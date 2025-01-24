const mongoose = require("mongoose");

const donorschema=mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    amount:{ type: Number, required: true },
    message:{ type: String, required: true },
    paymentMethod:{ type: String, required: true },
    details: { type: Object, required: true } 
})


const Donor=mongoose.model("Donor",donorschema,"doner")

module.exports = Donor;
