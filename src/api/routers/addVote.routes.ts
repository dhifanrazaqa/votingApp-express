import { Router } from 'express'

const router: Router = Router()

router.post('/vote/:id/add')
router.delete('/vote/:id/unadd')

export default router
