"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUsers = exports.createUser = exports.getAllUsers = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const models_1 = require("../models");
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const isDuplicate = yield models_1.User.findOne({
            where: { username: body.username }
        });
        if (isDuplicate !== null) {
            return res.status(400).json({ message: 'Record already exists' });
        }
        const newUser = yield models_1.User.create(body);
        res.json(newUser);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createUser = createUser;
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const usersLoaded = yield models_1.User.bulkCreate(body);
        res.json(usersLoaded);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createUsers = createUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, date } = req.body;
        const { body } = req;
        const user = yield models_1.User.findOne({
            where: { username, date: connection_1.default.literal(`DATE('${String(date)}')`) }
        });
        if (user === null) {
            return res.status(400).json({ message: "Record doesn't exists" });
        }
        yield user.update(body);
        res.json(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, date } = req.body;
        const user = yield models_1.User.findOne({
            where: { username, date: connection_1.default.literal(`DATE('${String(date)}')`) }
        });
        if (user === null) {
            return res.status(404).json({
                message: `Record with id ${String(username)} and date ${String(date)} don't exists`
            });
        }
        yield models_1.User.destroy({
            where: { username, date: connection_1.default.literal(`DATE('${String(date)}')`) }
        });
        res.json(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.deleteUser = deleteUser;
