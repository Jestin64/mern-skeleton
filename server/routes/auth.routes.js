import express from "express"
import authCtrl from "../controllers/auth.controller"


const router = express.Router()

router.route('/auth/signout')
.get(authCtrl.signout)

router.route('/auth/signin')
.post(userCtrl.signin)


export default router