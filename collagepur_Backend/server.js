const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://localhost:27017/collagepur")
.then(()=>console.log("connected"))
.catch((err)=>console.log(err))



const donorschema=mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    amount:{ type: Number, required: true },
    message:{ type: String, required: true },
    paymentMethod:{ type: String, required: true },
    details: { type: Object, required: true } 
})


const Donor=mongoose.model("Donor",donorschema,"doner")


app.get("/donor",(req,res)=>
{
    Donor.find({})
    .then((Donor)=>{res.send(Donor)})
    .catch((err)=>res.send("err",err))
})
    
app.get("/donor/:id",(req,res)=>
{
    Donor.findById({"_id":req.params.id})
    .then((Donor)=>{res.send(Donor)})
    .catch((err)=>res.send("err",err))
})


app.post("/donor", (req, res) => {
    console.log("Request body:", req.body);  
  
    const { name, email, amount, message, paymentMethod, details } = req.body;
  
    const donor = new Donor({
      name,
      email,
      amount,
      message,
      paymentMethod,
      details,
    });

    console.log(donor);
  
    donor
      .save()
      .then((donor) => res.status(200).json({ message: 'Payment successful', donor }))
      .catch((err) => res.status(500).json({ message: 'Error saving donor', error: err.message }));
  });







app.listen(8880,()=>
{
    console.log("listening on 8880")
})