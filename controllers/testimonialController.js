const testimonials= require("../models/testimonyModel")

//add testimonial
exports.addTestimonyController= async (req,res)=>{
    console.log("inside addTestimonyController");
    const {name,email,message}=req.body
    try{
        const newTestimony=new testimonials({
            name:name,
            email:email,
            message:message
        })
        await newTestimony.save()
        res.status(200).json(newTestimony)
        
    }catch(err){
        res.status(401).json(err)
    }
}