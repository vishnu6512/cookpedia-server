const express = require("express")
const recipeController = require("../controllers/recipeController")
const testimonialController = require("../controllers/testimonialController")
const userController= require("../controllers/userController")
const downloadRecipesController= require("../controllers/downloadRecipesController")
const saveRecipeController= require("../controllers/saveRecipeController")
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

//donwload recipes
router.post("/recipe/:id/download",jwtMiddleware,downloadRecipesController.addToDownloadRecipeController)

//save recipe
router.post("/recipe/:id/save",jwtMiddleware,saveRecipeController.addToSaveRecipeController)

//get user saved recipe
router.get("/get-save-recipe",jwtMiddleware,saveRecipeController.getUserSavedRecipeController)

//remove from save recipe
router.delete("/save-recipe/:id/remove",jwtMiddleware,saveRecipeController.removeSaveRecipeController)

//get user download list - needs authorisation
router.get("/user-download",jwtMiddleware,downloadRecipesController.getUserDownloadListController)

//edit user
router.post("/user/edit",jwtMiddleware,userController.editUserController)

//get all user list
router.get("/user-list",jwtMiddleware,userController.getAllUserController)

//get all download reipe list
router.get("/download-list",jwtMiddleware,downloadRecipesController.getAllDownloadRecipeController)

//get all testimonials
router.get("/testimonial-list",jwtMiddleware,testimonialController.getAllTestimonialController)

//update status of testimony
router.get("/testimonial/:id/update",jwtMiddleware,testimonialController.updateFeedbackStatusController)

//get all appproved testiony
router.get("/approved-testimonials",testimonialController.getAllApprovedTestimonyController)

//add recipe
router.post("/recipe/add",jwtMiddleware,recipeController.addRecipeController)

//edit recipe
router.put("/recipe/:id/edit",jwtMiddleware,recipeController.editRecipeController)

//delete recipe
router.delete("/recipe/:id/delete",jwtMiddleware,recipeController.deleteRecipeController)

module.exports = router