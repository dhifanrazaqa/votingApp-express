import express, { type Router } from 'express'
import Success from '../../responses/successful/Success'

const router: Router = express.Router()

router.get('/login', (req, res) => {
  const response = new Success().toJson
  return res.status(200).json(response)
})

export default router
