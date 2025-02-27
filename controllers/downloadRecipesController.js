const downloadRecipes = require("../models/downloadModel")

//add to download recipe
exports.addToDownloadRecipeController= async (req,res)=>{
    console.log("inside addToDownloadRecipeController");
    const {id}=req.params
    const userId= req.userId
    const {recipeName,recipeCuisine,recipeImage}=req.body
    console.log(recipeName,recipeCuisine,recipeImage);
    
    try{
        //check already in download
        const existingRecipe=await downloadRecipes.findOne({recipeId:id})
        if(existingRecipe){
            //increment count
            existingRecipe.count+=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }
        else{
            //add recipe to model
            const newRecipe= new downloadRecipes({
                recipeId:id,
                recipeName:recipeName,
                recipeCuisine:recipeCuisine,
                recipeImage:recipeImage,
                count:1,
                userId:userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)

        }
    
        
    }catch(err){
        res.status(401).json(err)
    }
}