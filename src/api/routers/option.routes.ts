import { Router } from 'express'

const router: Router = Router()

router.get('/options')
router.get('/option/:id')
router.post('/option')
router.put('/option/:id')
router.delete('/option/:id')

export default router
