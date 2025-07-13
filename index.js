require("dotenv").config()
const express = require("express")
const exphbs = require("express-handlebars")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const flash = require("express-flash")
const app = express()
const conn = require("./db/conn")
const authRoutes = require("./routes/authRoutes")
const AuthController = require("./controllers/AuthController")

app.set("view engine", "handlebars")
app.engine("handlebars", exphbs.engine())

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({
    name:"session",
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    
    store: new FileStore({
        logFn: function(){},
        path: require ("path").join(require("os").tmpdir(), "sessions")
    }),
    cookie:{
        secure:false,
        maxAge: 1000 * 60 * 60 * 1,
        httpOnly: true
    }
}))

app.use((req,res,next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})

app.use("/", authRoutes)

app.use(flash())

conn.sync()
.then(()=>{
    app.listen(process.env.PORT)
    console.log("Rodando na porta")
})
.catch((error)=>{
    console.log(error)
})