const express = require("express")
const bodyparser = require("body-parser")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const compression = require("compression")
const cors = require("cors")
import template from "../template"


const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded( {extended:true} ))
app.use(cookieParser())
app.use(compression())
app.use(helmet())
app.use(cors())

app.get('/', (req, res)=>{
    res.status(200).send(template())
})


export default app
