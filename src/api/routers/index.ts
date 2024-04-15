import { Router } from 'express'
import authRoutes from '../routers/auth.routes'
import userRoutes from '../routers/user.routes'
import voteRoutes from '../routers/vote.routes'
import optionRoutes from '../routers/option.routes'
import joinedVoteRoutes from '../routers/joinedVote.routes'
import addVoteRoutes from '../routers/addVote.routes'

const router: Router = Router()

router.use('/auth', authRoutes)
router.use('', userRoutes)
router.use('', voteRoutes)
router.use('', optionRoutes)
router.use('', joinedVoteRoutes)
router.use('', addVoteRoutes)

export default router
