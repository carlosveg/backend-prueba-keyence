import { Request, Response } from 'express'
import connection from '../db/connection'
import { User } from '../models'

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll()

    res.json(users)
  } catch (error) {
    res.status(500).send(error)
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = req

    const isDuplicate = await User.findOne({
      where: { username: body.username }
    })

    if (isDuplicate !== null) {
      return res.status(400).json({ message: 'Record already exists' })
    }

    const newUser = await User.create(body)
    res.json(newUser)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const createUsers = async (req: Request, res: Response) => {
  try {
    const { body } = req

    const usersLoaded = await User.bulkCreate(body)

    res.json(usersLoaded)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, date } = req.body
    const { body } = req
    const user = await User.findOne({
      where: { username, date: connection.literal(`DATE('${String(date)}')`) }
    })

    if (user === null) {
      return res.status(400).json({ message: "Record doesn't exists" })
    }

    await user.update(body)
    res.json(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { username, date } = req.body

    const user = await User.findOne({
      where: { username, date: connection.literal(`DATE('${String(date)}')`) }
    })

    if (user === null) {
      return res.status(404).json({
        message: `Record with id ${String(username)} and date ${String(
          date
        )} don't exists`
      })
    }

    await User.destroy({
      where: { username, date: connection.literal(`DATE('${String(date)}')`) }
    })
    res.json(user)
  } catch (error) {
    res.status(400).send(error)
  }
}
