require('dotenv').config()
import express, { Request, Response, NextFunction } from 'express'
import sequelize from './db'
import MainRouter from './routers/MainRouter'
import ErrorHandler from './models/ErrorHandler'
import configGenerator from './config/config'
import cors from 'cors'
import helmet from 'helmet'

//TODO Log using winston
//TODO Migrations using umzug
//TODO Auth - library not defined
//TODO Docs with swagger?

const config = configGenerator()

export const port = process.env.APP_PORT || config.app.port || 3000
export let live = false;

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
    console.log(`> Preparation done`)
    live = true
    if (require.main === module) {
      server.app.listen(port, () => {
        console.log(`> Listening on port ${port}`)
      })
    }
  })
  .catch((error) => {
    console.log('Error connection to database')
    throw new Error(error.message)
  })

export default function serverApp(callback: Function) {
  setTimeout(function () {
      return live ? callback(server.app) : serverApp(callback)
  }, 1000);
} 
