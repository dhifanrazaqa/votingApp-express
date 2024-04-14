import express, { type Express } from 'express'
import { createServer, type Server } from 'http'
import router from '../api/routers'
import errorHandler from '../api/middleware/errorHandlerMiddleware'
import notFoundHandler from '../api/middleware/notFoundMiddleware'
import type * as socketIo from 'socket.io'

class ExpressServer {
  public static readonly PORT = 3000

  private _app!: Express
  private _server!: Server
  private _port!: number | string

  public constructor () {
    this.listen()
  }

  private listen (): void {
    this._app = express()

    this._app.use(express.json())
    this._app.use('/api', router)
    this._app.use('*', errorHandler)
    this._app.use(notFoundHandler)

    this._port = process.env.PORT ?? ExpressServer.PORT
    this._server = createServer(this._app)
    this._server.listen(this._port, () => {
      console.log('Running Express Server on port %s', this._port)
    })
  }

  public close (): void {
    this._server.close((err) => {
      if (err != null) throw Error()

      console.info(new Date(), '[ExpressServer]: Stopped')
    })
  }

  public initSocket (socket: socketIo.Server): void {
    this._app.set('socket', socket)
  }

  get server (): Server {
    return this._server
  }
}

export default ExpressServer
