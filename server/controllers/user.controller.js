import User from "../models/user.model"
import errorHandler from "./error.controller"
import {extend} from "lodash"


//api/users
const list = async (req, res)=> {
    try{
        let users = await new User.find().select('name email updated created')
        return res.json(users)
    } catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const create = async (req, res)=> {
    let users = new User(req.body)
    try{
        await users.save()
        return res.status(200).json({
            message: 'Sign up successful'
        })
    } catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

//loading data based on id from the database before being used to read, update and removed
const userById = (req, res, next, id)=>{
    try{
        let user = User.findById(id)
        if(!user){
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = users
        next()
    } catch(err){
        return res.status(400).json({
            error: "Could not retreive user"
        })
    }
}

//api/users/:userId
const read = (req, res)=>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = (req, res, next) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)    
        })
    }
} 


const remove = (req, res, next) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


export default {list, read, create, update, remove, userById}