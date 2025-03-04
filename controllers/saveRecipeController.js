const saveRecipes = require("../models/saveRecipeModel")

exports.addToSaveRecipeController= async (req,res)=>{
    console.log("inside addToSaveRecipeController");
    const {id} =req.params
    const userId = req.userId
    const {name,image}=req.body
    try{
        const existingRecipe=await saveRecipes.findOne({recipeId:id,userId:userId})
        if(existingRecipe){
            res.status(406).json("selected recipe already saved. please save another recipe")
        }
        else{
            const newRecipe = new saveRecipes({
                recipeId:id,
                name:name,
                image:image,
                userId:userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//user recipe get - authorised user
exports.getUserSavedRecipeController= async (req,res)=>{
    console.log("inside getUserSavedRecipeController");
    const userId = req.userId
    try{
        const userRecipeCollection= await saveRecipes.find({userId})
        res.status(200).json(userRecipeCollection)
    }catch(err){
        res.status(401).json(err)
    }
}

//delete from save recipe
exports.removeSaveRecipeController= async (req,res)=>{
    console.log("inside removeSaveRecipeController");
    const {id} =req.params
    try{
        const removeSaveRecipe=await saveRecipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeSaveRecipe)
    }catch(err){
        res.status(401).json(err)
    }
}