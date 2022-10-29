import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import sequelize from './db'
import MainRouter from './routers/MainRouter'
import ErrorHandler from './models/ErrorHandler'
import configGenerator from './config/config'
import cors from 'cors'
import helmet from 'helmet'

const config = configGenerator()
dotenv.config({
  path: '.env',
})

class Server {
  public app = express()
  public router = MainRouter
}

const server = new Server()

const corsOptions = {
  origin: process.env.ORIGIN,
}
server.app.use(helmet())
server.app.use(cors(corsOptions))
server.app.use(express.json())
server.app.use(express.urlencoded({ extended: true }))

sequelize
  .authenticate()
  .then(() => {
    server.app.use('/api/v1', server.router)

    server.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
      res.status(err.statusCode || 500).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message,
      })
    })
    ;((port = process.env.APP_PORT || config.app.port || 3000) => {
      server.app.listen(port, () => console.log(`> Listening on port ${port}`))
    })()
  })
  .catch((error) => {
    console.log('Error connection to database')
    throw new Error(error.message)
  })
