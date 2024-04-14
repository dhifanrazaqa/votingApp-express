import { type Server } from 'http'
import * as socketIo from 'socket.io'

class SocketServer {
  private readonly _io: socketIo.Server

  constructor (server: Server) {
    this._io = new socketIo.Server(server)
    this.listen()
  }

  private listen (): void {
    this._io.on('connection', (socket) => {
      console.log('a user connected')
      socket.on('chat message', (msg) => {
        this._io.emit('chat message', msg)
      })
      socket.on('disconnect', () => {
        console.log('user disconnected')
      })
    })
  }

  public close (): void {
    this._io.on('end', (socket: any) => {
      socket.disconnect(0)
      console.info(new Date(), '[SocketServer]: Disconnect')
    })
  }

  get instance (): socketIo.Server {
    return this._io
  }
}

export default SocketServer
