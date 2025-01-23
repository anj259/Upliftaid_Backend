const mongoose = require("mongoose");

const volunteerschema=mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true,unique: true  },
    phone_no:{ type: Number, required: true },
    message:{ type: String, required: true },
    availability:{ type: String, required: true },
    activities:{ type: String, required: true }

})


const Volunteer=mongoose.model("Volunteer",volunteerschema,"volunteer")

module.exports = Volunteer;
