import { DataTypes } from 'sequelize'
import connection from '../db/connection'

const User = connection.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  username: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
  date: { type: DataTypes.DATE, primaryKey: true, allowNull: false },
  punch_in: { type: DataTypes.TIME, allowNull: false },
  punch_out: { type: DataTypes.TIME, allowNull: false }
})

export default User
