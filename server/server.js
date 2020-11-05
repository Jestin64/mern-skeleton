import config from "../config/config"
import app from "./express"
import mongoose from "mongoose"


mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://AaronBaron:AaronBaron@cluster0.syfka.gcp.mongodb.net/mernproject?retryWrites=true&w=majority', { useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true })
.then(()=>{
    console.log(`Connected to MongoDB...`)
})
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})


app.listen(config.port, err => {
    if(err) { return console.log(err) }
    console.info(`Server opened at port: ${config.port}`)
})
