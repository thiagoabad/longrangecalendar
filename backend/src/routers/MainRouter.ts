import { NextFunction, Request, Response, Router } from 'express'
import { Event } from '../models/Events'

class MainRouter {
  constructor() {
    this._router.get('/record', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const events = await Event.findAll()
        res.status(200).json(events)
      } catch (e: Error | any) {
        console.log(e.message)
        res.status(500).json({ message: 'Unhandled error' })
      }
    })
    this._router.put('/record', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json('1')
    })
    this._router.post('/record', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json('1')
    })
    this._router.delete('/record', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json('1')
    })
  }
  private _router = Router()

  get router() {
    return this._router
  }
}

export default new MainRouter().router
