import { Router } from 'express'
import auth from '../middleware/authMiddleware'
import { joinVote, joinedVotes, leaveVote } from '../controllers/joinedVote.controller'

const router: Router = Router()

router.get('/vote/joined', auth(['USER', 'ADMIN']), joinedVotes)
router.post('/vote/:id/join', auth(['USER', 'ADMIN']), joinVote)
router.delete('/vote/:id/leave', auth(['USER', 'ADMIN']), leaveVote)

export default router
