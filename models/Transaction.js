const db = require("../db/conn")
const User = require("./User")
const {DataTypes} = require("sequelize")
const Transaction = db.define("Transaction", {
    value:{
        type: DataTypes.FLOAT,
        allowNull: false,
        validate:{
            min:0.01
        }
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Transaction)
Transaction.belongsTo(User)

module.exports = Transaction
