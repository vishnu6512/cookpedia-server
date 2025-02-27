const express = require("express")
const recipeController = require("../controllers/recipeController")
const testimonialController = require("../controllers/testimonialController")
const userController= require("../controllers/userController")
const jwt = require("jsonwebtoken")
const jwtMiddleware = require("../middleware/jwtMiddleware")
const router = new express.Router()

//all-recipes  http://localhost:3000/all-recipes
router.get("/all-recipes",recipeController.getAllRecipeController)

//add testimony   http://localhost:3000/add-testimony
router.post("/add-testimony",testimonialController.addTestimonyController)

//add user
router.post("/register",userController.addUserController)

//loginUser
router.post("/login",userController.loginController)

//view a single recipe by id
router.get("/recipe/:id/view",jwtMiddleware,recipeController.getARecipeController)


//related recipes
router.get("/related-recipe",jwtMiddleware,recipeController.relatedRecipeController)
module.exports = router