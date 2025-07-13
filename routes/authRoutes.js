const AuthController = require("../controllers/AuthController")
const express = require("express")
const Router = express.Router()
const User = require("../models/User")

Router.get("/", AuthController.showForm)

module.exports = Router