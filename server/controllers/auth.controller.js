import jwt from "jsonwebtoken"
import { config } from "../../config/config"
import User from "../models/user.model"



const signout = (req, res) => {
    res.clearCookie('t')
    return res.status(200).json({
        message : "Signed out Successfully"
    })

}

const signin = async (res, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })
        if (!user) {
            return res.status(401).send({ error: "User not found" })
        }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "password incorrect" })
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret)
        res.cookie('t', token, { expires: new Date() + 9999 })

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
            error: "Cannot sign in"
        })
    }
}

export default { signout, signin }