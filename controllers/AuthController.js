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
                res.render("auth/register")
                return 
            }

            if (age < 18){
                req.flash("msg", "Acesso disponível apenas para maiores de idade.")
                res.render("auth/register")
                return
            }

            const checkUser = await User.findOne({where:{email:email}})
            if(checkUser){
                req.flash("msg", "Email já registrado. Tente novamente!")
                res.render("auth/register")
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