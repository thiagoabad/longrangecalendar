import sequelize from '../db'
import { DataTypes } from 'sequelize'

export const Event = sequelize.define(
  'events',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    maintenanceDate: {
      type: DataTypes.STRING,
    },
    user: {
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
  }
)
