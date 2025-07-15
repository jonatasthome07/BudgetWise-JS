const User = require("../models/User")
const bcrypt = require("bcryptjs")

module.exports = class AuthController{
    static registerForm (req,res){
        res.render("auth/register")
    }

    static async registerFormPost(req,res){
        try {
            const {name, email, password, confirmpassword, age} = req.body
            
            if (password != confirmpassword){
                req.flash("msg", "As senhas devem ser iguais. Tente novamente!")
                res.redirect("/register")
                return 
            }

            if (age < 18){
                req.flash("msg", "Acesso disponível apenas para maiores de idade.")
                res.redirect("/register")
                return
            }

            const salt = bcrypt.genSaltSync(10)
            const hashedPass = bcrypt.hashSync(password, salt)
            const user = {name, email, password:hashedPass, age}
            await User.create(user)
            res.redirect("/register")

        } 
        catch (error) {
            console.log(error)
        }
    }
}