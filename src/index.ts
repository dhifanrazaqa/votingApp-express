// import express, { type Express, type Request, type Response } from 'express'
// import { Server } from 'socket.io'
// import { createServer } from 'http'
// import dotenv from 'dotenv'

// dotenv.config()

// const app: Express = express()
// const port = process.env.PORT ?? 3000
// const httpServer = createServer(app)
// const io = new Server(httpServer, {
//   connectionStateRecovery: {}
// })

// app.get('/', (req: Request, res: Response) => {
//   res.status(200).send('Hello World')
// })

// io.on('connection', (socket) => {
//   console.log('a user connected')
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg)
//   })
//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// })

// httpServer.listen(3000, () => {
//   console.log(`[server] running at http://localhost:${port}`)
// })

import loaders from './loaders'

export default loaders()
