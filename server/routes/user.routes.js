import express from "express"
import userCtrl from "../controllers/user.controller"
import authCtrl from "../controllers/auth.controller"


const router = express.Router()

router.route("/api/users")
    .get(userCtrl.list)
    .post(userCtrl.create)

//needs auth
router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorisation, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorisation, userCtrl.remove)

router.param('userId', userCtrl.userById)

export default router