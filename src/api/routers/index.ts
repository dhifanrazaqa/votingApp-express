import { Router } from 'express'
import authRoutes from '../routers/auth.routes'
import userRoutes from '../routers/user.routes'
import voteRoutes from '../routers/vote.routes'
import optionRoutes from '../routers/option.routes'

const router: Router = Router()

router.use('/auth', authRoutes)
router.use('', userRoutes)
router.use('', voteRoutes)
router.use('', optionRoutes)

export default router
