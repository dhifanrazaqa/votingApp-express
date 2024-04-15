import { Router } from 'express'
import { addNewVote, deleteVote, putVote, vote, votes } from '../controllers/vote.controller'
import auth from '../middleware/authMiddleware'

const router: Router = Router()

router.get('/votes', auth(['USER', 'ADMIN']), votes)
router.get('/votes/:id', auth(['USER', 'ADMIN']), vote)
router.post('/vote', auth(['ADMIN']), addNewVote)
router.put('/vote/:id', auth(['ADMIN']), putVote)
router.delete('/vote/:id', auth(['ADMIN']), deleteVote)

export default router
