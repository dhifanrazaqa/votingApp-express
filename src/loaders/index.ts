import ExpressServer from './ExpressServer'
import SocketServer from './SocketServer'

export default (): void => {
  const expressServer = new ExpressServer()
  const expressInstance = expressServer.server

  const socketServer = new SocketServer(expressInstance)
  const socketInstance = socketServer.instance

  expressServer.initSocket(socketInstance)

  process.on('exit', () => {
    expressServer.close()
    socketServer.close()
  }).on('SIGINT', () => {
    expressServer.close()
    socketServer.close()
  })
}
