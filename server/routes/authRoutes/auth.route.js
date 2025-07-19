import { register, login, logout, verify }  from '../../controllers/auth.controller.js'
import express from 'express'
import authorizeToken from '../../middlewares/authorizeToken.js'


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/logout',logout)
router.post('/verify', verify)
router.get('/checkauth', authorizeToken, (req,res)=>{
    res.send("Authorized")
    const { email } = req.user
})

export default router