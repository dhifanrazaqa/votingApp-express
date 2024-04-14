import { Router } from 'express'
import authRoutes from '../routers/auth.routes'
import userRoutes from '../routers/user.routes'

const router: Router = Router()

router.use('', authRoutes)
router.use('', userRoutes)

export default router
