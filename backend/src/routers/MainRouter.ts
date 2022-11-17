import { NextFunction, Request, Response, Router } from 'express'
import { Event } from '../models/Events'
import sequelize from '../db'
import { OrderItem } from 'sequelize'

enum orderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}
interface Pagination {
  limit: number
  offset: number
  filter: {
    [key: string]: string
  }
  order: OrderItem[]
}

class MainRouter {
  constructor() {
    this._router.get('/health', async (req: Request, res: Response, next: NextFunction) => {
      // TODO Implement /health/live and /health/ready
      try {
        await sequelize.authenticate()
        res.status(200).json({ message: 'live' })
      } catch (e: Error | any) {
        console.log(e.message)
        res.status(500).json({ message: 'Unhandled error' })
      }
    })
    this._router.get('/event', async (req: Request<Pagination>, res: Response, next: NextFunction) => {
      const { limit, offset, filter, order } = req.params
      try {
        const events = await Event.findAndCountAll({
          where: filter,
          order,
          limit,
          offset,
        })
        res.status(200).json(events)
      } catch (e: Error | any) {
        console.log(e.message)
        res.status(500).json({ message: 'Unhandled error' })
      }
    })
    this._router.get('/event/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const event = await Event.findOne({
          where: {
            id: req.params.id,
          },
        })
        if (!event) {
          res.sendStatus(404)
        } else {
          res.status(200).json(event)
        }
      } catch (e: Error | any) {
        console.log(e.message)
        res.status(500).json({ message: 'Unhandled error' })
      }
    })
    this._router.post('/event', async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req.body)
        const event = await Event.create({
          name: req.body.name,
          maintenanceDate: req.body.maintenanceDate,
          user: req.body.user,
        })
        res
          .set('Location', `http://${req.headers.host}${req.originalUrl}/${event.getDataValue('id')}`)
          .status(201)
          .json({ status: 'created', id: event.getDataValue('id') })
      } catch (e: Error | any) {
        console.log(e.message)
        res.status(500).json({ message: 'Unhandled error' })
      }
    })
    this._router.post('/event/:id', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(405)
    })
    this._router.put('/event', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(405)
    })
    this._router.put('/event/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const event = await Event.upsert({
          id: req.params.id,
          name: req.body.name,
          maintenanceDate: req.body.maintenanceDate,
          user: req.body.user,
        })

        //true if created
        if (event[1]) {
          res.sendStatus(201)
        } else {
          res.sendStatus(200)
        }
      } catch (e: Error | any) {
        console.log(e.message)
        res.sendStatus(500).json({ message: 'Unhandled error' })
      }
    })
    this._router.patch('/event', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(405)
    })
    this._router.patch('/event/:id', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(405)
    })
    this._router.delete('/event', (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(405)
    })
    this._router.delete('/event/:id', async (req: Request, res: Response, next: NextFunction) => {
      const event = await Event.destroy({
        where: {
          id: req.params.id,
        },
      })
      if (event > 0) {
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    })
  }
  private _router = Router()

  get router() {
    return this._router
  }
}

export default new MainRouter().router
