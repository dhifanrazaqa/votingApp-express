import { type Request, type Response } from 'express'

export default (req: Request, res: Response): void => {
  res.status(404).json({
    message: 'Url not found'
  })
}
