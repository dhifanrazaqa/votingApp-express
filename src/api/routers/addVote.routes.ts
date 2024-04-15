import { Router } from 'express'
import auth from '../middleware/authMiddleware'
import { addVote, countVote, unaddVote } from '../controllers/addVote.controller'

const router: Router = Router()

router.post('/vote/:id/add', auth(['USER', 'ADMIN']), addVote)
router.delete('/vote/:id/unadd', auth(['USER', 'ADMIN']), unaddVote)
router.get('/vote/:id/count', auth(['USER', 'ADMIN']), countVote)

export default router
