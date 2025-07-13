const AuthController = require("../controllers/AuthController")
const express = require("express")
const Router = express.Router()
const User = require("../models/User")

Router.get("/register", AuthController.registerForm)
Router.post("/register", AuthController.registerFormPost)


module.exports = Router