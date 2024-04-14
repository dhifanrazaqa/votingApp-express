import { Router } from 'express'

const router: Router = Router()

router.get('/vote/joined')
router.post('/vote/join/:id')
router.delete('/vote/leave/:id')

export default router
