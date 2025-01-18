const mongoose = require("mongoose");

const volunteerschema=mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    message:{ type: String, required: true },
})


const Volunteer=mongoose.model("Volunteer",volunteerschema,"volunteer")

module.exports = Volunteer;
