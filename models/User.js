const db = require("../db/conn")
const {DataTypes} = require("sequelize")
const User = db.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false,
        //Validação para inserção de dados no BD
        validate: {
            min:18
        }
    }
})

module.exports = User
