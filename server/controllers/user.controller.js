import User from "../models/user.model"
import errorHandler from "../helpers/dbErrorHandler"
import extend from "lodash"


//api/users
const list = async (req, res)=> {
    try{
        let users = await User.find().select('name email updated created')
        return res.json(users)
    } catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const create = async (req, res)=> {
    let user = new User(req.body)
    try{
        await user.save()
        //console.log(`User saved : ${user.name}, ${user.email}, ${user.password}`)
        return res.status(200).json({
            message: 'Sign up successful'
        })
    } catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
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
        req.profile = user
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

const update = async (req, res, next) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        await res.json(user)
    } catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)    
        })
    }
} 


const remove = async (req, res, next) => {
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