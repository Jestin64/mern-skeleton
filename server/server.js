import config from "../config/config"
import app from "./express"
import mongoose, { mongo } from "mongoose"


app.listen(config.port, err => {
    if(err) { return console.log(err) }
    console.info(`Server opened at port: ${config.port}`)
})

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true })
.then(()=> {
    mongoose.connection.on('error', err=>{
        throw new Error(`Unable to connect to database: ${mongoUri}`)
    })
})
