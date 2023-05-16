"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const connection = new sequelize_1.Sequelize(config_1.DB_NAME, config_1.DB_USER, config_1.DB_PASSWORD, {
    host: config_1.DB_HOST,
    dialect: 'mariadb'
});
exports.default = connection;
