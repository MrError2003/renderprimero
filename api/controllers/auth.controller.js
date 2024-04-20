"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.apiLogout = exports.apiLogin = exports.apiRegister = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiRegister = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await user_model_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new user_model_1.default({ name, email, password });
    await newUser.save();
    const token = jsonwebtoken_1.default.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ token });
};
exports.apiRegister = apiRegister;
const apiLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_model_1.default.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.cookie("authcookie", token, { maxAge: 900000, httpOnly: true });
    res.status(200).send("Inicio de sesión exitoso");
};
exports.apiLogin = apiLogin;
const apiLogout = (req, res) => {
    res.clearCookie("authcookie");
    res.status(200).json({ message: "Logged out successfully" });
};
exports.apiLogout = apiLogout;
const verifyJWT = (req, res, next) => {
    const token = req.cookies.authcookie;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
exports.verifyJWT = verifyJWT;
