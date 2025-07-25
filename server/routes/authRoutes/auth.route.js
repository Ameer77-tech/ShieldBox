import { register, login, logout, verify, setKey }  from '../../controllers/auth.controller.js'
import express from 'express'
import authorizeToken from '../../middlewares/authorizeToken.js'
import userModel from '../../models/user-model.js'


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/logout',logout)
router.post('/verify', verify)
router.get('/checkauth', authorizeToken, async (req,res)=>{
    const email  = req.user
    const { isKeySet } = await userModel.findOne({ email })
    res.status(200).json({ reply : "Authorized", success : true, email, isKeySet })
})
router.put('/setkey', authorizeToken, setKey)


export default router