import { Router } from 'express'
import { register, user, users } from '../controllers/user.controller'

const router: Router = Router()

router.post('/register', register)
router.get('/users/:id', user)
router.get('/users', users)

export default router
