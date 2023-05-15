import { Router } from 'express'
import {
  createUser,
  createUsers,
  deleteUser,
  getAllUsers,
  updateUser
} from '../controllers/'

const router = Router()

router.get('/', getAllUsers)

router.post('/', createUser)

router.post('/load', createUsers)

router.put('/', updateUser)

router.delete('/', deleteUser)

export default router
