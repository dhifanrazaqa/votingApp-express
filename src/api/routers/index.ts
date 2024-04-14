import { Router } from 'express'
import authRoutes from '../routers/auth.routes'
import userRoutes from '../routers/user.routes'
import voteRoutes from '../routers/vote.routes'

const router: Router = Router()

router.use('/auth', authRoutes)
router.use('', userRoutes)
router.use('', voteRoutes)

export default router
