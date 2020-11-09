const express = require("express")
const path = require("path")
const bodyparser = require("body-parser")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const compression = require("compression")
import cors from "cors"
import template from "../template"
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
import devBundle from "./devBundle" // use only for dev


const CURRENT_WORKING_DIR = process.cwd()
const app = express()
devBundle.compile(app) // use only for dev

app.use(bodyparser.json())
app.use(bodyparser.urlencoded( {extended:true} ))
app.use(cookieParser())
app.use(compression())  
app.use(helmet())
app.use(cors())
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

//mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('/', (req, res)=>{
    res.status(200).send(template())
})

//catch Unauthorized errors
app.use((err, req, res, next)=>{  // keep this parameter syntax
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({ "error": err.name +" : "+err.message})
    } else if(err){
        res.status(400).json({ "error": err.name +" : "+err.message})
        console.log(err)
    }
})


export default app
