import { register, login, logout }  from '../../controllers/auth.controller.js'
import express from 'express'
import authorizeToken from '../../middlewares/authorizeToken.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout',logout)
export default router