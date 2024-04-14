import express, { type Router } from 'express'
import { login } from '../controllers/auth.controller'
import auth from '../middleware/authMiddleware'
import { type IRequest } from '../../common/interfaces/authInterfaces'

const router: Router = express.Router()

router.post('/login', login)
router.get('/test', auth(['ADMIN', 'USER']), (req: IRequest, res) => {
  res.status(200).json({ message: req.user })
})

export default router
