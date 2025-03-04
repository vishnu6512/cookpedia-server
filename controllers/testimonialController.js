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

//get all testimonials
exports.getAllTestimonialController= async (req,res)=>{
    console.log("inside getAllTestimonialController");
    try{
        const allTestimonials= await testimonials.find()
        res.status(200).json(allTestimonials)
    }catch(err){
        res.status(401).json(err)
    }
}

//update status of testimony
exports.updateFeedbackStatusController = async (req, res) => {
    console.log("inside updateFeedbackStatusController");
    const { id } = req.params;
    //get status from query string
    const status = req.query.status;
    //update status of feedback with given id
    try {
        const existingFeedback = await testimonials.findById({_id:id})
        existingFeedback.status=status
        await existingFeedback.save()
        res.status(200).json(existingFeedback);
    } catch (err) {
        res.status(401).json(err);
    }
  };

//apprved tesimonials lisst - no jwt middleware
exports.getAllApprovedTestimonyController= async (req,res)=>{
    console.log("inside getAllApprovedTestimonyController");
    try{
        const allTestimonials= await testimonials.find( {status:"approved"})
        res.status(200).json(allTestimonials)
    }catch(err){
        res.status(401).json(err)
    }
}