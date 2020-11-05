import jwt from "jsonwebtoken"
import config from "../../config/config"
import User from "../models/user.model"
import expressJwt from "express-jwt"


const signout = (req, res) => {
    res.clearCookie('t')
    return res.status(200).json({
        message : "Signed out Successfully"
    })

}

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })
        console.log(req.body.email)
        console.log(req.body.password)
        if (!user) {
            return res.status(401).send({ error: "User not found" })
        }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "email and password incorrect" })
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret)
        res.cookie('t', token, { expire: new Date() + 9999 })

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        return res.status(401).json({
            error: "Sign in failed"
        })
    }
}

const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['sha1', 'RS256', 'HS256']
})

const hasAuthorisation = (req, res, next)=>{
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if(!authorized){
        return res.status(403).json({
            error: 'Unauthorized user'
        })
    }
    next()
}


export default { signout, signin, requireSignin, hasAuthorisation }