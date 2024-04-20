"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const getUsers = async (req, res) => {
    try {
        const users = await user_model_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).send("Error");
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new user_model_1.default({ name, email, password });
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).send("Error al crear el usuario");
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user_model_1.default.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send("Error al obtener el usuario");
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await user_model_1.default.findByIdAndUpdate(id, { name, email });
        res.status(200).json(user);
    }
    catch (error) {
        return res.status(404).send("Usuario no encontrada");
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await user_model_1.default.findByIdAndDelete(id);
        res.status(204).send("Usuario eliminado");
    }
    catch (error) {
        return res.status(404).send("Usuario no encontrada");
    }
};
exports.deleteUser = deleteUser;
