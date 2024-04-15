import { Router } from 'express'
import { addOption, deleteOption, option, options, putOption } from '../controllers/option.controller'
import auth from '../middleware/authMiddleware'

const router: Router = Router()

router.get('/options/:voteId', auth(['USER', 'ADMIN']), options)
router.get('/option/:id', auth(['USER', 'ADMIN']), option)
router.post('/option', auth(['ADMIN']), addOption)
router.put('/option/:id', auth(['ADMIN']), putOption)
router.delete('/option/:id', auth(['ADMIN']), deleteOption)

export default router
