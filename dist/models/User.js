"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define('User', {
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    username: { type: sequelize_1.DataTypes.STRING, primaryKey: true, allowNull: false },
    date: { type: sequelize_1.DataTypes.DATE, primaryKey: true, allowNull: false },
    punch_in: { type: sequelize_1.DataTypes.TIME, allowNull: false },
    punch_out: { type: sequelize_1.DataTypes.TIME, allowNull: false }
});
exports.default = User;
