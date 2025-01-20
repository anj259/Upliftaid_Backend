const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const donorRoutes = require("./routes/DonorRoutes");
const volunteerRoutes=require("./routes/VolunteerRoutes");
const applicationform=require("./routes/Application_formRoutes");
const contact =require("./routes/Contactroutes");


const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://localhost:27017/collagepur")
.then(()=>console.log("connected"))
.catch((err)=>console.log(err))


app.use("/donor", donorRoutes);

app.use("/volunteer",volunteerRoutes);

app.use("/applicationform",applicationform);

app.use("/contact",contact);



app.listen(8880,()=>
{
    console.log("listening on 8880")
})