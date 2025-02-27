const recipes = require("../models/recipeModel");

//get all recipes
exports.getAllRecipeController = async (req,res)=>{
    console.log("inside getAllRecipeController");
    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }catch(err){
        res.status(401).json(err)
    }
    
}

//get a recipe by id(neeeds autorization)
exports.getARecipeController = async (req,res)=>{
    console.log("inside getARecipeController");
    //get the dynamic value from url
    const {id} = req.params
    try{
        const recipeDetails = await recipes.findById({_id:id})
        res.status(200).json(recipeDetails)
    }catch(err){
        res.status(401).json(err)
    }
    
}


//related recipe controller
exports.relatedRecipeController = async (req,res)=>{
    console.log("inside relatedRecipeController");
    const cuisine = req.query.cuisine
    try{
        const allRelatedRecipe = await recipes.find({cuisine:cuisine})
        res.status(200).json(allRelatedRecipe)
    }catch(err){
        res.status(401).json(err)
    }
}