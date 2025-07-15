const {Sequelize} = require("sequelize")
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    dialect: "mysql",
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
})

async function Connection() {
    try {
        await db.authenticate()
        console.log("Conexão realizada com sucesso!")
    } catch (error) {
        console.log(error)
    }
}

Connection()
module.exports = db