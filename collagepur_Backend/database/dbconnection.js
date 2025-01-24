require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

const connectdb = async()=>
{
    try{
        const connect= await mongoose.connect(mongoUri);
        console.log("db connected",connect.connection.host,connect.connection.name);
       
    }catch(err)
    {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectdb;