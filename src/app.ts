import express, { Express } from 'express'
import cors from 'cors'
import { userRouter } from './routes'

const app: Express = express()

// Settings
app.set('port', 3000)

// Middleware
app.use(cors())
app.use(express.json())
app.use('/users', userRouter)

// Test
app.get('/', (_req, res) => {
  res.send('Chingadera')
})

export default app
