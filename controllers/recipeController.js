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

//add recipe 
exports.addRecipeController = async (req,res)=>{
    console.log("inside addRecipeController");
    const {name,image,cuisine,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,caloriesPerServing,mealType} = req.body

    try{
        const existingRecipe = await recipes.findOne({name:name})
        if(existingRecipe){
            res.status(406).json("recipe already exists")
        }else{
            const newRecipe = new recipes({
                name,
                image,
                cuisine,
                ingredients,
                instructions,
                prepTimeMinutes,
                cookTimeMinutes,
                servings,
                difficulty,
                caloriesPerServing,
                mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
        
    }catch(err){
        res.status(401).json(err)
    }
}

//editRecipe
exports.editRecipeController = async (req,res)=>{
    const {id} = req.params
    try{
        const updateRecipe = await recipes.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        )
        if(!updateRecipe){
            return res.status(404).json({message: "Recipe not found"})
        }
        res.status(200).json(updateRecipe)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

//deleteRecipe
exports.deleteRecipeController = async (req,res)=>{
    const {id} = req.params
    try{
        const deleteRecipe = await recipes.findByIdAndDelete(id)
        res.status(200).json(deleteRecipe)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}