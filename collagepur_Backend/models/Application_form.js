const mongoose = require("mongoose");

const applicationformschema=mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    jobposition:{ type: String, required: true },
    resume:{ type: String, required: true },
    coverletter:{ type: String},
})


const Applicationform=mongoose.model("ApplicationForm",applicationformschema,"applicationform")

module.exports = Applicationform;
