const downloadRecipes = require("../models/downloadModel")

//add to download recipe
exports.addToDownloadRecipeController= async (req,res)=>{
    console.log("inside addToDownloadRecipeController");
    const {id}=req.params
    const userId= req.userId
    console.log("User ID:", userId);
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
                recipeName,
                recipeCuisine,
                recipeImage,
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

//to get the user downloadred recipe -needs authorisation
exports.getUserDownloadListController= async (req,res)=>{
    console.log("inside getUserDownloadListController");
    const userId= req.userId
    try{
        const allUserDownloads= await downloadRecipes.find({userId})
        res.status(200).json(allUserDownloads)
    }catch(err){
        res.status(401).json(err)
    }
}

//get all download recipe
exports.getAllDownloadRecipeController= async (req,res)=>{
    console.log("inside getAllDownloadRecipeController");
    try{
        const allDownloads= await downloadRecipes.find()
        res.status(200).json(allDownloads)
    }catch(err){
        res.status(401).json(err)
    }
}