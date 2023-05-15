import express, { Express } from 'express'
import cors from 'cors'
import { userRouter } from './routes'
import connection from './db/connection'

const app: Express = express()

// Settings
app.set('port', 3000)

// Middleware
app.use(cors())
app.use(express.json())
app.use('/users', userRouter)

const conectDB = async () => {
  try {
    await connection.sync()
    await connection.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

void conectDB()

export default app
