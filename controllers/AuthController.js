const User = require("../models/User")

module.exports = class AuthController{
    static showForm (req,res){
        res.render("auth/register")
    }
}