"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = exports.getPosts = void 0;
const post_model_1 = __importDefault(require("../../models/post.model"));
const getPosts = async (req, res) => {
    try {
        const posts = await post_model_1.default.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).send("Error");
    }
};
exports.getPosts = getPosts;
const createPost = async (req, res) => {
    try {
        const { idUser, title, content, image, createdAt, updatedAt } = req.body;
        const post = new post_model_1.default({ idUser, title, content, image, createdAt, updatedAt });
        await post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).send("Error con la creacion del post");
    }
};
exports.createPost = createPost;
const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await post_model_1.default.findById(id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).send("Error al obtener el post");
    }
};
exports.getPost = getPost;
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await post_model_1.default.findByIdAndUpdate(id, { title, content }, { new: true });
        res.status(200).json(post);
    }
    catch (error) {
        return res.status(404).send("Actualizacion no encontrada");
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await post_model_1.default.findByIdAndDelete(id);
        res.status(204).send("Se elimino la publicacion");
    }
    catch (error) {
        return res.status(404).send("Publicacion no encontrada");
    }
};
exports.deletePost = deletePost;
